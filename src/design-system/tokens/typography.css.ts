/**
 * 타이포그래피 토큰 정의
 * 폰트 크기: 12px, 14px, 16px, 20px, 24px
 * 기본 font-weight: 400, 700
 */
export const typography = {
  fontFamily: "Pretendard",

  // 폰트 크기
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "20px",
    xl: "24px",
  },

  // 기본 font-weight
  fontWeight: {
    normal: "400",
    bold: "700",
  },
} as const;
