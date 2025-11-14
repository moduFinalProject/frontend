import { style } from "@vanilla-extract/css";
import { vars } from "@/design-system";

export const landingContainer = style({
  width: "100%",
  minHeight: "100vh",
  backgroundColor: vars.color.white,
  display: "flex",
  flexDirection: "column",
});

// Header Styles
export const header = style({
  backgroundColor: vars.color.white,
  borderBottom: `1px solid rgba(0, 0, 0, 0.1)`,
  display: "flex",
  justifyContent: "center",
});

export const headerWrapper = style({
  maxWidth: "1280px",
  width: "100%",
});

export const headerContainer = style({
  width: "100%",
  height: "68px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
});

export const logoImage = style({
  width: "153px",
  height: "36px",
  objectFit: "contain",
});

// Main Section Styles
export const mainSection = style({
  backgroundColor: vars.color.landingBg,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@media": {
    "screen and (max-width: 768px)": {
      padding: "40px 24px",
    },
    "screen and (max-width: 1024px)": {
      padding: "80px 24px",
    },
  },
});

export const mainContainer = style({
  maxWidth: "1280px",
  width: "100%",
  minHeight: "600px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const bannerContainer = style({
  width: "95%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media": {
    "screen and (max-width: 768px)": {
      flexDirection: "column",
    },
    "screen and (max-width: 1024px)": {
      flexDirection: "column",
    },
  },
});

export const bannerContent = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg,
  "@media": {
    "screen and (max-width: 768px)": {
      justifyContent: "center",
      alignItems: "center",
    },
    "screen and (max-width: 1024px)": {
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const bannerHeader = style({
  display: "flex",
  flexDirection: "column",
  gap: vars.spacing.lg, // 동일한 24px gap 적용
  "@media": {
    "screen and (max-width: 768px)": {
      justifyContent: "center",
      alignItems: "center",
    },
    "screen and (max-width: 1024px)": {
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const bannerTag = style({
  color: vars.color.main,
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: vars.typography.fontSize.sm, // 14px
  lineHeight: 1.43, // 20px ÷ 14px = 1.43
});

export const bannerTitle = style({
  fontWeight: vars.typography.fontWeight.bold,
  fontSize: "40px",
  lineHeight: 1.2, // 120% = 1.2
  "@media": {
    "screen and (max-width: 768px)": {
      textAlign: "center",
    },
    "screen and (max-width: 1024px)": {
      textAlign: "center",
    },
  },
});

export const bannerDescription = style({
  fontSize: vars.typography.fontSize.md, // 16px
  lineHeight: 1.375, // 22px ÷ 16px = 1.375
  color: vars.color.defaultText,
  "@media": {
    "screen and (max-width: 768px)": {
      textAlign: "center",
    },
    "screen and (max-width: 1024px)": {
      textAlign: "center",
    },
  },
});

export const bannerButtonContainer = style({
  display: "flex",
  width: "259px",
  height: "48px",
  alignItems: "stretch",
});

export const headerButton = style({
  alignSelf: "auto",
});

export const bannerButton = style({
  alignSelf: "auto",
  width: "100%",
});

export const bannerImageContainer = style({
  flex: 1,

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "@media": {
    "screen and (max-width: 768px)": {
      minHeight: "200px",
    },
    "screen and (max-width: 1024px)": {},
  },
});

export const bannerImage = style({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "10px",
  // "@media": {
  //   "screen and (max-width: 768px)": {
  //     width: "100%",
  //     height: "auto",
  //   },
  //   "screen and (max-width: 1024px)": {
  //     width: "70%",
  //     height: "auto",
  //   },
  // },
});

// Footer Styles
export const footer = style({
  backgroundColor: vars.color.white,
  borderTop: `1px solid rgba(0, 0, 0, 0.1)`,
  minHeight: "72px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const footerText = style({
  fontSize: vars.typography.fontSize.sm, // 14px
  fontWeight: vars.typography.fontWeight.normal,
  lineHeight: 1.43, // 20px ÷ 14px = 1.43
  color: vars.color.subText,
});
