import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const header = style({
  width: "256px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",  
  backgroundColor: vars.color.white,  
  position: "fixed"
});

export const headerLogo = style({
  width: "156px",
  margin:vars.spacing.md
});

export const menuContainer = style({
  borderTop: `1px solid ${vars.color.line}`,  
  borderRight: `1px solid ${vars.color.line}`,  
  height: "100vh",
  display: "flex",           // ← 추가
  flexDirection: "column",   // ← 추가
});

export const menuUi = style({
  listStyle: "none",
  padding: vars.spacing.md,
  margin: 0,
});

export const menuBottom = style({    
  borderTop: `1px solid ${vars.color.line}`,
  marginTop: "auto"
});

export const menuItem = style({  
  display: "flex",
  alignItems: "center",  
  padding:vars.spacing.xs,
  cursor: "pointer",
  transition: "background-color 0.2s",  
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
  gap: vars.spacing.md,
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.sm,  
  ":hover": {
    background: vars.color.sub,    
  },
  ":active": {
    background: vars.color.sub,    
  }
});

export const logoutLink = style({
  color: vars.color.delete,
  ":hover": {
    background: "#FEF2F2",
  },
  ":active": {
    background: "#FEF2F2",
  }
});