import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const baseButton = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.sm,
  cursor: "pointer",
  // transition: "all 0.2s ease-in-out",
  backgroundColor: vars.color.white,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: vars.spacing.sm,
  alignSelf: "flex-start",
  transition: "0.2s ease",

  selectors: {
    "&:hover": {
      border: `1px solid ${vars.color.line}`,
      opacity: 0.7,
    },

    "&:active": {
      border: `1px solid ${vars.color.line}`,
      opacity: 0.8,
    },

    "&:disabled": {
      cursor: "not-allowed",
      backgroundColor: vars.color.disabled,
      color: vars.color.white,
      border: `1px solid ${vars.color.disabled}`,
    },
  },
});

export const buttonColor = styleVariants({
  none: {
    backgroundColor: vars.color.white,
    color: vars.color.defaultText,
    border: `1px solid ${vars.color.white}`,
    fontWeight: vars.typography.fontWeight.normal,
  },
  white: {
    backgroundColor: vars.color.white,
    color: vars.color.defaultText,
    border: `1px solid ${vars.color.line}`,
    fontWeight: vars.typography.fontWeight.normal,

    "&:hover": {
      border: `1px solid ${vars.color.line}`,
      backgroundColor: "#e9ebef",
      color: vars.color.defaultText,
      opacity: 1,
    },
  },
  red: {
    backgroundColor: vars.color.delete,
    color: vars.color.white,
    border: `1px solid ${vars.color.delete}`,
    fontWeight: vars.typography.fontWeight.bold,
  },
  blue: {
    backgroundColor: vars.color.main,
    color: vars.color.white,
    border: `1px solid ${vars.color.main}`,
    fontWeight: vars.typography.fontWeight.bold,
  },
  gray: {
    backgroundColor: vars.color.mainBg,
    color: vars.color.defaultText,
    border: `1px solid ${vars.color.mainBg}`,
    fontWeight: vars.typography.fontWeight.bold,
    padding: vars.spacing.sm,

    ":hover": {
      border: `1px solid #e9ebef`,
      backgroundColor: "#e9ebef",
      opacity: 1,
    },
  },
});

export const buttonWidth = styleVariants({
  full: {
    width: "100%",
  },
  fit: {
    width: "fit-content",
    flexShrink: 0,
  },
});
