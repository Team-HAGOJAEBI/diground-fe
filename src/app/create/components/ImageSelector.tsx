"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import Icon from "@/app/_common/icon/Icon";

/**
 * ImageSelector 컴포넌트 Props 인터페이스
 * @interface ImageSelectorProps
 */
interface ImageSelectorProps {
  /** 이미지 선택 섹션의 제목 */
  title: string;
  /** 선택된 이미지 변경 시 호출되는 콜백 함수 */
  onImageSelect?: (file: File | null) => void;
  /** 허용할 이미지 파일 타입들 (기본값: "image/*") */
  accept?: string;
  /** 컴포넌트 비활성화 상태 (기본값: false) */
  disabled?: boolean;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 이미지 선택 컴포넌트
 * 기본 상태에서는 문서 아이콘과 업로드 안내를 표시하고,
 * 이미지 선택 후에는 선택된 이미지를 미리보기로 표시합니다.
 *
 * @component
 * @param {string} title - 이미지 선택 섹션의 제목
 * @param {(file: File | null) => void} [onImageSelect] - 선택된 이미지 변경 시 호출되는 콜백 함수
 * @param {string} [accept="image/*"] - 허용할 이미지 파일 타입들 (기본값: "image/*")
 * @param {boolean} [disabled=false] - 컴포넌트 비활성화 상태 (기본값: false)
 * @param {string} [className] - 추가 CSS 클래스명
 * @returns {JSX.Element} 이미지 선택 컴포넌트
 *
 * @example
 * ```tsx
 * <ImageSelector
 *   title="이미지 추가"
 *   onImageSelect={(file) => console.log('Selected file:', file)}
 *   accept="image/png,image/jpeg"
 * />
 * ```
 */
export default function ImageSelector({
  title,
  onImageSelect,
  accept = "image/*",
  disabled = false,
  className = "",
}: ImageSelectorProps) {
  /** 선택된 이미지 파일 상태 */
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  /** 이미지 미리보기 URL 상태 */
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  /** 파일 입력 ref */
  const fileInputRef = useRef<HTMLInputElement>(null);

  /**
   * 이미지 선택 핸들러
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - 파일 입력 이벤트
   */
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // 이전 미리보기 URL이 있다면 메모리 해제
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // 새 미리보기 URL 생성
      const newPreviewUrl = URL.createObjectURL(file);

      setSelectedImage(file);
      setPreviewUrl(newPreviewUrl);
      onImageSelect?.(file);
    }
  };

  /**
   * 이미지 제거 핸들러
   */
  // const handleRemoveImage = () => {
  //   if (previewUrl) {
  //     URL.revokeObjectURL(previewUrl);
  //   }
  //
  //   setSelectedImage(null);
  //   setPreviewUrl(null);
  //   onImageSelect?.(null);
  //
  //   // 파일 입력 초기화
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  /**
   * 파일 선택 트리거 함수
   * 숨겨진 파일 입력을 클릭합니다.
   */
  const triggerFileSelect = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`relative py-[8px] ${className}`}>
      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleImageSelect}
        className="hidden"
        disabled={disabled}
      />
      {/* 키워드 섹션 제목 */}
      <h3 className="text-gray-80 mb-[12px] text-[14px] font-bold">{title}</h3>
      {/* 이미지 표시 영역 */}
      <div className="flex flex-col items-center">
        {/* 이미지 미리보기 또는 기본 아이콘 */}
        <div className="border-gray-30 relative flex h-full w-full items-center justify-center rounded-lg border transition-all duration-200">
          {selectedImage && previewUrl ? (
            // 선택된 이미지 미리보기
            <div className="relative my-[8px]">
              <Image
                src={previewUrl}
                alt="Selected image preview"
                width={200}
                height={200}
                className="h-[200px] w-[200px] rounded-[12px] object-cover"
              />

              {/* 이미지 제거 버튼 */}
              {/* <button*/}
              {/*  onClick={handleRemoveImage}*/}
              {/*  className="bg-opacity-50 hover:bg-opacity-70 absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-all duration-200"*/}
              {/*  disabled={disabled}*/}
              {/* >*/}
              {/*  ×*/}
              {/* </button>*/}

              {/* 이미지 선택 버튼 (이미지 위에 오버레이) */}
              <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 transform">
                <button
                  onClick={triggerFileSelect}
                  disabled={disabled}
                  className="border-gray-30 bg-gray-10 text-gray-90 inline-flex h-[28px] cursor-pointer items-center justify-center gap-1 rounded-[20px] border px-[10px] whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="text-[12px]">이미지 선택</span>
                  <Icon
                    name="plus"
                    className={``}
                  />
                </button>
              </div>
            </div>
          ) : (
            // 기본 상태 (이미지 미선택)
            <div className="my-[8px] flex h-[200px] flex-col items-center justify-center gap-[12px] text-gray-500">
              {/* 이미지 아이콘 */}
              <Icon name={`img`} />

              {/* 이미지 선택 버튼 (아이콘 아래) */}
              <button
                onClick={triggerFileSelect}
                disabled={disabled}
                className="border-gray-30 text-gray-90 inline-flex h-[28px] cursor-pointer items-center justify-center gap-1 rounded-[20px] border px-[10px] whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="text-[12px]">이미지 선택</span>
                <Icon
                  name="plus"
                  className={``}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
