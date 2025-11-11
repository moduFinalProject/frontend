import { forwardRef } from "react";
import { Button } from "@/components/Button";
import {
  inputContainer,
  label,
  inputBase,
  errorMessage,
  useBtn,
  hidden,
  errorInput,
} from "./Input.css";

interface InputProps {
  id?: string;
  label?: string;
  type?: "text" | "email" | "password" | "tel" | "date" | "month" | "search";
  placeholder?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  isMust?: boolean;
  isBtn?: boolean;
  isHidden?: boolean;
}

const Text = forwardRef<HTMLInputElement, InputProps>(function Text(
  {
    id,
    label: labelText,
    type = "text",
    placeholder,
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
    isMust = false,
    isBtn = false,
    isHidden = false,
  },
  ref
) {
  return (
    <div className={`${inputContainer} ${isHidden && hidden}`}>
      {labelText && (
        <label className={label}>
          {labelText}
          {isMust && <span> *</span>}
        </label>
      )}
      <div className={useBtn}>
        <input
          id={id}
          name={name}
          ref={ref}
          type={type}
          className={`${inputBase} ${error && errorInput}`}
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
      {error && (
        <span id={name} className={errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
});

export default Text;
