import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const modalOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 1000,
});

export const modalContent = style({
  backgroundColor: vars.color.white,
  borderRadius: vars.borderRadius.lg,
  boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
  width: "100%",
  height: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  animation: "slideIn 0.3s ease-out",
});

export const modalHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  padding: vars.spacing.lg,
});

export const modalTitle = style({
  fontSize: vars.typography.fontSize.m,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.defaultText,  
});

export const modalSubTitle = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.subText,
  marginTop: vars.spacing.sm,
});

export const closeButton = style({
  background: "none",
  border: "none",
  fontSize: vars.typography.fontSize.m,
  color: vars.color.defaultText,
  cursor: "pointer",
  padding: "0",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "color 0.2s ease",

  ":hover": {
    color: vars.color.defaultText,
  },
});

export const modalHeaderButton = style({
  background: "none",
  border: "none",
  fontSize: vars.typography.fontSize.lg,
  color: vars.color.defaultText,
  cursor: "pointer",
  padding: "0",
  width: "24px",
  height: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "color 0.2s ease",

  ":hover": {
    color: vars.color.defaultText,
  },
});

export const modalBody = style({
  padding: vars.spacing.lg,
});

export const modalHeaderButtons = style({
  display: "flex",
  gap: vars.spacing.sm,
  alignItems: "center",
});
