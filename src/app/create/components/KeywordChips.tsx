import { useState } from "react";

import { Keyword } from "../types/keyword";

import KeywordChip from "./KeywordChip";

/**
 * KeywordChips 컴포넌트 Props 인터페이스
 * @interface KeywordChipsProps
 */
interface KeywordChipsProps {
  /** 키워드 섹션 제목 */
  title: string;
  /** 표시할 키워드 배열 */
  keywords: Keyword[];
  /** 추가 버튼 표시 여부 (기본값: false) */
  showAddButton?: boolean;
  /** 개별 키워드 클릭 시 호출되는 콜백 함수 */
  onKeywordClick?: (keyword: Keyword) => void;
  /** 추가 버튼 클릭 시 호출되는 콜백 함수 */
  onAddClick?: () => void;
  /** 선택된 키워드 배열이 변경될 때 호출되는 콜백 함수 */
  onSelectionChange?: (selectedKeywords: Keyword[]) => void;
}

/**
 * 키워드 칩들을 표시하고 선택 상태를 관리하는 컴포넌트
 *
 * @component
 * @param {string} title - 키워드 섹션 제목
 * @param {Keyword[]} keywords - 표시할 키워드 배열
 * @param {boolean} [showAddButton=false] - 추가 버튼 표시 여부 (기본값: false)
 * @param {(keyword: Keyword) => void} [onKeywordClick] - 개별 키워드 클릭 시 호출되는 콜백 함수
 * @param {() => void} [onAddClick] - 추가 버튼 클릭 시 호출되는 콜백 함수
 * @param {(selectedKeywords: Keyword[]) => void} [onSelectionChange] - 선택된 키워드 배열이 변경될 때 호출되는 콜백 함수
 * @returns {JSX.Element} 키워드 칩 컬렉션 컴포넌트
 *
 * @example
 * ```tsx
 * <KeywordChips
 *   title="관심 키워드"
 *   keywords={keywordArray}
 *   showAddButton={true}
 *   onSelectionChange={(selected) => console.log(selected)}
 *   onAddClick={() => console.log("Add clicked")}
 * />
 * ```
 */
export default function KeywordChips({
  title,
  keywords,
  showAddButton = false,
  onKeywordClick,
  onAddClick,
  onSelectionChange,
}: KeywordChipsProps) {
  /** 현재 선택된 키워드들을 저장하는 상태 */
  const [selectedKeywords, setSelectedKeywords] = useState<Keyword[]>([]);

  /**
   * 키워드 클릭 시 호출되는 핸들러 함수
   * 키워드 선택/해제를 토글하고 관련 콜백 함수들을 호출합니다.
   *
   * @param {Keyword} keyword - 클릭된 키워드 객체
   */
  const handleKeywordClick = (keyword: Keyword) => {
    // 현재 키워드가 선택되어 있는지 확인
    const isSelected = selectedKeywords.some((k) => k.id === keyword.id);
    let newSelection: Keyword[];

    if (isSelected) {
      // 이미 선택된 키워드라면 선택 해제
      newSelection = selectedKeywords.filter((k) => k.id !== keyword.id);
    } else {
      // 선택되지 않은 키워드라면 선택 목록에 추가
      newSelection = [...selectedKeywords, keyword];
    }

    // 선택 상태 업데이트
    setSelectedKeywords(newSelection);
    // 부모 컴포넌트에 선택 변경 사항 전달
    onSelectionChange?.(newSelection);
    // 개별 키워드 클릭 콜백 호출
    onKeywordClick?.(keyword);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* 키워드 섹션 제목 */}
      <h3 className="text-lg font-medium text-gray-100">{title}</h3>

      {/* 키워드 칩들과 추가 버튼을 감싸는 컨테이너 */}
      <div className="flex flex-wrap gap-2">
        {/* 각 키워드를 KeywordChip 컴포넌트로 렌더링 */}
        {keywords.map((keyword) => (
          <KeywordChip
            key={keyword.id}
            keyword={keyword}
            isSelected={selectedKeywords.some((k) => k.id === keyword.id)}
            onClick={() => handleKeywordClick(keyword)}
          />
        ))}

        {/* 추가 버튼이 활성화된 경우에만 표시 */}
        {showAddButton && (
          <KeywordChip
            type={"add"}
            onClick={onAddClick}
          />
        )}
      </div>
    </div>
  );
}
