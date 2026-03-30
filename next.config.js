/** @type {import('next').NextConfig} */
const BASE = "/MindLoop-1.0";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: BASE,
  assetPrefix: BASE,
  // Expose basePath to client-side code (for manifest & SW registration)
  env: {
    NEXT_PUBLIC_BASE_PATH: BASE,
  },
};

module.exports = nextConfig;
