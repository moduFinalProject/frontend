import { style, keyframes } from "@vanilla-extract/css";
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
  "@media": {
    "(max-width: 1024px)": {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    "(max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

export const statCard = style({
  backgroundColor: vars.color.white,
  padding: vars.spacing.lg,
  borderRadius: vars.borderRadius.lg,
  border: `1px solid ${vars.color.line}`,
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s ease",
  ":hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.12)",
    borderColor: vars.color.main,
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.main}`,
    outlineOffset: "2px",
  },
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
  "@media": {
    "(max-width: 1024px)": {
      gridTemplateColumns: "1fr",
    },
  },
});

// Section container
export const resumeContainer = style({
  backgroundColor: vars.color.white,
  borderRadius: vars.borderRadius.lg,
  padding: vars.spacing.lg,
  border: `1px solid ${vars.color.line}`,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
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
  backgroundColor: vars.color.white,
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  ":hover": {
    backgroundColor: vars.color.sub,
    borderColor: vars.color.main,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.main}`,
    outlineOffset: "2px",
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
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
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
  transition: "all 0.3s ease",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  ":hover": {
    backgroundColor: vars.color.sub,
    borderColor: vars.color.main,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transform: "translateY(-2px)",
  },
  ":focus-visible": {
    outline: `2px solid ${vars.color.main}`,
    outlineOffset: "2px",
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

// Modal animations
const fadeInScale = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(0.95)",
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)",
  },
});

const slideUp = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(20px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const bounce = keyframes({
  "0%, 100%": {
    transform: "translateY(0)",
  },
  "50%": {
    transform: "translateY(-10px)",
  },
});

// Modal content
export const emptyModalContent = style({
  padding: vars.spacing.xl,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  animation: `${fadeInScale} 0.4s ease-out`,
});

export const emptyModalIcon = style({
  fontSize: "48px",
  marginBottom: vars.spacing.lg,
  animation: `${bounce} 1s ease-in-out infinite`,
});

export const emptyModalMessage = style({
  marginBottom: vars.spacing.xl,
  color: vars.color.defaultText,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.bold,
  lineHeight: "1.6",
  animation: `${slideUp} 0.5s ease-out 0.1s both`,
});

export const emptyModalSubMessage = style({
  marginBottom: vars.spacing.xl,
  color: vars.color.subText,
  fontSize: vars.typography.fontSize.sm,
  animation: `${slideUp} 0.5s ease-out 0.2s both`,
});

export const emptyModalButton = style({
  animation: `${slideUp} 0.5s ease-out 0.3s both`,
});
