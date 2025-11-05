import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const card = style({
  padding: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,

  h3: {
    fontWeight: vars.typography.fontWeight.normal,
  },
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))",
  gap: vars.spacing.lg,

  "@media": {
    "(max-width: 620px)": {
      gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
      gap: `${vars.spacing.lg} 0`,
    },
  },
});
