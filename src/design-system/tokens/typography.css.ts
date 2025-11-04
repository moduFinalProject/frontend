/**
 * 2단계: 코드 친화적으로 재구조화
 *
 * 피그마 변수 매핑:
 * - pretendard_40p_SB → typography.heading.large
 * - pretendard_16p_M → typography.body.medium
 */

/**
 * 타이포그래피 토큰 정의 (의미있는 이름으로 재구조화)
 */
export const typography = {
  // 제목 스타일
  heading: {
    large: {
      fontFamily: "Pretendard",
      fontSize: "40px", // 피그마: pretendard_40p_SB
      fontWeight: "600", // SemiBold
      lineHeight: "56px",
    },
  },

  // 본문 스타일
  body: {
    medium: {
      fontFamily: "Pretendard",
      fontSize: "16px", // 피그마: pretendard_16p_M
      fontWeight: "500", // Medium
      lineHeight: "22px",
    },
  },
} as const;
