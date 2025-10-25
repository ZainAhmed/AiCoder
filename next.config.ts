import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev }) => {
    if (!dev) {
      // Only apply custom worker-loader in production (Webpack)
      config.module.rules.push({
        test: /\.worker\.ts$/,
        loader: "worker-loader",
        options: { inline: "no-fallback" },
      });
    }

    return config;
  },
};

export default nextConfig;
