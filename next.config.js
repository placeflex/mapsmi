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
      "splashplaces.s3.us-west-2.amazonaws.com",
      "splashplaces.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
