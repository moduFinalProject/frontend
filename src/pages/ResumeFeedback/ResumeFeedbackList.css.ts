import { style, styleVariants, globalStyle } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const container = style({
  width: "100%",
  maxWidth: 1280,
  margin: "0 auto",
  padding: vars.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xl,
});

export const header = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
});

export const headerContent = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  flex: "1 1 320px",
});

export const headerAction = style({
  display: "flex",
  alignItems: "center",
  alignSelf: "center",
});

export const controls = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.spacing.lg,
  flexWrap: "wrap",
});

export const searchForm = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  flex: "1 1 480px",
});

export const searchInput = style({
  flex: 1,
  maxWidth: "400px",
  width: "100%",
  height: vars.spacing.xl,
  backgroundColor: vars.color.white,
  borderRadius: vars.borderRadius.sm,
  border: "1px solid transparent",
  boxShadow: "0 0 0 1px rgba(0, 136, 255, 0.15)",
  padding: `0 ${vars.spacing.md}`,
  color: vars.color.defaultText,
  fontSize: vars.typography.fontSize.sm,
  lineHeight: vars.typography.fontSize.lg,
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  selectors: {
    "&::placeholder": {
      color: vars.color.subText,
      opacity: 0.8,
    },
    "&:focus": {
      outline: "none",
      borderColor: vars.color.main,
      boxShadow: "0 0 0 1px rgba(0, 136, 255, 0.15)",
      backgroundColor: vars.color.white,
    },
  },
});

export const searchButton = style({
  border: "none",
  backgroundColor: vars.color.main,
  color: vars.color.white,
  borderRadius: vars.borderRadius.sm,
  padding: `0 ${vars.spacing.md}`,
  height: vars.spacing.xl,
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing.xs,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.bold,
  cursor: "pointer",
  transition: "opacity 0.2s ease",
  selectors: {
    "&:hover": {
      opacity: 0.9,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.main}`,
      outlineOffset: 2,
    },
  },
});

export const filterGroup = style({
  border: "none",
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
});

export const filterButton = style({
  borderRadius: vars.borderRadius.sm,
  border: `1px solid ${vars.color.line}`,
  backgroundColor: vars.color.white,
  color: vars.color.defaultText,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.normal,
  padding: `${vars.spacing.xs} ${vars.spacing.lg}`,
  height: vars.spacing.xl,
  minWidth: "76px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: vars.spacing.xs,
  cursor: "pointer",
  transition:
    "border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease",
  selectors: {
    "&:hover": {
      borderColor: vars.color.main,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.main}`,
      outlineOffset: 2,
    },
  },
});

export const filterButtonActive = style({
  borderColor: vars.color.main,
  color: vars.color.main,
  backgroundColor: vars.color.sub,
});

export const listSection = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const jobList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
  listStyle: "none",

  "li article:hover": {
    boxShadow: `0 4px 8px 0 rgba(0, 0, 0, 0.2)`,
  },
});

export const card = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  padding: vars.spacing.lg,
  borderRadius: vars.borderRadius.lg,
  transition:
    "border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease",
});

export const cardVariant = styleVariants({
  default: {
    backgroundColor: vars.color.white,
    border: `1px solid rgba(0, 0, 0, 0.1)`,
  },
});

export const cardTop = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export const companyBlock = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.sm,
  flex: "1 1 auto",
});

export const companyRow = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  flexWrap: "wrap",
});

export const jobBadge = style({
  borderRadius: vars.borderRadius.sm,
  border: `1px solid rgba(0, 0, 0, 0.1)`,
  backgroundColor: vars.color.white,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.defaultText,
});

export const detailList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,
});

export const detailItem = style({
  display: "flex",
  gap: vars.spacing.xs,
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,
});

export const optionsButton = style({
  width: vars.spacing.xl,
  height: vars.spacing.xl,
  borderRadius: vars.borderRadius.sm,
  border: "none",
  backgroundColor: "transparent",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color 0.2s ease",
  selectors: {
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      border: "none",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.main}`,
      outlineOffset: 2,
      border: "none",
    },
  },
});

export const optionsButtonContainer = style({
  marginLeft: "auto",
  "@media": {
    "(max-width: 768px)": {
      marginTop: vars.spacing.sm,
    },
  },
});

export const cardFooter = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: vars.spacing.md,
  flexWrap: "wrap",
});

export const matchingGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
});

export const matchingBadgeBase = style({
  display: "inline-flex",
  alignItems: "center",
  gap: vars.spacing.xs,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  borderRadius: vars.borderRadius.sm,
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.normal,
});

export const matchingBadge = styleVariants({
  warning: {
    backgroundColor: vars.color.warningBg,
    color: vars.color.warning,
  },
  info: {
    backgroundColor: vars.color.infoBg,
    color: vars.color.info,
  },
  success: {
    backgroundColor: vars.color.successBg,
    color: vars.color.success,
  },
});

export const matchingLabel = style({
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,
});

export const dateText = style({
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,
});

export const emptyState = style({
  textAlign: "center",
  color: vars.color.subText,
  padding: `${vars.spacing.xl} 0`,
});

globalStyle(`${headerContent} h1`, {
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.normal,
  lineHeight: 1.5,
});

globalStyle(`${headerContent} p`, {
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.md,
  lineHeight: 1.5,
});

globalStyle(`${companyBlock} h3`, {
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.bold,
});

globalStyle(`${companyRow} h3`, {
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
});

globalStyle(`${matchingBadgeBase} img`, {
  width: "16px",
  height: "16px",
});

globalStyle(`${jobBadge}`, {
  display: "inline-flex",
  alignItems: "center",
});
