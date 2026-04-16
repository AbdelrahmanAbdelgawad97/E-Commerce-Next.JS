import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // https://ecommerce.routemisr.com/Route-Academy-products/1680403397402-cover.jpeg
  // https://ecommerce.routemisr.com/Route-Academy-categories/1681511964020.jpeg
  // https://ecommerce.routemisr.com/api/v1/brands
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/*"
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-categories/*"
      }
      ,
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      }
    ]
  }
};

export default nextConfig;
