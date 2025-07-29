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
        <span className="bg-yellow-60 h-10 w-full text-gray-50">tailwindcss test</span>
      </main>
      <footer>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="mr-4 h-10 w-auto rounded-md border border-gray-300 p-2"
        />
        <button onClick={() => setPlaylist(text)}>결과 보기</button>
        <span>결과: {playlist}</span>
      </footer>
    </div>
  );
}
