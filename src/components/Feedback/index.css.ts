import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const container = style({
  display: "flex",
  gap: vars.spacing.lg,
});

export const flex1 = style({
  flex: 1,
});

export const resultWrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const recorrection = style({
  padding: vars.spacing.lg,
  border: `1px solid ${vars.color.main}`,
  borderRadius: vars.borderRadius.lg,
  backgroundColor: "#EFF6FF",
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  flex: 0,
  fontSize: vars.typography.fontSize.sm,

  h3: {
    fontSize: vars.typography.fontSize.md,
    fontWeight: vars.typography.fontWeight.normal,
  },
});

export const desc = style({
  marginTop: vars.spacing.xs,
  color: vars.color.subText,
});

export const userInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const skillList = style({
  display: "flex",
  flexWrap: "wrap",
  gap: vars.spacing.xs,

  li: {
    padding: `${vars.spacing.xs} ${vars.spacing.sm}`,
    borderRadius: vars.borderRadius.sm,
    backgroundColor: vars.color.formBg,
    fontSize: vars.typography.fontSize.xs,
  },
});

export const resultList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const resume = style({
  fontSize: vars.typography.fontSize.sm,

  h4: {
    fontWeight: vars.typography.fontWeight.normal,
    fontSize: vars.typography.fontSize.sm,
    marginBottom: vars.spacing.sm,
  },
});
export const infoLabel = style({
  color: vars.color.subText,
});

export const dateValue = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.subText,
});

export const topLine = style({
  borderTop: `1px solid ${vars.color.line}`,
  paddingTop: vars.spacing.lg,
});
export const arrayList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});
export const arrayItem = style({
  borderLeft: `1px solid ${vars.color.main}`,
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,

  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const resultPartCommon = style({
  padding: vars.spacing.md,
  color: vars.color.defaultText,
  fontSize: vars.typography.fontSize.sm,

  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const resultPart = styleVariants({
  good: {
    backgroundColor: "#F0FDF4",
    borderLeft: `3px solid #00A63E`,
  },
  improve: {
    backgroundColor: "#FEFCE8",
    borderLeft: `3px solid #D08700`,

    span: {
      display: "block",
      marginTop: vars.spacing.xs,
    },
  },
  recommend: {
    backgroundColor: "#EFF6FF",
    borderLeft: `3px solid ${vars.color.main}`,
  },
});

export const keywordMatching = style({
  paddingBottom: vars.spacing.md,
  borderBottom: `1px solid ${vars.color.line}`,
});

export const progressTitle = style({
  fontSize: vars.typography.fontSize.sm,
});
export const progressWrap = style({
  display: "flex",
  gap: vars.spacing.sm,
  marginTop: vars.spacing.sm,
});
export const progressBg = style({
  width: "100%",
  height: 12,
  backgroundColor: vars.color.mainBg,
  borderRadius: vars.borderRadius.sm,
});
export const progressValue = style({
  width: "78%",
  height: "100%",
  display: "inline-block",
  backgroundColor: vars.color.main,
  borderRadius: vars.borderRadius.sm,
});
export const progressText = style({
  fontSize: vars.typography.fontSize.sm,
});
