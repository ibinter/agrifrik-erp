import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisations production
  compress: true,
  poweredByHeader: false,

  // Images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Headers de sécurité
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
        ],
      },
    ];
  },

  // Redirections
  async redirects() {
    return [
      { source: "/home", destination: "/dashboard", permanent: true },
      { source: "/index", destination: "/dashboard", permanent: true },
    ];
  },
};

export default nextConfig;
