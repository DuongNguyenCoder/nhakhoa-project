export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next"],
      },
    ],
    sitemap: "https://www.minhdental.com/sitemap.xml",
  };
}
