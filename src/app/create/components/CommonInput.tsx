import React from "react";

interface CommonInputProps {
  /** 입력 필드의 라벨 텍스트 */
  label: string;
  /** 입력 필드의 현재 값 */
  value: string;
  /** 값 변경 시 호출되는 핸들러 함수 */
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 에러 메시지 (값이 있거나 required이고 값이 비어있을 때 표시) */
  errorMessage?: string;
  /** 입력 필드의 플레이스홀더 텍스트 */
  placeholder?: string;
  /** 필수 입력 여부 (에러 표시 조건) */
  required?: boolean;
  /** textarea 사용 여부 (true: textarea, false: input) */
  textarea?: boolean;
}

/**
 * 공통 입력 컴포넌트
 * @param label - 입력 필드의 라벨 텍스트
 * @param value - 입력 필드의 현재 값
 * @param onChange - 값 변경 시 호출되는 핸들러 함수
 * @param errorMessage - 에러 메시지 (값이 있거나 required이고 값이 비어있을 때 표시)
 * @param placeholder - 입력 필드의 플레이스홀더 텍스트
 * @param required - 필수 입력 여부 (에러 표시 조건)
 * @param textarea - textarea 사용 여부 (true: textarea, false: input)
 */
export default function CommonInput({
  label,
  value,
  onChange,
  errorMessage,
  placeholder = "",
  required = false,
  textarea = false,
}: CommonInputProps) {
  return (
    <div className="flex flex-col w-full items-start    relative mb-[36px]">
      <div className="w-full">
        <label className="font-bold text-[var(--color-gray-80)] text-sm  bg-red-200">{label}</label>
        <div
          className={`flex w-full flex-col ${textarea ? "h-[240px]" : "h-[60px]"} border items-center justify-center my-[8px] rounded-lg overflow-hidden ${errorMessage || (required && !value) ? "border-dashed border-[#923939]" : " border-[var(--color-gray-60)]"}`}
        >
          {textarea ? (
            <textarea
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="p-[20px] w-full h-[240px] font-normal text-[var(--color-gray-90)] text-base bg-transparent border-none outline-none resize-none overflow-y-auto custom-scrollbar placeholder:text-[var(--color-gray-50)]"
            />
          ) : (
            <input
              type="url"
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className="p-[20px] w-full h-[25px] font-normal text-[var(--color-gray-90)] text-base overflow-hidden text-ellipsis bg-transparent border-none outline-none placeholder:text-[var(--color-gray-50)]"
            />
          )}
        </div>
        {(errorMessage || (required && !value)) && (
          <p
            id="platform-link-help"
            className="font-normal text-[#ea4141] text-[13px] leading-5"
          >
            {errorMessage || (required && !value ? "필수 입력 항목입니다" : "")}
          </p>
        )}
      </div>
    </div>
  );
}
