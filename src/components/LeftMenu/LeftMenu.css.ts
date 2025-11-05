import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const leftMenu = style({
  width: "15%",
  height: "90%",
  display: "flex",
  flexDirection: "column",  
  backgroundColor: vars.color.white,
  borderTop: `1px solid ${vars.color.line}`,  
  borderRight: `1px solid ${vars.color.line}`,  
  position: "fixed"
});

export const menuContainer = style({
  listStyle: "none",
  padding: vars.spacing.md,
  margin: 0
});

export const menuBottom = style({    
  borderTop: `1px solid ${vars.color.line}`,
  marginTop: "auto"
});

export const menuItem = style({  
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.xs,
  cursor: "pointer",
  transition: "background-color 0.2s",
  borderRadius: vars.borderRadius.sm,
  ":hover": {
    background: vars.color.sub,    
  },
  ":active": {
    background: vars.color.sub,    
  }
});

export const menuItemActive = style({
  background: vars.color.sub
});

export const menuLink = style({
  textDecoration: "none",
  color: "#333",
  flex: 1,
  display: "flex",
  alignItems: "center",
  padding: vars.spacing.md
});