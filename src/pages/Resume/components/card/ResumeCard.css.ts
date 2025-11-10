import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const card = style({
  padding: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  gridColumn: "span 2",

  h3: {
    fontWeight: vars.typography.fontWeight.normal,
    flex: 1,
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
  gap: vars.spacing.lg,

  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: `${vars.spacing.lg} 0`,
    },
  },
});

export const innerGrid = style({
  full: {
    "@media": {
      "(max-width: 1290px)": {
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: `${vars.spacing.lg} 0`,
      },
    },
  },
});

export const titleWrap = style({
  display: "flex",
});
