/** @type {import('next').NextConfig} */
const nextConfig = {
  output:'export',
  distDir:'dest',
  images: {
    domains: ["localhost","54.197.24.140"],
  },
};

export default nextConfig;
