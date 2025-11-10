import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const container = style({
  boxSizing: "border-box",
  width: "100%",
  height: "fit-content",
  maxWidth: 1280,
  margin: "0 auto",
  padding: vars.spacing.lg,

  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,

  hr: {
    color: vars.color.line,
    gridColumn: "span 2",
  },
});

export const header = style({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: vars.spacing.md,

  "@media": {
    "(max-width: 768px)": {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
    },
  },
});

export const innerContainer = style({
  padding: 0,
});
