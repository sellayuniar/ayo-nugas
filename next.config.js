/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        // pathname: "/images/**",
      },
    ],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: "url-loader",
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    });

    return config;
  },
};

module.exports = nextConfig;
