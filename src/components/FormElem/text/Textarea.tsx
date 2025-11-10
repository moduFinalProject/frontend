import { forwardRef } from "react";
import {
  inputContainer,
  label,
  inputBase,
  errorMessage,
  errorInput,
} from "./Input.css";

interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  rows?: number;
  isMust?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(function Textarea(
  {
    label: labelText,
    placeholder,
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
    rows = 5,
    isMust = false,
  },
  ref
) {
  return (
    <div className={inputContainer}>
      {labelText && (
        <label className={label}>
          {labelText}
          {isMust && <span> *</span>}
        </label>
      )}
      <textarea
        name={name}
        ref={ref}
        style={{ resize: "none" }}
        className={`${inputBase} ${error && errorInput}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        rows={rows}
      />
      <p>글자 수: {value?.length}</p>
      {error && (
        <span id={name} className={errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
});

export default Textarea;
