export const trimObjectStrings = (obj: any): any => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 배열인 경우 (예: education, experience 목록)
  if (Array.isArray(obj)) {
    return obj.map(trimObjectStrings);
  }

  // 일반 객체인 경우 (재귀 처리)
  const trimmedObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      // 문자열인 경우에만 trim 적용
      if (typeof value === "string") {
        trimmedObj[key] = value.trim();
      }
      // 객체 또는 배열인 경우 재귀 호출
      else if (typeof value === "object" && value !== null) {
        trimmedObj[key] = trimObjectStrings(value);
      }
      // 그 외 타입은 그대로 유지 (숫자, 불리언 등)
      else {
        trimmedObj[key] = value;
      }
    }
  }
  return trimmedObj;
};
