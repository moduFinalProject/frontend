import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const profileContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const profileContent = style({
  width: "100%",
  maxWidth: "1280px",
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const profileHeader = style({
  display: "flex",
  gap: vars.spacing.md,
  alignItems: "center",
});

export const backButton = style({
  width: "36px",
  height: "36px",
  borderRadius: vars.borderRadius.sm,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  border: "none",
  background: "transparent",

  ":hover": {
    backgroundColor: vars.color.formBg,
  },
});

export const headerText = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
  flex: 1,
});

export const headerTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
  lineHeight: 1.5,
  color: vars.color.defaultText,
});

export const headerSubtitle = style({
  fontSize: vars.typography.fontSize.sm,
  lineHeight: 1.43,
  color: vars.color.subText,
});

export const card = style({
  backgroundColor: vars.color.white,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const cardTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
  lineHeight: 1.5,
  color: vars.color.defaultText,
});

export const formRow = style({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: vars.spacing.md,

  "@media": {
    "(max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const formGroup = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const infoBox = style({
  backgroundColor: vars.color.formBg,
  borderRadius: vars.borderRadius.sm,
  padding: vars.spacing.md,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
});

export const infoLabel = style({
  fontSize: vars.typography.fontSize.sm,
  lineHeight: 1.43,
  color: vars.color.defaultText,
});

export const infoValue = style({
  fontSize: vars.typography.fontSize.sm,
  lineHeight: 1.43,
  color: vars.color.subText,
});

export const divider = style({
  height: "1px",
  width: "100%",
  backgroundColor: vars.color.line,
});

export const warningText = style({
  fontSize: vars.typography.fontSize.sm,
  lineHeight: 1.43,
  color: vars.color.subText,
});
