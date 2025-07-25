"use client";

import { useEffect, useState } from "react";

import Footer from "../_common/Footer";
import Icon from "../_common/icon/Icon";
import Layout from "../_common/Layout";

import Drawer from "./components/Drawer";
import Header from "./components/Header";
import List from "./components/List";

import { getDetailPlayList, getPlayList } from "@/app/detail/api/playListApi";
import { DetailList, PlayList, PlayListSample } from "@/mocks/sample/Playlist";

export default function Page() {
  const [playListInfo, setPlayListInfo] = useState<PlayList>(PlayListSample);
  const [list, setList] = useState<DetailList[]>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
        onOpenDrawer={() => setDrawerOpen(true)}
      />
      <Icon
        name="prev"
        className="absolute top-[20px] left-[20px]"
        // onClick
      />
      <div className="p-[20px]">
        <div className="h-[calc(55vh-120px)] overflow-y-auto custom-scrollbar">
          {list.map((item) => (
            <List
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
      {drawerOpen && <Drawer onClose={() => setDrawerOpen(false)} />}
      <Footer selectedIndex={0} />
    </Layout>
  );
}
