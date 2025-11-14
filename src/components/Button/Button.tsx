import {
  baseButton,
  buttonColor,
  buttonWidth,
  mobileHidden,
} from "./Button.css";
import { ICONS } from "@/constants/icons";

interface ButtonProps {
  widthStyle: "full" | "fit";
  color: "blue" | "red" | "white" | "none" | "gray";
  text: string;
  callback: () => void;
  icon?: keyof typeof ICONS;
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
  ariaLabel?: string;
  className?: string;
  ariaExpanded?: boolean;
  ariaHasPopup?: boolean | "dialog" | "menu" | "listbox" | "tree" | "grid";
  ariaControls?: string;
  role?: string;
}

export default function Button({
  widthStyle,
  color,
  text,
  callback,
  icon,
  disabled = false,
  buttonType = "button",
  form,
  ariaLabel,
  className,
  ariaExpanded,
  ariaHasPopup,
  ariaControls,
  role,
}: ButtonProps) {
  const classNames = [
    baseButton,
    buttonColor[color],
    buttonWidth[widthStyle],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      disabled={disabled}
      className={`${classNames} ${mobileHidden}`}
      type={buttonType}
      onClick={callback}
      form={form}
      aria-label={ariaLabel}
      aria-expanded={ariaExpanded}
      aria-haspopup={ariaHasPopup}
      aria-controls={ariaControls}
      role={role}
    >
      {icon && <img src={ICONS[icon]} alt="" />}
      {text && <span>{text}</span>}
    </button>
  );
}
