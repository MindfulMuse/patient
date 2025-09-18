import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.pexels.com"], // ✅ Allow Pexels image domain
  },
};

export default nextConfig;
