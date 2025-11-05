import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const footer = style({
  width: "100%",
  height: "72px",
  textAlign: "center",
  alignContent: "center",    
  margin: vars.spacing.lg,
  backgroundColor: vars.color.white,
  borderTop: `1px solid ${vars.color.line}`
});