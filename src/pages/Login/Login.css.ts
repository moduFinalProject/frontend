import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const loginContainer = style({
  justifyItems: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  padding: vars.spacing.lg,
  backgroundColor: vars.color.mainBg,
});

export const formWrapper = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  maxWidth: "400px",
});

export const formContent = style({
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.xl,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const logoSection = style({
  marginBottom: vars.spacing.xl,
  textAlign: "center",
});

export const titleSection = style({
  textAlign: "center",
  marginBottom: vars.spacing.md,
});

export const heading = style({
  margin: `0 0 ${vars.spacing.sm} 0`,
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.defaultText,
});

export const subHeading = style({
  margin: 0,
  fontSize: vars.typography.fontSize.md,
  color: vars.color.subText,
});

export const formSection = style({
  width: "100%",
  maxWidth: "400px",
});

export const fieldsetStyle = style({
  border: "none",
  padding: 0,
  margin: `0 0 ${vars.spacing.md} 0`,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const formGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const formLabel = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.defaultText,
});

export const formInput = style({
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

export const linkSection = style({
  display: "flex",
  gap: vars.spacing.sm,
  alignItems: "center",
  justifyContent: "center",
  fontSize: vars.typography.fontSize.sm,
});

export const linkSignup = style({
  textDecoration: "none",
  color: "#2E6FF2",
  transition: "color 0.3s ease",
  borderRadius: "4px",
  padding: "2px 4px",

  ":hover": {
    color: "#1e4ba3",
    textDecoration: "underline",
  },

  ":focus-visible": {
    outline: `2px solid ${vars.color.main}`,
    outlineOffset: "2px",
  },
});

export const linkForgot = style({
  textDecoration: "none",
  color: vars.color.disabled,
  transition: "color 0.3s ease",
  borderRadius: "4px",
  padding: "2px 4px",

  ":hover": {
    color: vars.color.defaultText,
    textDecoration: "underline",
  },

  ":focus-visible": {
    outline: `2px solid ${vars.color.main}`,
    outlineOffset: "2px",
  },
});

export const dividerSection = style({
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",

  "::before": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    height: "1px",
    backgroundColor: vars.color.line,
  },
});

export const dividerText = style({
  position: "relative",
  backgroundColor: vars.color.white,
  padding: `0 ${vars.spacing.sm}`,
  margin: 0,
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.disabled,
  fontWeight: vars.typography.fontWeight.normal,
});

export const socialSection = style({
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
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
