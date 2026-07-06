import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const dynamic = "force-static";

const SITE_URL = "https://www.minhdental.com";
const appDir = path.dirname(fileURLToPath(import.meta.url));
const IGNORED_DIRS = new Set(["api", "admin", "revalidate"]);

function isDynamicSegment(name) {
  return name.startsWith("[") && name.endsWith("]");
}

function collectRoutes(dir, segments = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  const hasPage = entries.some(
    (entry) => entry.isFile() && entry.name === "page.js",
  );

  if (hasPage && !segments.some(isDynamicSegment)) {
    const route = segments.length === 0 ? "/" : `/${segments.join("/")}`;
    routes.push(route);
  }

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (IGNORED_DIRS.has(entry.name)) continue;
    if (isDynamicSegment(entry.name)) continue;

    const nextSegments = entry.name.startsWith("(")
      ? segments
      : [...segments, entry.name];

    routes.push(...collectRoutes(path.join(dir, entry.name), nextSegments));
  }

  return routes;
}

export default function sitemap() {
  const routes = collectRoutes(appDir);
  const uniqueRoutes = [...new Set(routes)];

  return uniqueRoutes.map((route) => ({
    url: `${SITE_URL.replace(/\/$/, "")}${route}`,
    lastModified: new Date().toISOString(),
  }));
}
