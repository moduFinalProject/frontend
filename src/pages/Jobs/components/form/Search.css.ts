import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const form = style({
  width: "50%",
  display: "flex",
  gap: vars.spacing.sm,
});

globalStyle(`${form} input`, {
  backgroundColor: vars.color.formBg,
  border: "none",
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderRadius: vars.borderRadius.sm,
  flex: 1,
});
