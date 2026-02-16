import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "innovationbrindes.com.br",
        pathname: "/images/produtos/**",
      },
      {
        protocol: "https",
        hostname: "imgprodutos.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
