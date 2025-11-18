import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const modalDescription = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: vars.spacing.lg,
  color: vars.color.subText,
  lineHeight: "1.6",
  textAlign: "center",
});

export const modalTitle = style({
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.bold,
  marginBottom: vars.spacing.sm,
  color: vars.color.defaultText,
});

export const modalSubtext = style({
  fontSize: vars.typography.fontSize.md,
  color: vars.color.subText,
  marginBottom: vars.spacing.lg,
  lineHeight: "1.6",
});

export const modalBenefits = style({
  backgroundColor: vars.color.sub,
  padding: vars.spacing.sm,
  borderRadius: vars.borderRadius.sm,
  marginBottom: vars.spacing.lg,
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.subText,
  lineHeight: "1.7",
});

export const buttonGroup = style({
  display: "flex",
  gap: vars.spacing.lg,
  justifyContent: "center",
  marginTop: vars.spacing.md,
  paddingTop: vars.spacing.lg,
});

export const loadingText = style({
  padding: vars.spacing.lg,
  textAlign: "center",
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.md,
});
