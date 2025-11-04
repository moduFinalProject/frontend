import { createTheme } from "@vanilla-extract/css";
import { colors } from "../tokens/colors.css";
import { typography } from "../tokens/typography.css";
import { spacing } from "../tokens/spacing.css";

/**
 * 2단계: 코드 친화적인 테마 정의
 *
 * 사용 예시:
 * - vars.color.surface
 * - vars.color.gray.lv3
 * - vars.typography.heading.large.fontSize
 * - vars.spacing.md
 */
export const [themeClass, vars] = createTheme({
  color: colors,
  typography: typography,
  spacing: spacing,
});
