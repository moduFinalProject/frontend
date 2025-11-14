import { style, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const form = style({
  width: "50%",
  display: "flex",
  gap: vars.spacing.sm,
  alignItems: "stretch",
  "@media": {
    "(max-width: 1024px)": {
      width: "100%",
    },
  },
});

export const formModal = style({
  width: "100%",
  display: "flex",
  alignItems: "stretch",
});

export const fieldContainer = style({
  display: "flex",
  gap: vars.spacing.sm,
  width: "100%",
  alignItems: "stretch",
});

globalStyle(`${fieldContainer} > *:first-child`, {
  flex: 1,
  minWidth: 0,
});

globalStyle(`${fieldContainer} input`, {
  backgroundColor: vars.color.formBg,
  border: "none",
  padding: `${vars.spacing.sm} ${vars.spacing.md}`,
  borderRadius: vars.borderRadius.sm,
  flex: 1,
});
