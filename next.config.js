/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: isProd
    ? "https://us-central1-tmshkr.cloudfunctions.net/next-gcf"
    : "",
};

module.exports = nextConfig;
