import { baseButton, buttonColor, buttonWidth } from "./Button.css";
import { ICONS } from "@/constants/icons";

interface ButtonProps {
  widthStyle: "full" | "fit";
  color: "blue" | "red" | "white" | "none";
  text: string;
  callback: () => void;
  icon?: keyof typeof ICONS;
  buttonType?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function Button({
  widthStyle,
  color,
  text,
  callback,
  icon,
  disabled = false,
  buttonType = "button",
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={`${baseButton} ${buttonColor[color]} ${buttonWidth[widthStyle]}`}
      type={buttonType}
      onClick={callback}
    >
      {icon && <img src={ICONS[icon]} />}
      {text}
    </button>
  );
}
