import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const agreementContainer = style({
  padding: vars.spacing.md,
  backgroundColor: vars.color.formBg,
  borderRadius: vars.borderRadius.sm,
  cursor: "pointer",
  transition: "all 0.2s ease",

  ":hover": {
    backgroundColor: `rgba(${vars.color.mainRgb}, 0.5)`,
  },
});

export const agreementContainerChecked = style({
  padding: vars.spacing.md,
  backgroundColor: `rgba(${vars.color.mainRgb}, 0.5)`,
  opacity: 0.7,
  borderRadius: vars.borderRadius.sm,
  cursor: "pointer",
  transition: "all 0.2s ease",

  ":hover": {
    backgroundColor: vars.color.formBg,
  },
});

export const agreementRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.md,
  justifyContent: "space-between",
});

export const checkbox = style({
  width: "24px",
  height: "24px",
  cursor: "pointer",
  flex: "0 0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "24px",
  overflow: "hidden",
});

export const checkboxLabel = style({
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  flex: 1,
  margin: 0,
});

export const agreementText = style({
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.defaultText,
  fontWeight: vars.typography.fontWeight.normal,
});

export const contentScroll = style({
  flex: 1,
  overflowY: "auto",
  paddingRight: vars.spacing.md,
  paddingBottom: vars.spacing.md,
});

export const buttonContainer = style({
  paddingTop: vars.spacing.md,
  borderTop: `1px solid ${vars.color.line}`,
});

export const agreementContentParagraph = style({
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.6,
  fontSize: vars.typography.fontSize.sm,
  color: vars.color.defaultText,
  margin: 0,
});
