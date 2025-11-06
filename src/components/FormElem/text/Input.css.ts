import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const inputContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  width: "100%",
});

export const label = style({
  fontSize: vars.typography.fontSize.sm,
  lineHeight: "14px",
  color: vars.color.defaultText,
});

export const inputBase = style({
  // width: "100%",
  // height: "36px",
  flex: 1,
  padding: `${vars.spacing.xs} 12px`,
  fontSize: vars.typography.fontSize.sm,
  lineHeight: "20px",
  backgroundColor: vars.color.formBg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.sm,
  color: vars.color.defaultText,
  outline: "none",

  "::placeholder": {
    color: vars.color.disabled,
  },

  ":focus": {
    borderColor: vars.color.main,
  },

  ":disabled": {
    backgroundColor: vars.color.formBg,
    color: vars.color.disabled,
    cursor: "not-allowed",
  },
});

export const errorMessage = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.delete,
  lineHeight: "14px",
});

export const useBtn = style({
  display: "flex",
  gap: vars.spacing.sm,

  button: {
    flexBasis: "auto",
  },
});
