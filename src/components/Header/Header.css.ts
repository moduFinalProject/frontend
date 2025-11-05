import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const header = style({
  width: "95%",
  height: "72px",
  display: "flex",
  justifyContent: "space-between",    
  margin: vars.spacing.lg,  
  backgroundColor: vars.color.white, 
  justifySelf: "center"
});

export const headerLogo = style({
  width: "156px"
});

export const headerRight = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
});