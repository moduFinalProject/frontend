import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const layoutContainer = style({
  display: "flex",
  height: "100vh"
});

export const layoutContent = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflow: "hidden"
});

export const layoutMain = style({
  display: "flex",
  marginLeft: "256px",
  overflow: "auto",
  flex: 1,
  justifyContent: "center",
  backgroundColor: vars.color.mainBg,
  "@media": {
    "(max-width: 1024px)": {
      marginLeft: 0,
    },
  },
});
