import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { serverEnv } from "./server-env";
import { NextRequest } from "next/server";
import { BadRequestException } from "@lib/http/http-exception";
import { createHash } from "crypto";

import prisma from "./prisma";

cloudinary.config({
  cloud_name: serverEnv.CLOUDINARY_CLOUD_NAME!,
  api_key: serverEnv.CLOUDINARY_API_KEY!,
  api_secret: serverEnv.CLOUDINARY_API_SECRET!,
});

export class UploadService {
  async uploadStream(req: NextRequest) {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) throw new BadRequestException("No file provided");

    const buffer = Buffer.from(await file.arrayBuffer());
    const hash = createHash("sha256").update(buffer).digest("hex");

    const existing = await prisma.media.findUnique({
      where: { hash },
    });

    if (existing) {
      throw new BadRequestException("File already uploaded");
    }

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "posts",
            resource_type: "auto",
            public_id: hash,
            overwrite: false,
          },
          (err, result) => {
            if (err) reject(err);
            else resolve(result!);
          },
        );
        stream.end(buffer);
      },
    );

    return { data: uploadResult, hash };
  }
}

export const uploaderService = new UploadService();
