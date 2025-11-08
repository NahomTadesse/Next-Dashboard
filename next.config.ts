import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
typescript: {
    // Warning: This skips type checking entirely
    ignoreBuildErrors: true,
  },
   eslint: {
    // ⚠️ Warning: this allows production builds to complete
    // even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
