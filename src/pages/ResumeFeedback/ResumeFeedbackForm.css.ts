import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const container = style({
  width: "100%",
  height: "fit-content",
  maxWidth: 1280,
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const headerWrapper = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: vars.spacing.lg,
});

export const formSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  padding: vars.spacing.lg,
  marginBottom: vars.spacing.lg,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  transition: "all 0.3s ease",
});

export const formGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  marginTop: vars.spacing.sm,
});

export const helperText = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.subText,
  margin: 0,
  marginTop: vars.spacing.xs,
});

export const stepSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  padding: vars.spacing.lg,
  backgroundColor: vars.color.white,
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.color.line}`,
  transition: "all 0.3s ease",
});

export const stepSectionTitle = style({
  fontSize: vars.typography.fontSize.lg,
  color: vars.color.defaultText,
  margin: 0,
  marginBottom: vars.spacing.sm,
});

export const stepSectionDesc = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.subText,
  margin: 0,
  lineHeight: 1.6,
});

export const stepItem = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: vars.spacing.md,
  flex: 1,
  padding: vars.spacing.lg,
  backgroundColor: "#EFF6FF",
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.color.line}`,
  transition: "all 0.3s ease",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",

  ":hover": {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-2px)",
  },
});

export const stepNumber = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: vars.color.main,
  color: vars.color.white,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  flexShrink: 0,
});

export const stepContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
  flex: 1,
});

export const stepContentTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.defaultText,
  margin: 0,
  textAlign: "left",
});

export const stepContentDesc = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.subText,
  margin: 0,
  textAlign: "left",
});

export const selectedJobCard = style({
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  backgroundColor: vars.color.white,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  transition: "all 0.3s ease",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",

  ":hover": {
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
});

export const selectedJobCardHeader = style({
  flex: 1,
});

export const selectedJobTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.defaultText,
  margin: 0,
  marginBottom: vars.spacing.xs,
});

export const selectedJobCompany = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.subText,
  margin: 0,
});

export const formLabel = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.xs,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
});

export const errorMessage = style({
  color: vars.color.delete,
  fontSize: vars.typography.fontSize.sm,
  margin: `${vars.spacing.sm} 0 0 0`,
  padding: `0 0 0 ${vars.spacing.sm}`,
});

export const stepItemsContainer = style({
  display: "flex",
  gap: vars.spacing.lg,
  marginTop: vars.spacing.sm,
  flexWrap: "wrap",
  "@media": {
    "(max-width: 1024px)": {
      gap: vars.spacing.md,
    },
    "(max-width: 768px)": {
      flexDirection: "column",
      gap: vars.spacing.sm,
    },
  },
});
