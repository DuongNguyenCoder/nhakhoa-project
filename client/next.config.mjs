import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "leyfeolxdr.ufs.sh",
        pathname: "/**",
      },
    ],
  },
  webpack(config) {
    // config.cache = false;
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
      "react-router-dom": path.resolve(
        __dirname,
        "src/provider/react-router-dom.jsx",
      ),
    };

    return config;
  },
};

export default nextConfig;
