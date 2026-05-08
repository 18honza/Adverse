import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin workspace root to this project (avoid picking up stray
    // ~/package-lock.json that exists on this machine)
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
