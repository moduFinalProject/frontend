import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const notFoundContainer = style({
  width: "100%",
  minHeight: "100vh",
  backgroundColor: vars.color.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const notFoundContent = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
});

export const notFoundImage = style({
  width: "380px",
  height: "auto",
  maxWidth: "100%",
});

export const notFoundTitle = style({
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.xl,
  lineHeight: 1.2,
  color: vars.color.defaultText,
  marginTop: vars.spacing["2xl"],
});

export const notFoundDescription = style({
  fontSize: vars.typography.fontSize.md,
  lineHeight: 1.375,
  color: vars.color.subText,
  marginTop: "20px",
});

export const notFoundButtonContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "32px",
  gap: "12px",
});
