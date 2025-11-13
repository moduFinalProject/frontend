import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const jobItem = style({
  listStyle: "none",
  backgroundColor: vars.color.white,
  margin: 0,
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,

  ":hover": {
    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
  },
});

export const jobItemModal = style({
  listStyle: "none",
  backgroundColor: vars.color.white,
  margin: 0,
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "row",
  gap: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  alignItems: "center",
  justifyContent: "space-between",

  ":hover": {
    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
  },
});
export const title = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "start",
  position: "relative",
});

globalStyle(`${title} p`, {
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.subText,
  margin: `${vars.spacing.sm} 0 0`,
});

export const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  cursor: "pointer",
});

globalStyle(`${titleRow} h4`, {
  fontSize: vars.typography.fontSize.m,
  margin: 0,
});

globalStyle(`${titleRow} span`, {
  fontSize: vars.typography.fontSize.xs,
  backgroundColor: vars.color.formBg,
  border: `1px solid ${vars.color.line}`,
  padding: `2px ${vars.spacing.sm}`,
  borderRadius: vars.borderRadius.sm,
});

export const desc = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  fontSize: vars.typography.fontSize.sm,
});

export const btns = style({
  display: "flex",
  gap: vars.spacing.sm,
  justifyContent: "center",
  flex: 1,
  alignItems: "end",
});

export const btnsModal = style({
  display: "flex",
  gap: vars.spacing.sm,
  justifyContent: "flex-end",
  alignItems: "center",
});

globalStyle(`${btns} button`, {
  fontSize: vars.typography.fontSize.sm,
  alignSelf: "auto",
});

globalStyle(`${btnsModal} button`, {
  fontSize: vars.typography.fontSize.sm,
  alignSelf: "auto",
});

export const dropdownTrigger = style({
  padding: vars.spacing.sm,
});
