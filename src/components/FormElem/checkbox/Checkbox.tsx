import { forwardRef } from "react";
import {
  label,
  errorMessage,
  hidden,
  errorInput,
  checkboxWrap,
} from "../text/Input.css";

interface InputProps {
  label: string;
  type?: "checkbox" | "radio";
  name: string;
  value: boolean;
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
  isMust?: boolean;
  isHidden?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, InputProps>(function Text(
  {
    label: labelText,
    type = "checkbox",
    name,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
    isMust = false,
    isHidden = false,
  },
  ref
) {
  return (
    <div className={`${isHidden && hidden}`}>
      <div className={checkboxWrap}>
        <label className={`${label} ${checkboxWrap}`}>
          <input
            name={name}
            ref={ref}
            type={type}
            className={`${error && errorInput}`}
            checked={value}
            value={value ? 1 : 0}
            onChange={(e) => onChange(e)}
            onBlur={onBlur}
            disabled={disabled}
          />
          {labelText}
          {isMust && <span> *</span>}
        </label>
      </div>
      {error && (
        <span id={name} className={errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
});

export default Checkbox;
