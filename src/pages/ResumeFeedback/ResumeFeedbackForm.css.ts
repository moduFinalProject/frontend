import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const container = style({
  width: "100%",
  height: "fit-content",
  maxWidth: 1280,
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xl,
});

export const header = style({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  gap: vars.spacing.md,
});
