import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const flex = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,

  hr: {
    color: vars.color.line,
    gridColumn: "span 2",
  },
});
