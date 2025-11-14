import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const row = style({
  display: "flex",
  gap: vars.spacing.sm,
  flexDirection: "column",

  h4: {
    fontWeight: vars.typography.fontWeight.normal,
    fontSize: vars.typography.fontSize.sm,
    color: vars.color.subText,
  },

  "@media": {
    "(max-width: 768px)": {
      h4: {
        fontSize: vars.typography.fontSize.xs,
      },
    },
  },
});

export const widthStyle = styleVariants({
  half: {
    gridColumn: "span 1",
  },
  full: {
    gridColumn: "span 2",
    minWidth: 0,

    "@media": {
      "(max-width: 1024px)": {
        gridColumn: "span 1",
      },
    },
  },
});
export const innerGrid = styleVariants({
  half: {
    gridColumn: "span 1",
  },
  full: {
    "@media": {
      "(max-width: 1024px)": {
        gridColumn: "span 1",
      },
    },
  },
});

export const topTitle = style({
  display: "flex",

  "@media": {
    "(max-width: 768px)": {
      flexDirection: "column",
      gap: vars.spacing.xs,
    },
  },
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

  "@media": {
    "(max-width: 768px)": {
      h4: {
        fontSize: vars.typography.fontSize.xs,
      },
    },
  },
});

export const dateText = style({
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,

  "@media": {
    "(max-width: 768px)": {
      h4: {
        fontSize: vars.typography.fontSize.xs,
      },
    },
  },
});

export const descText = style({
  fontSize: vars.typography.fontSize.sm,

  "@media": {
    "(max-width: 768px)": {
      h4: {
        fontSize: vars.typography.fontSize.xs,
      },
    },
  },
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

export const lisenceType = styleVariants({
  lisence: {
    fontSize: vars.typography.fontSize.xs,
    backgroundColor: vars.color.defaultText,
    color: vars.color.white,
    padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
    borderRadius: vars.borderRadius.sm,
  },
  language: {
    fontSize: vars.typography.fontSize.xs,
    backgroundColor: vars.color.formBg,
    color: vars.color.defaultText,
    padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
    borderRadius: vars.borderRadius.sm,
  },
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

export const imgWrap = style({
  border: `1px solid ${vars.color.line}`,
  width: 160,
  aspectRatio: "160/224",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: vars.borderRadius.sm,
  backgroundColor: vars.color.formBg,
  overflow: "hidden",

  img: {
    width: "100%",
    aspectRatio: 160 / 224,
    objectFit: "contain",
  },
});

export const imgRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,

  "@media": {
    "(max-width: 768px)": {
      flexDirection: "column",
    },
  },
});
export const noImg = style({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: vars.spacing.lg,

  img: {
    width: "48px",
  },
  span: {
    color: vars.color.subText,
    fontSize: vars.typography.fontSize.sm,
  },
});
