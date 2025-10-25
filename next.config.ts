// next.config.ts
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add worker-loader for Monaco editor workers
    config.module.rules.push({
      test: /\.worker\.ts$/,
      loader: "worker-loader",
      options: { inline: "no-fallback" },
    });

    return config;
  },
};

export default nextConfig;
