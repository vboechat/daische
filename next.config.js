/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
};

module.exports = nextConfig;
