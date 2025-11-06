import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const topbar = style({
  width: "100%",  
  height: "69px", 
  display: "flex",
  justifyContent: "right",
  padding: vars.spacing.lg,
  backgroundColor: vars.color.white,
  borderBottom: `1px solid ${vars.color.line}`
});

export const topbarRight = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});

export const userInfo = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.md
});

export const userAvatar = style({
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  backgroundColor: vars.color.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: vars.color.white,
  fontSize: vars.typography.fontSize.m,
  fontWeight: vars.typography.fontWeight.bold
});

export const userDetails = style({
  display: "flex",
  flexDirection: "column"
});

export const userName = style({
  margin: 0,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.defaultText
});

export const userEmail = style({
  margin: 0,
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.subText,
  marginTop: vars.spacing.xs
});