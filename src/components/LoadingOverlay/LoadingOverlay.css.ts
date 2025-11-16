import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const overlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
  pointerEvents: "auto",
});

export const spinnerContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",    
});

export const spinnerImage = style({
  width: "60px",
  height: "60px",
  objectFit: "contain",
});
