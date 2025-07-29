"use client";

import { useEffect, useState } from "react";

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
  }, []);

  return (
    <Layout className="relative">
      <Header
        detailInfo={playListInfo}
        onOpenCommentDrawer={() => setCommentOpen(true)}
        onOpenDiggingDrawer={() => setDiggingOpen(true)}
      />
      <Icon
        name="prev"
        className="absolute top-[20px] left-[20px]"
        // onClick
      />
      <div className="p-[20px]">
        <div className="custom-scrollbar h-[calc(55vh-120px)] overflow-y-auto">
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
