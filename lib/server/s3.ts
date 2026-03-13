import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { createHash } from "node:crypto";

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_SECRET_KEY || "",
  },
});

const ensureEnv = () => {
  const required = ["S3_REGION", "AWS_ACCESS_KEY", "AWS_SECRET_KEY", "S3_BUCKET"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing S3 envs: ${missing.join(", ")}`);
  }
};

export const uploadBase64Image = async (base64DataUrl: string) => {
  ensureEnv();

  const match = base64DataUrl.match(/^data:(image\/[\w.+-]+);base64,(.+)$/);
  if (!match) return null;

  const [, contentType, payload] = match;
  const buffer = Buffer.from(payload, "base64");
  const ext = contentType.split("/")[1] || "png";
  const hash = createHash("sha256").update(buffer).digest("hex").slice(0, 16);
  const key = `logos/${Date.now()}-${hash}.${ext}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    }),
  );

  const base = process.env.S3_PUBLIC_BASE_URL || `https://${process.env.S3_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`;
  return `${base}/${key}`;
};
