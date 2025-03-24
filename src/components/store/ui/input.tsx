import { ChangeEvent } from "react";

interface Props {
  name: string;
  value: string | number;
  type: "text" | "number";
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly?: boolean;
}

export default function Input({
  name,
  onChange,
  type,
  value,
  placeholder,
  readonly,
}: Props) {
  const inputValue = type === "number" ? String(value) : value;

  return (
    <div className="w-full relative">
      <input
        type={type}
        className="w-full pr-6 pl-8 py-4 rounded-xl outline-none duration-200 ring-1 ring-transparent focus:ring-[#11BE86]"
        name={name}
        placeholder={placeholder}
        value={inputValue}
        onChange={onChange}
        readOnly={readonly}
      />
    </div>
  );
}
