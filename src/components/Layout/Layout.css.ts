import { style } from "@vanilla-extract/css";

export const layoutContainer = style({
  display: "flex",
  height: "100vh"
});

export const layoutContent = style({
  display: "flex",
  flexDirection: "column",
  flex: 1
});

export const layoutMain = style({
  display: "flex",
  marginLeft: "256px",
  overflow: "auto",
  flex: 1
});
