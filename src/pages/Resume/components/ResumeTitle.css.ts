import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const headerText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  gap: vars.spacing.sm,

  h2: {
    margin: 0,
    fontSize: vars.typography.fontSize.xl,
    fontweight: vars.typography.fontWeight.bold,
  },
  p: {
    margin: 0,
  },
  ".desc": {
    fontSize: vars.typography.fontSize.md,
    color: vars.color.subText,
  },
});

export const subPage = style({
  gap: vars.spacing.xs,

  ".title": {
    fontWeight: vars.typography.fontWeight.bold,
    fontSize: vars.typography.fontSize.md,
    color: vars.color.defaultText,
  },
  ".desc": {
    margin: 0,
    fontSize: vars.typography.fontSize.sm,
    color: vars.color.subText,
  },
});

export const prevWrap = style({
  flex: 1,
  display: "flex",
  gap: vars.spacing.sm,
});

export const btnsWrap = style({
  display: "flex",
  gap: vars.spacing.sm,

  "@media": {
    "(max-width: 768px)": {
      alignSelf: "flex-end",
    },
  },
});
