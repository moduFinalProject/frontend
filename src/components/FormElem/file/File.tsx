// import { inputContainer, label, inputBase, errorMessage } from "./Input.css";

import { Button } from "@/components/Button";
import { useEffect, useRef } from "react";
import { btnWrap } from "./File.css";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

export default function File({
  label: labelText,
  type = "img",
  value,
  placeholder,
  onBlur,
  error,
  disabled = false,
}: InputProps) {
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const imgWrap = document.getElementById("imgWrap");
    if (imgWrap && value) {
      imgWrap.innerHTML = `<img src="${value}" alt="증명사진" />`;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleButtonClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 파일 객체 전체 출력
      console.log(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const imgWrap = document.getElementById("imgWrap");
        if (imgWrap) {
          imgWrap.innerHTML = `<img src="${reader.result}" alt="증명사진" />`;
        }
      };
      reader.readAsDataURL(file);

      console.log(reader);
    }
  };

  return (
    <div className={btnWrap}>
      {labelText && (
        <Button
          widthStyle="fit"
          color="white"
          callback={() => {
            handleButtonClick();
          }}
          text={labelText}
          icon="UP"
        />
      )}
      <input
        id="fileInput"
        className="a11y-hidden"
        type="file"
        ref={fileRef}
        onChange={handleFileChange}
        onBlur={onBlur}
        disabled={disabled}
        accept={type === "img" ? "image/*" : ".pdf, application/pdf"}
      />
      {placeholder && <p>{placeholder}</p>}
      {error && <span>{error}</span>}
    </div>
  );
}
