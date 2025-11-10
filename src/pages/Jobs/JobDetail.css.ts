import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const cardSectionList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

globalStyle(`${cardSectionList} hr`, {
  color: vars.color.line,
  gridColumn: "span 2",
});
