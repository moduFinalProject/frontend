import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const container = style({
  boxSizing: "border-box",
  width: "100%",
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
});
export const headerText = style({
  h2: {
    margin: 0,
    fontSize: vars.typography.fontSize.xl,
    fontweight: vars.typography.fontWeight.bold,
  },
  p: {
    marginTop: vars.spacing.sm,
    fontSize: vars.typography.fontSize.md,
    color: vars.color.subText,
  },
});
