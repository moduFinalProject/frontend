import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const baseButton = style({
  padding: vars.spacing.md,
  border: "none",
  borderRadius: vars.borderRadius.sm,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",

  ":hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },

  ":active": {
    transform: "translateY(0px)",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },

  ":disabled": {
    cursor: "not-allowed",
    opacity: "0.6",
    transform: "none",
    boxShadow: "none",
  },
});

export const buttonColor = styleVariants({
  red: {
    backgroundColor: "#D4183D",
    color: "#FFFFFF",
  },
  blue: {
    backgroundColor: "#0088FF",
  },
  gray: { backgroundColor: "#F3F3F5", color: "#0A0A0A" },
});

export const buttonWidth = styleVariants({
  full: {
    width: "100%",
  },
  fit: {
    width: "fit-content",
  },
});
