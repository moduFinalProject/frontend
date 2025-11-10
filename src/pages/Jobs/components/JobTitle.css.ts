import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const headerText = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  gap: vars.spacing.sm,
});

export const subPage = style({
  gap: vars.spacing.xs,
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

globalStyle(`${headerText} h2`, {
  margin: 0,
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.bold,
});

globalStyle(`${headerText} p`, {
  margin: 0,
});

globalStyle(`${headerText} .desc`, {
  fontSize: vars.typography.fontSize.md,
  color: vars.color.subText,
});

globalStyle(`${subPage} .title`, {
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.md,
  color: vars.color.defaultText,
});

globalStyle(`${subPage} .desc`, {
  margin: 0,
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.subText,
});
