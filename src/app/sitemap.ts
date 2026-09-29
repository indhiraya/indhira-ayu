import type { MetadataRoute } from "next";

const SITE_URL = "https://GANTI-DOMAIN-ANDA.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}