import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const card = style({
  backgroundColor: vars.color.white,
  padding: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  gridColumn: "span 2",

  "@media": {
    "(max-width: 768px)": {
      gridColumn: "span 1",
    },
  },
});

export const titleText = style({
  fontWeight: vars.typography.fontWeight.normal,
  flex: 1,
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: vars.spacing.lg,

  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
      gap: `${vars.spacing.lg} 0`,
    },
  },
});
