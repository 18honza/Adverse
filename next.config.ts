import type { NextConfig } from "next";
import path from "node:path";

// Two build targets share this config:
//   npm run build          → Vercel (Node runtime, /api/contact Route Handler)
//   npm run build:static   → static export (out/ + server/contact.php)
// BUILD_TARGET=static is set by scripts/build-static.mjs before invoking
// `npm run build`, so the postbuild hook and this flag fire together.
const isStatic = process.env.BUILD_TARGET === "static";

const nextConfig: NextConfig = {
  ...(isStatic && { output: "export", images: { unoptimized: true } }),
  env: {
    NEXT_PUBLIC_CONTACT_ENDPOINT: isStatic ? "/contact.php" : "/api/contact",
  },
  turbopack: {
    // Pin workspace root to this project (avoid picking up stray
    // ~/package-lock.json that exists on this machine)
    root: path.resolve(__dirname),
  },
  // Next 15+ blocks cross-origin requests to dev resources by default. When
  // testing on a phone over the LAN (e.g. http://192.168.100.53:3000), the
  // initial HTML loads but JS chunks + HMR get blocked, so client components
  // never hydrate and Framer Motion animations don't run. Whitelist common
  // private IPv4 ranges + .local mDNS so dev-on-real-device just works.
  allowedDevOrigins: [
    "192.168.*.*",
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "172.21.*.*",
    "172.22.*.*",
    "172.23.*.*",
    "172.24.*.*",
    "172.25.*.*",
    "172.26.*.*",
    "172.27.*.*",
    "172.28.*.*",
    "172.29.*.*",
    "172.30.*.*",
    "172.31.*.*",
    "*.local",
  ],
};

export default nextConfig;
