"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import CommentDrawer from "./components/comment/CommentDrawer";
import DiggingDrawer from "./components/digging/DiggingDrawer";
import Header from "./components/Header";
import List from "./components/List";

import Footer from "@/app/_common/Footer";
import Icon from "@/app/_common/icon/Icon";
import Layout from "@/app/_common/Layout";
import { DetailList, PlayList } from "@/mocks/sample/Playlist";

const SCROLL_TRIGGER = 200;
const HEADER_MIN_HEIGHT = 60; // prev 아이콘 height + padding-top
const FADE_OFFSET = 20;
const HEADER_MAX_RATIO = 0.45;

type DrawerType = "comment" | "digging" | null;

type HeaderStyle = {
  height: string;
  opacity: number;
  transform: string;
};

/**
 * 플레이리스트 + 상세 목록 API 호출
 */
function usePlaylistData(id: string) {
  const searchParams = useSearchParams();
  const [info, setInfo] = useState<PlayList>({
    id: 0,
    title: "",
    bio: "",
    tags: [],
    coverURL: "",
    like: { isLiked: false, cnt: 0 },
    comment: 0,
    share: 0,
    digging: 0,
  });
  const [tracks, setTracks] = useState<DetailList[]>([]);

  useEffect(() => {
    let ignore = false;
    // const id = searchParams.get("id");

    (async () => {
      try {
        const [{ data: detailData }, { data: playListInfo }] = await Promise.all([
          fetch(`/api/getDetailList${id ? `?id=${id}` : ""}`).then((res) => res.json()),
          fetch(`/api/getPlayList${id ? `?id=${id}` : ""}`).then((res) => res.json()),
        ]);

        if (!ignore) {
          setTracks(detailData);
          // playListInfo는 배열이므로 첫 번째 요소를 사용
          setInfo(playListInfo[0]);
        }
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [searchParams, id]);

  return { info, tracks } as const;
}

/**
 * 스크롤에 따라 헤더 style 을 계산하는 훅
 */
function useHeaderAnimation(scrollRef: React.RefObject<HTMLDivElement | null>) {
  const [style, setStyle] = useState<HeaderStyle>({
    height: "45vh",
    opacity: 1,
    transform: "translateY(0px)",
  });
  const [scrolling, setScrolling] = useState(false);

  // 이벤트 핸들러를 캐시해서 add/remove 간 동일 참조 보장
  const onScroll = useCallback(() => {
    if (!scrollRef.current) return;

    setScrolling(true);

    const { scrollTop } = scrollRef.current;
    const ratio = Math.min(scrollTop / SCROLL_TRIGGER, 1);

    const headerMaxHeight = window.innerHeight * HEADER_MAX_RATIO;
    const newHeaderHeight = headerMaxHeight - (headerMaxHeight - HEADER_MIN_HEIGHT) * ratio;

    setStyle({
      height: `${newHeaderHeight}px`,
      opacity: 1 - ratio,
      transform: `translateY(${FADE_OFFSET * ratio}px)`,
    });
  }, [scrollRef]);

  useEffect(() => {
    const el = scrollRef.current;

    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      onScroll();
      clearTimeout(timer);
      timer = setTimeout(() => setScrolling(false), 500);
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, [onScroll, scrollRef]);

  return { style, scrolling } as const;
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const promisedParams = React.use(params);
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { info, tracks } = usePlaylistData(promisedParams.id);
  const { style: headerStyle, scrolling } = useHeaderAnimation(scrollRef);

  const [drawer, setDrawer] = useState<DrawerType>(null);

  const openComment = () => setDrawer("comment");
  const openDigging = () => setDrawer("digging");
  const closeDrawer = () => setDrawer(null);

  return (
    <Layout className="relative flex h-screen flex-col overflow-hidden pb-[89px]">
      <Icon
        name="prev"
        className="absolute top-[20px] left-[20px] z-5"
        onClick={() => router.back()}
      />
      <Header
        detailInfo={info}
        onOpenCommentDrawer={openComment}
        onOpenDiggingDrawer={openDigging}
        style={headerStyle}
      />

      <div
        className={`custom-scrollbar m-[20px] flex-1 overflow-y-auto ${scrolling ? "scrolling" : ""}`}
        ref={scrollRef}
      >
        {tracks.map((track, index) => (
          <List
            key={`${track.playlistId}-${track.id}-${index}`}
            item={track}
          />
        ))}
      </div>

      {drawer === "comment" && <CommentDrawer onClose={closeDrawer} />}
      {drawer === "digging" && <DiggingDrawer onClose={closeDrawer} />}

      <Footer selectedIndex={0} />
    </Layout>
  );
}
