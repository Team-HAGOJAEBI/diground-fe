import { http, HttpResponse } from "msw";

import { DetailList } from "./sample/Playlist";

import type { NewUser, User } from "./sample/User";

const members: User[] = [
  { id: 1, name: "차현빈", gender: "m" },
  { id: 2, name: "김혜민", gender: "f" },
  { id: 3, name: "이규리", gender: "f" },
  { id: 4, name: "정채은", gender: "f" },
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

  http.get("/api/getDetailList", () => {
    return HttpResponse.json({
      status: 200,
      data: DetailList,
    });
  }),
];
