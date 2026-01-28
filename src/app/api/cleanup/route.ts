import prisma from "@lib/core/prisma";
import { serverEnv } from "@lib/core/server-env";
import { withApiHandler } from "@lib/http/api-handler";
import { UnauthorizedException } from "@lib/http/http-exception";

export const POST = withApiHandler(async (req) => {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (token !== serverEnv.CLEANUP_CRON_SECRET) {
    throw new UnauthorizedException("you do not have access to this route");
  }

  const otpResult = await prisma.otp.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });

  const tokenResult = await prisma.refreshToken.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });

  return {
    message: `Cleanup completed: ${otpResult.count} OTPs and ${tokenResult.count} refresh tokens deleted.`,
    data: {
      otpDeleted: otpResult.count,
      refreshTokensDeleted: tokenResult.count,
    },
  };
});
