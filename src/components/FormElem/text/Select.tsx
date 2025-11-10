import {
  inputContainer,
  label,
  inputBase,
  errorMessage,
  useBtn,
  hidden,
  errorInput,
} from "./Input.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  isMust?: boolean;
  isHidden?: boolean;
  options: SelectOption[];
}

export default function Select({
  label: labelText,
  placeholder = "선택하세요",
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled = false,
  isMust = false,
  isHidden = false,
  options,
}: SelectProps) {
  return (
    <div className={`${inputContainer} ${isHidden && hidden}`}>
      {labelText && (
        <label className={label}>
          {labelText}
          {isMust && <span> *</span>}
        </label>
      )}
      <div className={useBtn}>
        <select
          name={name}
          className={`${inputBase} ${error && errorInput}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          disabled={disabled}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span id={name} className={errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}
