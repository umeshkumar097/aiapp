import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_APP_URL || "https://aiclex.in";
  const appUrl = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/", "/thank-you"],
      },
    ],
    sitemap: `${appUrl}/sitemap.xml`,
  };
}
