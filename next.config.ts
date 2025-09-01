import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 외부 이미지 도메인 허용 설정
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
        port: "", // 사용하지 않으면 빈 문자열
        pathname: "/**", // 서브 경로 전체 허용 (필터링이 필요하면 세부 경로로 좁혀도 됨)
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net",
        port: "",
        pathname: "/**", // 서브 경로 전체 허용 (필터링이 필요하면 세부 경로로 좁혀도 됨)
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net",
        port: "", // 사용하지 않으면 빈 문자열
        pathname: "/**", // 서브 경로 전체 허용 (필터링이 필요하면 세부 경로로 좁혀도 됨)
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "", // 사용하지 않으면 빈 문자열
        pathname: "/**", // 서브 경로 전체 허용 (필터링이 필요하면 세부 경로로 좁혀도 됨)
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**", // Google 프로필 이미지
      },
    ],
    domains: ["image.bugsm.co.kr"],
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
