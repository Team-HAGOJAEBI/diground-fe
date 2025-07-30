"use client";

import { useEffect, useRef, useState } from "react";

import Footer from "../_common/Footer";
import Icon from "../_common/icon/Icon";
import Layout from "../_common/Layout";

import CommentDrawer from "./components/comment/CommentDrawer";
import DiggingDrawer from "./components/digging/DiggingDrawer";
import Header from "./components/Header";
import List from "./components/List";

import { getDetailPlayList, getPlayList } from "@/app/detail/api/playListApi";
import { DetailList, PlayList, PlayListSample } from "@/mocks/sample/Playlist";

export default function Page() {
  const [playListInfo, setPlayListInfo] = useState<PlayList>(PlayListSample);
  const [list, setList] = useState<DetailList[]>([]);
  const [commentOpen, setCommentOpen] = useState<boolean>(false);
  const [diggingOpen, setDiggingOpen] = useState<boolean>(false);
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [dynamicHeaderStyle, setDynamicHeaderStyle] = useState({
    height: "45vh",
    opacity: 1,
    transform: "translateY(0px)",
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchDetailPlayList = async () => {
    try {
      const { data: detailData } = await getDetailPlayList();
      const { data: playListInfo } = await getPlayList();

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
      const scrollTrigger = 200;

      const ratio = Math.min(scrollTop / scrollTrigger, 1); // 0: 스크롤 안함, 0.5: 절반 스크롤, 1: trigger 이상 스크롤

      const HeaderMinHeight = 60; // prev 아이콘 height + padding-top
      const HeaderMaxHeight = window.innerHeight * 0.45;

      const newHeaderHeight = HeaderMaxHeight - (HeaderMaxHeight - HeaderMinHeight) * ratio;
      const newOpacity = 1 - ratio;
      const offsetY = 20 * ratio;

      setDynamicHeaderStyle({
        height: `${newHeaderHeight}px`,
        opacity: newOpacity,
        transform: `translateY(-${offsetY}px)`, // ⬅️ 위로 살짝 이동하는 느낌
      });

      clearTimeout(timeout);
      timeout = setTimeout(() => setScrolling(false), 500);
    };

    el.addEventListener("scroll", onScroll);

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Layout className="relative flex flex-col">
      <Icon
        name="prev"
        className="absolute top-[20px] left-[20px]"
        // onClick
      />
      <Header
        detailInfo={playListInfo}
        onOpenCommentDrawer={() => setCommentOpen(true)}
        onOpenDiggingDrawer={() => setDiggingOpen(true)}
        style={dynamicHeaderStyle}
      />

      <div className="p-[20px]">
        <div
          className={`custom-scrollbar overflow-y-auto ${scrolling ? "scrolling" : ""}`}
          ref={scrollRef}
          style={{ height: `calc(100vh - ${dynamicHeaderStyle.height} - 129px)` }} // 하단 메뉴바 + pb 포함
        >
          {list.map((item) => (
            <List
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
      {commentOpen && <CommentDrawer onClose={() => setCommentOpen(false)} />}
      {diggingOpen && <DiggingDrawer onClose={() => setDiggingOpen(false)} />}
      <Footer selectedIndex={0} />
    </Layout>
  );
}
