import { inputContainer, label, inputBase, errorMessage } from "./Input.css";

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  rows?: number;
}

export default function Textarea({
  label: labelText,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  rows = 5,
}: InputProps) {
  return (
    <div className={inputContainer}>
      <>
        {labelText && <label className={label}>{labelText}</label>}
        <textarea
          style={{ resize: "none" }}
          className={inputBase}
          placeholder={`${placeholder}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
          rows={rows}
        />
        <p>글자 수: {value?.length}</p>
        {error && <span className={errorMessage}>{error}</span>}
      </>
    </div>
  );
}
