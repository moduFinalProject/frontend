import { useEffect, useId, useRef, useState } from "react";
import Button from "../Button/Button";
import type { ICONS } from "@/constants/icons";
import { dropdownContainer, dropdownMenu } from "./OptionsDropdown.css.ts";

type ButtonColor = "blue" | "red" | "white" | "none" | "gray";
type ButtonWidth = "full" | "fit";

type OptionsDropdownItem = {
  label: string;
  onSelect: () => void;
  color?: ButtonColor;
  widthStyle?: ButtonWidth;
};

interface OptionsDropdownProps {
  ariaLabel: string;
  items: OptionsDropdownItem[];
  triggerIcon?: keyof typeof ICONS;
  triggerText?: string;
  triggerColor?: ButtonColor;
  triggerWidth?: ButtonWidth;
  triggerClassName?: string;
  menuClassName?: string;
  itemWidthStyle?: ButtonWidth;
  containerClassName?: string;
}

export default function OptionsDropdown({
  ariaLabel,
  items,
  triggerIcon = "MORE",
  triggerText = "",
  triggerColor = "none",
  triggerWidth = "fit",
  triggerClassName,
  menuClassName,
  itemWidthStyle = "full",
  containerClassName,
}: OptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const menuClassNames = [dropdownMenu, menuClassName]
    .filter(Boolean)
    .join(" ");

  const containerClassNames = [dropdownContainer, containerClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={containerClassNames}>
      <Button
        widthStyle={triggerWidth}
        color={triggerColor}
        text={triggerText}
        icon={triggerIcon}
        callback={() => {
          setIsOpen((prev) => !prev);
        }}
        ariaLabel={ariaLabel}
        className={triggerClassName}
        ariaExpanded={isOpen}
        ariaHasPopup="menu"
        ariaControls={isOpen ? menuId : undefined}
      />
      {isOpen && (
        <div role="menu" id={menuId} className={menuClassNames}>
          {items.map(
            ({ label, onSelect, color = "none", widthStyle = "full" }) => (
              <Button
                key={label}
                widthStyle={itemWidthStyle ?? widthStyle}
                color={color}
                text={label}
                callback={() => {
                  onSelect();
                  setIsOpen(false);
                }}
                role="menuitem"
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
