import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const dropdownContainer = style({
  position: "relative",
  display: "inline-flex",
});

export const dropdownMenu = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  right: 0,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.sm,
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
  zIndex: 100,
  minWidth: "80px",

  "@media": {
    "(max-width: 768px)": {
      minWidth: "64px",
    },
  },
});
