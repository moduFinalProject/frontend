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

export const agreementSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const formInputStyle = style({
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.typography.fontSize.sm,
  boxSizing: "border-box",
  transition: "all 0.3s ease",

  ":focus": {
    outline: "none",
    borderColor: vars.color.line,
    boxShadow: "0 0 0 2px rgba(0, 102, 255, 0.1)",
  },

  ":focus-visible": {
    outline: `2px solid ${vars.color.main}`,
    outlineOffset: "2px",
    boxShadow: "0 0 0 4px rgba(0, 102, 255, 0.1)",
  },
});

export const errorAlert = style({
  color: vars.color.delete,
  marginBottom: vars.spacing.md,
  fontSize: vars.typography.fontSize.sm,
  textAlign: "center",
  padding: vars.spacing.md,
  backgroundColor: "#fee2e2",
  borderRadius: vars.borderRadius.sm,
});