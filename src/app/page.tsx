"use client";

import "../assets/styles/globals.css";

import { useState } from "react";

import { useAtom } from "jotai";

import { playlistAtom } from "@/atoms";

export default function Home() {
  const [text, setText] = useState<string>("");
  const [playlist, setPlaylist] = useAtom(playlistAtom);

  return (
    <div>
      <main>
        <span className="text-gray-50 w-full h-10 bg-yellow-60">tailwindcss test</span>
      </main>
      <footer>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-auto h-10 mr-4 border border-gray-300 rounded-md p-2"
        />
        <button onClick={() => setPlaylist(text)}>결과 보기</button>
        <span>결과: {playlist}</span>
      </footer>
    </div>
  );
}
