import { vars } from "@/design-system";
import { style } from "@vanilla-extract/css";

export const resumeList = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: vars.spacing.lg,

  margin: 0,
  padding: 0,
});
