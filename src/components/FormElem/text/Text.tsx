import { Button } from "@/components/Button";
import {
  inputContainer,
  label,
  inputBase,
  errorMessage,
  useBtn,
} from "./Input.css";

interface InputProps {
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "date" | "month";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  isMust?: boolean;
  isBtn?: boolean;
}

export default function Text({
  label: labelText,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  isMust = false,
  isBtn = false,
}: InputProps) {
  return (
    <div className={inputContainer}>
      {labelText && (
        <label className={label}>
          {labelText}
          {isMust && <span> *</span>}
        </label>
      )}
      <div className={useBtn}>
        <input
          type={type}
          className={inputBase}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
        />
        {isBtn && (
          <Button
            callback={() => {}}
            color="blue"
            text="추가"
            widthStyle="fit"
          />
        )}
      </div>
      {error && <span className={errorMessage}>{error}</span>}
    </div>
  );
}
