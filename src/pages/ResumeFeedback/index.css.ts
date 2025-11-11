import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const container = style({
  width: "100%",
  height: "fit-content",
  maxWidth: 1280,
  margin: "0 auto",
  padding: vars.spacing.lg,

  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.spacing.md,

  "@media": {
    "(max-width: 768px)": {
      flexDirection: "column-reverse",
      alignItems: "flex-start",
    },
  },
});

export const headerContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const headerAction = style({});

export const innerContainer = style({
  paddingTop: 0,
});

globalStyle(`${container} hr`, {
  color: vars.color.line,
  gridColumn: "span 2",
});
