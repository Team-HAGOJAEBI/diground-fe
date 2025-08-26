import { http, HttpResponse } from "msw";

import { CommentList } from "./sample/Comment";
import { KeywordList } from "./sample/Keyword";
import { DetailList, PlayListSample } from "./sample/Playlist";
import { Playlists, popularPlayList } from "./sample/Playlists";

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

  http.get("/api/getPlayList", ({ request }) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const targetId = parseInt(id);
      // id가 있으면 해당 플레이리스트만 반환
      let filteredData = PlayListSample.filter((playlist) => playlist.id === targetId);

      // 해당 ID가 없으면 id=1인 데이터를 반환(테스트용 실제데이터 사용하면 지워야함)
      if (filteredData.length === 0) {
        filteredData = PlayListSample.filter((playlist) => playlist.id === 1);
      }

      return HttpResponse.json({
        status: 200,
        data: filteredData,
      });
    }

    // id가 없으면 전체 반환
    return HttpResponse.json({
      status: 200,
      data: PlayListSample,
    });
  }),

  http.get("/api/getDetailList", ({ request }) => {
    const url = new URL(request.url);
    const playlistId = url.searchParams.get("playlistId") || url.searchParams.get("id");

    if (playlistId) {
      const targetPlaylistId = parseInt(playlistId);
      // playlistId가 있으면 해당 플레이리스트의 상세 목록만 반환
      let filteredData = DetailList.filter((detail) => detail.playlistId === targetPlaylistId);

      // 해당 playlistId가 없으면 playlistId=1인 데이터를 반환
      if (filteredData.length === 0) {
        filteredData = DetailList.filter((detail) => detail.playlistId === 1);
      }

      return HttpResponse.json({
        status: 200,
        data: filteredData,
      });
    }

    // playlistId가 없으면 전체 반환
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

  http.get("/api/getPopularPlaylists", () => {
    return HttpResponse.json({
      status: 200,
      data: popularPlayList,
    });
  }),

  http.get("/api/getMyPlaylists", () => {
    return HttpResponse.json({
      status: 200,
      data: Playlists,
    });
  }),
];
