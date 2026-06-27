/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repo = "lulu"; // GitHub Pages project path → azizyemen.github.io/lulu

const nextConfig = {
  output: "export", // static export for GitHub Pages
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
