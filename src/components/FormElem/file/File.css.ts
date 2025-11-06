import { vars } from "@/design-system";
import { style } from "@vanilla-extract/css";

export const btnWrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
});
