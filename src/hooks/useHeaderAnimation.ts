import { useCallback, useEffect, useState } from "react";

const HEADER_MIN_HEIGHT = 60; // 필요에 따라 조정
const FADE_OFFSET = 15; // 더 빠르게 위로 이동하도록 값 증가
const HEADER_MAX_RATIO = 0.18; // 기본값(비율), headerMaxHeight로 대체 가능

export type HeaderStyle = {
  height: string;
  opacity: number;
  transform: string;
};

/**
 * 스크롤에 따라 헤더 style 을 계산하는 커스텀 훅
 * @param scrollRef 스크롤 영역 ref
 * @param options headerMaxHeight(픽셀), headerMinHeight(픽셀) 지정 가능
 */
export default function useHeaderAnimation(
  scrollRef: React.RefObject<HTMLDivElement | null>,
  options?: { headerMaxHeight?: number; headerMinHeight?: number }
) {
  const headerMaxHeight = options?.headerMaxHeight ?? window.innerHeight * HEADER_MAX_RATIO;
  const headerMinHeight = options?.headerMinHeight ?? HEADER_MIN_HEIGHT;

  const [style, setStyle] = useState<HeaderStyle>({
    height: `${headerMaxHeight}px`,
    opacity: 1,
    transform: "translateY(0px)",
  });
  const [scrolling, setScrolling] = useState(false);

  const onScroll = useCallback(() => {
    if (!scrollRef.current) return;
    setScrolling(true);
    const { scrollTop } = scrollRef.current;

    if (scrollTop > 0) {
      setStyle({
        height: `${headerMinHeight}px`,
        opacity: 0,
        transform: `translateY(-${FADE_OFFSET}px)`,
      });
    } else {
      setStyle({
        height: `${headerMaxHeight}px`,
        opacity: 1,
        transform: "translateY(0px)",
      });
    }
  }, [scrollRef, headerMaxHeight, headerMinHeight]);

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
