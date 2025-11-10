import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

// Main container
export const dashboardContainer = style({
  padding: `${vars.spacing.lg} ${vars.spacing.xl}`,
  width: "100%",
  maxWidth: "1280px",
  display: "flex",
  flexDirection: "column",
});

// Header section
export const headerSection = style({
  marginBottom: vars.spacing.xl,
});

export const headerTitle = style({
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.defaultText,
  marginBottom: vars.spacing.sm,
});

export const headerSubtitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.subText,
});

// Stats section
export const statsSection = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: vars.spacing.lg,
  marginBottom: vars.spacing.xl,
  // "@media": {
  //   "(max-width: 768px)": {
  //     gridTemplateColumns: "1fr",
  //   },
  // },
});

export const statCard = style({
  backgroundColor: vars.color.white,
  padding: vars.spacing.lg,
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.color.line}`,
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
});

export const statHeader = style({
  display: "flex",
  alignItems: "center",
  gap: vars.spacing.sm,
  marginBottom: vars.spacing.lg,
});

export const statLabel = style({
  fontSize: vars.typography.fontSize.sm,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.subText,
});

export const statBadge = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.defaultText,
  backgroundColor: vars.color.formBg,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.sm,  
});

export const statValue = style({
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.defaultText,
});

// Content grid
export const contentGrid = style({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: vars.spacing.lg,  
  // "@media": {
  //   "(max-width: 768px)": {
  //     gridTemplateColumns: "1fr",
  //   },
  // },
});

// Section container
export const resumeContainer = style({
  backgroundColor: vars.color.white,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  display: "flex",
  flexDirection: "column",
});

export const sectionHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: vars.spacing.lg,
});

export const sectionTitle = style({
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.color.defaultText,
});

// Resume list
export const resumeList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
  marginBottom: vars.spacing["2xl"],
});

export const resumeItem = style({
  padding: vars.spacing.md,
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.color.line}`,
  cursor: "pointer",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: vars.color.sub,
    borderColor: vars.color.main,
  },
});

export const resumeItemTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.defaultText,
  marginBottom: vars.spacing.xs,
});

export const resumeItemDate = style({
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.subText,
});

// Featured section
export const featuredSection = style({
  backgroundColor: vars.color.white,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  display: "flex",
  flexDirection: "column",
});

export const featuredGrid = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const featuredItem = style({
  backgroundColor: vars.color.white,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.md,
  border: `1px solid ${vars.color.line}`,  
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: vars.spacing.xs,
  cursor: "pointer",
  transition: "all 0.2s ease",
  ":hover": {
    backgroundColor: vars.color.sub,
    borderColor: vars.color.main,
  },
});

export const featuredCategory = style({
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.defaultText,
  padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
  border: `1px solid ${vars.color.line}`,
  borderRadius: vars.borderRadius.sm,    
});

export const featuredTitle = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.defaultText,
  marginBottom: vars.spacing.xs,
  textAlign: "left",
});

export const featuredTime = style({
  fontSize: vars.typography.fontSize.xs,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.subText,
  textAlign: "left",
});

// Empty state
export const emptyState = style({
  padding: vars.spacing.lg,
  textAlign: "center",
  color: vars.color.subText,
});

export const emptyStateMessage = style({
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.normal,
  color: vars.color.subText,
  marginBottom: vars.spacing.lg,
});
