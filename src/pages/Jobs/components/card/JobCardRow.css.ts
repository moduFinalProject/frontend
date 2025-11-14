import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const row = style({
  display: "flex",
  gap: vars.spacing.sm,
  flexDirection: "column",
});

export const widthStyle = styleVariants({
  half: {
    gridColumn: "span 1",
  },
  full: {
    gridColumn: "span 2",
    minWidth: 0,
    "@media": {
      "(max-width: 768px)": {
        gridColumn: "span 1",
      },
    },
  },
});

export const topTitle = style({
  display: "flex",
});

export const topTitleText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});
export const subText = style({
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,
});
export const dateText = style({
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,
});
export const descText = style({
  fontSize: vars.typography.fontSize.sm,
});

export const preWrap = style({
  whiteSpace: "pre-wrap",
});

export const descTextLink = style({
  textDecoration: "none",
  color: "inherit",

  ":hover": {
    color: vars.color.main,
  },
});
export const stack = style({
  backgroundColor: vars.color.formBg,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: vars.borderRadius.sm,
});
export const lisence = style({
  fontSize: vars.typography.fontSize.xs,
  backgroundColor: vars.color.defaultText,
  color: vars.color.white,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: vars.borderRadius.sm,
});

export const stackWrap = style({
  display: "flex",
  fontSize: vars.typography.fontSize.xs,
  gap: vars.spacing.sm,
  flexWrap: "wrap",
});

export const flexContainer = style({
  display: "flex",
  gap: vars.spacing.sm,
  alignItems: "center",
});
globalStyle(`${row} h4`, {
  fontWeight: vars.typography.fontWeight.normal,
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.subText,
});