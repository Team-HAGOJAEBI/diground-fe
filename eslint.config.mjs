import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  ...compat.extends("next", "next/core-web-vitals"),
  ...compat.extends("prettier"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  {
    plugins: {
      prettier,
      importPlugin,
    },
    rules: {
      "import/prefer-default-export": "off", // 기본 내보내기 사용 금지
      "@typescript-eslint/explicit-function-return-type": "off", // 함수 반환 타입 명시 금지
      "@typescript-eslint/explicit-module-boundary-types": "off", // 모듈 경계 타입 명시 금지
      "no-use-before-define": 0, // 변수 선언 전 사용 금지
      "@typescript-eslint/no-use-before-define": 1, // 변수 선언 전 사용 금지
      "@typescript-eslint/no-explicit-any": "off", // any 타입 사용 금지
      "no-console": ["warn", { allow: ["error"] }], // console.log 사용 지양
      "eqeqeq": ["error", "always"], // 일치 연산자 사용 강제
      "spaced-comment": [
        "error",
        "always",
        {
          markers: ["/"],
          exceptions: ["-"],
        },
      ], // 주석 뒤에 반드시 한 칸 공백
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" }, // 모든 return 앞에 빈 줄
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" }, // const/let/var 뒤엔 항상 빈 줄
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        }, // (단, 연속된 선언끼리는 예외)
      ],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto", // LF/CRLF 문제 해결
        },
      ],

      "import/order": [
        "error",
        {
          "newlines-between": "always", // 그룹 간 줄바꿈
          "groups": ["external", "builtin", "parent", "sibling", "internal", "index", "type"],
          "pathGroups": [
            // react는 외부 모듈 중 맨 앞
            {
              pattern: "react*",
              group: "external",
              position: "before",
            },
            // CSS 파일을 'sibling' 그룹으로 재할당
            {
              pattern: "*.css",
              group: "sibling",
              position: "after",
            },
          ],
          // pathGroups로 재분류한 타입은 기본 분류에서는 또 안 건드리게
          "pathGroupsExcludedImportTypes": ["react"],
          "alphabetize": {
            order: "asc", // 알파벳순 정렬
            caseInsensitive: true, // 대소문자 구분 X
          },
        },
      ],
    },
  },
];

export default config;
