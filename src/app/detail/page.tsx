"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import Footer from "../_common/Footer";
import Icon from "../_common/icon/Icon";
import Layout from "../_common/Layout";

import CommentDrawer from "./components/comment/CommentDrawer";
import DiggingDrawer from "./components/digging/DiggingDrawer";
import Header from "./components/Header";
import List from "./components/List";

import { getDetailPlayList, getPlayList } from "@/app/detail/api/playListApi";
import { DetailList, PlayList, PlayListSample } from "@/mocks/sample/Playlist";

type DrawerType = "comment" | "digging" | null;

const SCROLL_TRIGGER = 200;
const HEADER_MIN_HEIGHT = 60; // prev 아이콘 height + padding-top
const FADE_OFFSET = 20;

export default function Page() {
  const router = useRouter();

  const [playListInfo, setPlayListInfo] = useState<PlayList>(PlayListSample);
  const [list, setList] = useState<DetailList[]>([]);
  const [openDrawer, setOpenDrawer] = useState<DrawerType>(null);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [dynamicHeaderStyle, setDynamicHeaderStyle] = useState({
    height: "45vh",
    opacity: 1,
    transform: "translateY(0px)",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchDetailPlayList = async () => {
    try {
      const [{ data: detailData }, { data: playListInfo }] = await Promise.all([getDetailPlayList(), getPlayList()]);

      setList(detailData);
      setPlayListInfo(playListInfo);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetailPlayList();

    const el = scrollRef.current;

    if (!el) return;

    let timeout: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      setScrolling(true);

      const scrollTop = el.scrollTop;

      const ratio = Math.min(scrollTop / SCROLL_TRIGGER, 1); // 0: 스크롤 안함, 0.5: 절반 스크롤, 1: SCROLL_TRIGGER 이상 스크롤

      const HeaderMaxHeight = window.innerHeight * 0.45;

      const newHeaderHeight = HeaderMaxHeight - (HeaderMaxHeight - HEADER_MIN_HEIGHT) * ratio;

      setDynamicHeaderStyle({
        height: `${newHeaderHeight}px`,
        opacity: 1 - ratio,
        transform: `translateY(${FADE_OFFSET * ratio}px)`,
      });

      clearTimeout(timeout);
      timeout = setTimeout(() => setScrolling(false), 500);
    };

    el.addEventListener("scroll", onScroll);

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout className="relative flex h-screen flex-col overflow-hidden pb-[89px]">
      <Icon
        name="prev"
        className="absolute top-[20px] left-[20px] z-5"
        onClick={() => router.back()}
      />
      <Header
        detailInfo={playListInfo}
        onOpenCommentDrawer={() => setOpenDrawer("comment")}
        onOpenDiggingDrawer={() => setOpenDrawer("digging")}
        style={dynamicHeaderStyle}
      />

      <div
        className={`custom-scrollbar m-[20px] flex-1 overflow-y-auto ${scrolling ? "scrolling" : ""}`}
        ref={scrollRef}
      >
        {list.map((item) => (
          <List
            key={item.id}
            item={item}
          />
        ))}
      </div>

      {openDrawer === "comment" && <CommentDrawer onClose={() => setOpenDrawer(null)} />}
      {openDrawer === "digging" && <DiggingDrawer onClose={() => setOpenDrawer(null)} />}

      <Footer selectedIndex={0} />
    </Layout>
  );
}
