import { baseButton, buttonColor, buttonWidth } from "./Button.css";
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
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${baseButton} ${buttonColor[color]} ${buttonWidth[widthStyle]}`}
      type={buttonType}
      onClick={callback}
      form={form}
    >
      {icon && <img src={ICONS[icon]} alt="" />}
      {text}
    </button>
  );
}
