/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config.js");

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  images: {
    domains: [
      "www.mapiful.com",
      "splashplacestest.s3.us-west-004.backblazeb2.com",
      "storage.mixplaces.com",
      "s3.us-west-004.backblazeb2.com",
    ],
  },
  i18n,
};

module.exports = nextConfig;
