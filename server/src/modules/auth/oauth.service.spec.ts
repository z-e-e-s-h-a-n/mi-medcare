import passport from "passport";

jest.mock("./otp.service", () => ({
  OtpService: class OtpService {},
}));

jest.mock("@/modules/prisma/prisma.service", () => ({
  PrismaService: class PrismaService {},
}));

import { OAuthService } from "./oauth.service";

describe("OAuthService", () => {
  const baseDeps = () => ({
    prisma: {} as any,
    otpService: {} as any,
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("skips OAuth strategy registration when provider env values are missing", () => {
    const useSpy = jest.spyOn(passport, "use").mockImplementation(() => passport);
    const logger = { warn: jest.fn() };
    const env = {
      get: jest.fn((key: string) => {
        const values: Record<string, string> = {
          GOOGLE_CLIENT_ID: "",
          GOOGLE_CLIENT_SECRET: "",
          GOOGLE_CALLBACK_URL: "",
          FACEBOOK_CLIENT_ID: "",
          FACEBOOK_CLIENT_SECRET: "",
          FACEBOOK_CALLBACK_URL: "",
        };
        return values[key] ?? "";
      }),
    };

    const service = new OAuthService(
      baseDeps().prisma,
      baseDeps().otpService,
      env as any,
    );

    Object.defineProperty(service, "logger", {
      value: logger,
      configurable: true,
    });

    service.onModuleInit();

    expect(useSpy).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledTimes(2);
  });
});
