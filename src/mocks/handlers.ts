import { http, HttpResponse } from "msw";

import { CommentList } from "./sample/Comment";
import { KeywordList } from "./sample/Keyword";
import { DetailList, PlayListSample } from "./sample/Playlist";

import type { NewUser, User } from "./sample/User";

const members: User[] = [
  {
    id: 1,
    nickname: "차현빈",
    profileImageUrl:
      "https://cdnimg.melon.co.kr/cm2/artistcrop/images/008/95/389/895389_20250502185925_500.jpg?YUV444/melon/resize/416",
  },
  {
    id: 2,
    nickname: "김혜민",
    profileImageUrl:
      "https://cdnimg.melon.co.kr/cm2/artistcrop/images/008/95/389/895389_20250502185925_500.jpg?YUV444/melon/resize/416",
  },
  {
    id: 3,
    nickname: "이규리",
    profileImageUrl:
      "https://cdnimg.melon.co.kr/cm2/artistcrop/images/008/95/389/895389_20250502185925_500.jpg?YUV444/melon/resize/416",
  },
  {
    id: 4,
    nickname: "정채은",
    profileImageUrl:
      "https://cdnimg.melon.co.kr/cm2/artistcrop/images/008/95/389/895389_20250502185925_500.jpg?YUV444/melon/resize/416",
  },
];

export const handlers = [
  // 사용자 목록을 가져오는 API
  http.get("/api/getuserlist", () => {
    return HttpResponse.json({
      status: 200,
      data: members,
    });
  }),

  // 사용자 추가 API
  http.post("/api/newuser", async ({ request }) => {
    const newUser = (await request.json()) as NewUser;
    const createdUser = {
      ...newUser,
      id: members.length + 1,
      createdAt: new Date().toISOString(),
    };

    members.push(createdUser);

    return HttpResponse.json({
      status: 201,
      data: createdUser,
    });
  }),

  http.get("/api/getPlayList", () => {
    return HttpResponse.json({
      status: 200,
      data: PlayListSample,
    });
  }),

  http.get("/api/getDetailList", () => {
    return HttpResponse.json({
      status: 200,
      data: DetailList,
    });
  }),

  http.get("/api/getCommentList", () => {
    return HttpResponse.json({
      status: 200,
      data: CommentList,
    });
  }),

  http.get("/api/getKeywordList", () => {
    return HttpResponse.json({
      status: 200,
      data: KeywordList,
    });
  }),
];
