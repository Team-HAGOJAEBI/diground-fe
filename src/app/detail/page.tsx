"use client";

import { useEffect, useState } from "react";

import Footer from "../_common/Footer";
import Layout from "../_common/Layout";

import List from "./components/List";

import { getDetailPlayList } from "@/app/_api/playListApi";
import { PlayList } from "@/mocks/sample/Playlist";

export default function Home() {
  const [list, setList] = useState<PlayList[]>([]);

  const fetchDetailPlayList = async () => {
    try {
      const { data: detailData } = await getDetailPlayList();

      setList(detailData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDetailPlayList();
  }, []);

  return (
    <Layout>
      <div className="px-[20px]">
        <div className="h-[calc(70vh-110px)] overflow-y-auto custom-scrollbar">
          {list.map((item) => (
            <List
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>

      <Footer selectedIndex={0} />
    </Layout>
  );
}
