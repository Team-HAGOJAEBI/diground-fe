import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 외부 이미지 도메인 허용 설정
  images: {
    domains: ["cdnimg.melon.co.kr"],
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  }, // webpack 설정
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.(".svg"));

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      }
    );
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
