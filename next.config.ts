import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/agent-scanner',
  assetPrefix: '/agent-scanner',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/agent-scanner',
  },
};

export default nextConfig;
