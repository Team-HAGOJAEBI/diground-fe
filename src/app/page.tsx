"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { playlistAtom } from "@/atoms";
import { useAtom } from "jotai";
import { useState } from "react";
export default function Home() {
  const [text, setText] = useState<string>("");
  const [playlist, setPlaylist] = useAtom(playlistAtom);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
          <li>TEAM HAGOJAEBI, DIGROUND!</li>
          <li>
            <a
              href="/msw"
              style={{ color: "inherit", textDecoration: "none", cursor: "pointer" }}
            >
              msw 테스트
            </a>
          </li>
        </ol>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className={styles.logo}
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => setPlaylist(text)}>결과 보기</button>
        <span>결과: {playlist}</span>
      </footer>
    </div>
  );
}
