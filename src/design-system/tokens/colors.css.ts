/**
 * 색상 토큰 정의
 * 피그마 변수 기반
 */
export const colors = {
  // 메인 색상
  main: "#0088FF", // --MainColor
  mainRgb: "0, 136, 255", // -- MainColorRgb
  white: "#FFFFFF", // --WhiteColor

  // 배경 색상
  mainBg: "#F8FAFC", // --MainBgColor
  formBg: "#F3F3F5", // --FormBGColor
  sub: "#F3F8FD", // --SubColor
  landingBg: "#FFFCEE", // --Landing-BgColor

  // 텍스트 색상
  defaultText: "#0A0A0A", // --DefaultColor
  subText: "#45556C", // --SubTextColor

  // 상태 색상
  disabled: "#818189", // --DisabledColor
  delete: "#D4183D", // --DeleteColor

  // 구분선 색상
  line: "#C4C4C4", // --LineColor

  // 매칭 색상
  warning: "#D08700",
  warningBg: "#FEFCE8",
  info: "#0088FF",
  infoBg: "#F3F8FD",
  success: "#00A63E",
  successBg: "#F0FDF4",
} as const;
