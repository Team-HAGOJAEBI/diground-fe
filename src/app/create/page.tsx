"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Footer from "@/app/_common/Footer";
import Layout from "@/app/_common/Layout";
import CommonInput from "@/app/create/components/CommonInput";
import ImageSelector from "@/app/create/components/ImageSelector";
import KeywordChips from "@/app/create/components/KeywordChips";

const SCROLL_TRIGGER = 200;
const HEADER_MIN_HEIGHT = 60; // prev 아이콘 height + padding-top
const FADE_OFFSET = 20;
const HEADER_MAX_RATIO = 0.45;

type HeaderStyle = {
  height: string;
  opacity: number;
  transform: string;
};

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

export default function Page() {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [desc] = useState("");

  const getValueError = () => {
    if (!link) return "링크를 복사하여 입력해주세요";

    return "";
  };

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrolling } = useHeaderAnimation(scrollRef);

  return (
    <Layout className="relative flex h-screen flex-col overflow-hidden px-[56px] pt-[50px] pb-[89px]">
      <div
        className={`custom-scrollbar m-[20px] flex-1 overflow-y-auto ${scrolling ? "scrolling" : ""}`}
        ref={scrollRef}
      >
        <h1 className="relative self-stretch pb-[32px] text-[28px] leading-[normal] font-bold tracking-[0] text-gray-100">
          플레이리스트 만들기
        </h1>
        <CommonInput
          label="플렛폼 링크"
          required
          placeholder="유튜브 링크를 한번 넣어볼까나"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          errorMessage={getValueError()}
        />
        <CommonInput
          label="제목"
          placeholder="플레이리스트 제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <CommonInput
          label="설명"
          placeholder="내용을 입력해주세요."
          textarea={true}
          value={desc}
          onChange={(e) => setTitle(e.target.value)}
        />
        <KeywordChips
          title="# 키워드 선택"
          keywords={[
            {
              id: 1,
              label: "첫사랑",
              category: "test",
            },
            {
              id: 2,
              label: "인디밴드",
              category: "test",
            },
            {
              id: 3,
              label: "잔잔한",
              category: "test",
            },
            {
              id: 4,
              label: "락",
              category: "test",
            },
            {
              id: 5,
              label: "여름",
              category: "test",
            },
            {
              id: 6,
              label: "겨울",
              category: "test",
            },
            {
              id: 7,
              label: "이별",
              category: "test",
            },
            {
              id: 8,
              label: "드라이브",
              category: "test",
            },
            {
              id: 9,
              label: "여행",
              category: "test",
            },
          ]}
          // showAddButton={true}
          // onKeywordClick={(keyword) => console.log(keyword)}
          // onAddClick={() => console.log("Add clicked")}
        />
        <ImageSelector title={"이미지 추가"} />
      </div>

      <Footer selectedIndex={0} />
    </Layout>
  );
}
