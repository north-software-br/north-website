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
  // Contato é uma seção da home, não uma página
  async redirects() {
    return ["/contato", "/contact"].map((source) => ({
      source,
      destination: "/#contact",
      permanent: true,
    }));
  },
  experimental: {
    optimizePackageImports: ["@tabler/icons-react"],
  },
};

export default nextConfig;