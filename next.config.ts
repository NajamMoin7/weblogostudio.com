import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // The pricing page was retired; send old links and bookmarks to the quote form.
  async redirects() {
    return [{ source: "/pricing", destination: "/get-a-quote", permanent: true }];
  },
};

export default nextConfig;
