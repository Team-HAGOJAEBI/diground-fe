import React from "react";

interface CommonInputProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
}

export default function CommonInput({
  label,
  required = false,
  placeholder = "",
  error,
  value,
  onChange,
  textarea = false,
}: CommonInputProps) {
  return (
    <div className="mb-6">
      <label className="block font-bold text-white mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          className={`w-full p-4 rounded-lg border bg-black text-white placeholder-gray-500 min-h-[120px] resize-none focus:outline-none ${
            error ? "border-red-500" : "border-gray-400"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={`w-full p-4 rounded-lg border bg-black text-white placeholder-gray-500 focus:outline-none ${
            error ? "border-red-500" : "border-gray-400"
          }`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
    </div>
  );
}
