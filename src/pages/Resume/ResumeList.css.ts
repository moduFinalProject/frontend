import { vars } from "@/design-system";
import { style } from "@vanilla-extract/css";

export const resumeList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: vars.spacing.lg,

  margin: 0,
  padding: 0,
});

export const a11yHidden = style({
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  border: 0,
});
