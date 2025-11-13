import { vars } from "@/design-system";
import { style } from "@vanilla-extract/css";

export const jobList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const jobListModal = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
  listStyle: "none",
  padding: 0,
  margin: 0,
});

export const listSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});
