import { style, keyframes } from "@vanilla-extract/css";
import { vars } from "@/design-system";

// 모바일 메뉴 애니메이션 시간 (0.7초 = 700ms)
const ANIMATION_DURATION = "0.7s";

const slideInMenu = keyframes({
  from: {
    transform: "translateX(-100%)",
    opacity: 0,
  },
  to: {
    transform: "translateX(0)",
    opacity: 1,
  },
});

const fadeInOverlay = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 0.5,
  },
});

const slideOutMenu = keyframes({
  from: {
    transform: "translateX(0)",
    opacity: 1,
  },
  to: {
    transform: "translateX(-100%)",
    opacity: 0,
  },
});

const fadeOutOverlay = keyframes({
  from: {
    opacity: 0.5,
  },
  to: {
    opacity: 0,
  },
});

export const header = style({
  width: "256px",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: vars.color.white,
  position: "fixed",
  "@media": {
    "(max-width: 1024px)": {
      display: "none",
    },
  },
});

export const headerLogo = style({
  width: "156px",  
  margin: vars.spacing.md,  
  cursor: "pointer",
  "@media": {
    "(max-width: 768px)": {
      width: "120px",
      margin: "20px",
    },
  },
});

export const menuContainer = style({
  borderTop: `1px solid ${vars.color.line}`, 
  borderRight: `1px solid ${vars.color.line}`, 
  height: "100vh",
  display: "flex", 
  flexDirection: "column",
  "@media": {
    "(max-width: 1024px)": {
      borderRight: "none",
    },
  },
});

export const menuUi = style({
  listStyle: "none",
  padding: vars.spacing.md,
  margin: 0,
});

export const menuBottom = style({
  borderTop: `1px solid ${vars.color.line}`,
  marginTop: "auto",
});

export const menuItem = style({
  display: "flex",
  alignItems: "center",
  padding: vars.spacing.xs,
  cursor: "pointer",
  transition: "background-color 0.2s",
});

export const menuItemActive = style({
  background: vars.color.sub,
});

export const menuLink = style({
  textDecoration: "none",
  color: vars.color.defaultText,
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
  },
  "@media": {
    "(max-width: 768px)": {
      fontSize: vars.typography.fontSize.sm,
      padding: vars.spacing.sm,
      gap: vars.spacing.sm,
    },
  },
});

export const logoutLink = style({
  color: vars.color.delete,
  ":hover": {
    background: vars.color.warningBg,
  },
  ":active": {
    background: vars.color.warningBg,
  },
});

export const headerMobile = style({
  display: "none",
  "@media": {
    "(max-width: 1024px)": {
      position: "fixed",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: vars.spacing.md,
      backgroundColor: vars.color.white,
      borderBottom: `1px solid ${vars.color.line}`,
      height: "69px",
      top: 0,
      zIndex: 100,
    },
  },
});

const mobileMenuPanelBase = {
  position: "fixed" as const,
  left: 0,
  top: 0,
  width: "80vw",
  maxWidth: "256px",
  height: "100vh",
  flexDirection: "column" as const,
  padding: 0,  
  zIndex: 1001,
  overflowY: "auto" as const,
  backgroundColor: vars.color.white,
  display: "flex" as const,
};

export const mobileMenuPanel = style({
  display: "none",
  "@media": {
    "(max-width: 1024px)": {
      ...mobileMenuPanelBase,
      animation: `${slideInMenu} ${ANIMATION_DURATION} ease-out forwards`,
    },
    "(max-width: 768px)": {
      maxWidth: "200px",
    },
  },
});

const mobileMenuOverlayBase = {
  display: "block" as const,
  position: "fixed" as const,
  inset: 0,
  width: "100%",
  height: "100%",
  backgroundColor: vars.color.defaultText,
  zIndex: 999,
};

export const mobileMenuOverlay = style({
  display: "none",
  "@media": {
    "(max-width: 1024px)": {
      ...mobileMenuOverlayBase,
      animation: `${fadeInOverlay} ${ANIMATION_DURATION} ease-out forwards`,
    },
  },
});

export const mobileMenuPanelClosing = style({
  display: "none",
  "@media": {
    "(max-width: 1024px)": {
      ...mobileMenuPanelBase,
      animation: `${slideOutMenu} ${ANIMATION_DURATION} ease-out forwards`,
    },
    "(max-width: 768px)": {
      maxWidth: "200px",
    },
  },
});

export const mobileMenuOverlayClosing = style({
  display: "none",
  "@media": {
    "(max-width: 1024px)": {
      ...mobileMenuOverlayBase,
      animation: `${fadeOutOverlay} ${ANIMATION_DURATION} ease-out forwards`,
    },
  },
});
