import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "192.168.1.175",
    "192.168.1.110"
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    // Evita reotimização frequente das imagens no servidor (31 dias)
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
};

export default nextConfig;