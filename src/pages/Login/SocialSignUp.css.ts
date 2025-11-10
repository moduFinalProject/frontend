import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const profileContainer = style({
  width: "100%",
  backgroundColor: vars.color.white,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const profileContent = style({
  width: "100%",
  maxWidth: "1280px",
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const profileHeader = style({
  display: "flex",
  gap: vars.spacing.md,
  alignItems: "center",
});

export const headerText = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
  flex: 1,
});

export const headerTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
  lineHeight: 1.5,
  color: vars.color.defaultText,
});

export const headerSubtitle = style({
  fontSize: vars.typography.fontSize.sm,
  lineHeight: 1.43,
  color: vars.color.subText,
});