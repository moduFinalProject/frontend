import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

// Loading state
export const loadingContainer = style({
  padding: vars.spacing.lg,
  textAlign: "center",
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.md,
});

// Error state
export const errorContainer = style({
  padding: vars.spacing.lg,
  color: vars.color.delete,
  fontSize: vars.typography.fontSize.md,
});

// Empty state
export const emptyContainer = style({
  padding: vars.spacing.lg,
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.md,
});
