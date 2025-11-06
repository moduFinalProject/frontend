import { inputContainer, label, inputBase, errorMessage } from "./Input.css";

interface InputProps {
  label?: string;
  type?:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "file"
    | "date"
    | "checkbox"
    | "radio";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
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
}: InputProps) {
  return (
    <div className={inputContainer}>
      {labelText && <label className={label}>{labelText}</label>}
      <input
        type={type}
        className={inputBase}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && <span className={errorMessage}>{error}</span>}
    </div>
  );
}
