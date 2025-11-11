import { style, styleVariants } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const Container = style({
  display: "flex",
  gap: vars.spacing.lg,
});

export const Flex1 = style({
  flex: 1,
});

export const ResultWrap = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
});

export const Recorrection = style({
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

export const Desc = style({
  marginTop: vars.spacing.xs,
  color: vars.color.subText,
});

export const UserInfo = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const SkillList = style({
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

export const ResultList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});

export const Resume = style({
  fontSize: vars.typography.fontSize.sm,

  h4: {
    fontWeight: vars.typography.fontWeight.normal,
    fontSize: vars.typography.fontSize.sm,
    marginBottom: vars.spacing.sm,
  },
});
export const InfoLabel = style({
  color: vars.color.subText,
});

export const DateValue = style({
  fontSize: vars.typography.fontSize.xs,
  color: vars.color.subText,
});

export const TopLine = style({
  borderTop: `1px solid ${vars.color.line}`,
  paddingTop: vars.spacing.lg,
});
export const ArrayList = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.md,
});
export const ArrayItem = style({
  borderLeft: `1px solid ${vars.color.main}`,
  padding: `${vars.spacing.xs} ${vars.spacing.md}`,

  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const ResultPartCommon = style({
  padding: vars.spacing.md,
  color: vars.color.defaultText,
  fontSize: vars.typography.fontSize.sm,

  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.xs,
});

export const ResultPart = styleVariants({
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
