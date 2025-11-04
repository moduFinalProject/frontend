import { baseButton, buttonColor, buttonWidth } from "./Button.css";

interface ButtonProps {
  widthStyle: "full" | "fit";
  color: "blue" | "red" | "gray";
  text: string;
  callback: () => void;
  icon?: React.ReactNode;
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
      {text}
    </button>
  );
}
