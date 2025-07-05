import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb'
    },
  },
};

export default nextConfig;
