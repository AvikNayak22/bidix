import { env } from "@/env";

export function getImageUrl(fileKey: string) {
  return `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.BUCKET_NAME}/${fileKey}`;
}
