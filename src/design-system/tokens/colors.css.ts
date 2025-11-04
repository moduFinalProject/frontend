/**
 * 2단계: 코드 친화적으로 재구조화
 * 
 * 피그마 변수 매핑:
 * - White-Mode/W-Surface (#121314) → color.surface
 * - White-Mode/W-Background (#FFFFFF) → color.background
 * - White-Mode/W-Gray-Lv3 (#8D9299) → color.gray.lv3
 * - White-Mode/W-Gray-Lv4 (#47494D) → color.gray.lv4
 */

/**
 * 색상 토큰 정의 (코드 친화적 구조)
 */
export const colors = {
  // 기본 색상
  surface: '#121314',      // 피그마: White-Mode/W-Surface
  background: '#FFFFFF',   // 피그마: White-Mode/W-Background
  
  // 그레이 스케일
  gray: {
    lv3: '#8D9299',        // 피그마: White-Mode/W-Gray-Lv3
    lv4: '#47494D',        // 피그마: White-Mode/W-Gray-Lv4
  },
  
  // 브랜드 색상 (피그마에서 추가될 수 있음)
  brand: {
    primary: '#0088ff',    // 예시: 버튼 등에서 사용
  },
} as const;

