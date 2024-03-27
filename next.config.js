/** @type {import('next').NextConfig} */

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
};

module.exports = nextConfig;
