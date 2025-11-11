import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const resumeItem = style({
  listStyle: "none",
  margin: 0,
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  backgroundColor: vars.color.white,
  transition: "0.3s ease",

  ":hover": {
    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
  },
});
export const title = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",

  p: {
    fontSize: vars.typography.fontSize.sm,
    color: vars.color.subText,
    margin: `${vars.spacing.sm} 0 0`,
  },
  "> div > button": {
    padding: vars.spacing.sm,
  },
});

export const titleRow = style({
  display: "flex",
  gap: vars.spacing.sm,

  a: {
    color: "inherit",
    textDecoration: "none",
  },
  h4: {
    fontSize: vars.typography.fontSize.m,
    margin: 0,
  },

  span: {
    fontSize: vars.typography.fontSize.xs,
    backgroundColor: vars.color.formBg,
    border: `1px solid ${vars.color.line}`,
    padding: `2px ${vars.spacing.sm}`,
    borderRadius: vars.borderRadius.sm,
  },
});
export const desc = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  fontSize: vars.typography.fontSize.sm,

  p: {
    margin: 0,
  },

  div: {
    display: "flex",
    justifyContent: "space-between",
  },

  span: {
    fontSize: vars.typography.fontSize.xs,
    border: `1px solid ${vars.color.line}`,
    padding: `2px ${vars.spacing.sm}`,
    borderRadius: vars.borderRadius.sm,
  },
});

export const btns = style({
  display: "flex",
  gap: vars.spacing.sm,
  justifyContent: "center",
  flex: 1,
  alignItems: "end",

  button: {
    fontSize: vars.typography.fontSize.sm,
    alignSelf: "auto",
  },
});

export const descTitle = style({
  color: vars.color.subText,
});

export const dropdownTrigger = style({
  padding: vars.spacing.sm,
});
export const noDrag = style({
  webkitUserSelect: "none" /* Chrome, Safari, Opera */,
  khtmlUserSelect: "none" /* Konqueror */,
  mozUserSelect: "none" /* Firefox */,
  oUserSelect: "none" /* Old Opera */,
  msUserSelect: "none" /* Internet Explorer/Edge */,
  userSelect: "none" /* Standard */,
});
