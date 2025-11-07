// src/constants/fieldLabels.ts

// 최상위 필드 및 섹션 제목
export const FIELD_LABELS: Record<string, string> = {
  // 최상위 필드
  title: "이력서 제목",
  photoUrl: "증명사진",
  url: "외부 링크",
  self_introduction: "자기소개",
  technology_stack: "기술 스택",

  // 섹션 제목
  user_info: "기본 정보",
  education: "학력",
  experience: "경력",
  project: "프로젝트",
  activity: "대외 활동",
  qualifications: "자격증/어학",
};

// 기본 정보(user_info) 내부 필드
export const USER_INFO_LABELS: Record<string, string> = {
  name: "이름",
  email: "이메일",
  phone: "연락처",
  gender: "성별",
  address: "주소",
  military_service: "병역",
};

// 배열 항목(e.g., education, experience) 내부 필드
export const EDUCATION_LABELS: Record<string, string> = {
  organ: "학교명",
  department: "학과명",
  degree_level: "학위",
  score: "학점",
  start_date: "입학일",
  end_date: "졸업일",
};

export const EXPERIENCE_LABELS: Record<string, string> = {
  title: "회사명",
  department: "부서",
  position: "직책",
  start_date: "입사일",
  end_date: "퇴사일",
  description: "경력 기술서 (담당 업무 및 성과)",
};

export const PROJECT_LABELS: Record<string, string> = {
  title: "프로젝트명",
  start_date: "시작일",
  end_date: "종료일",
  description: "프로젝트 설명",
};

export const ACTIVITY_LABELS: Record<string, string> = {
  title: "활동명",
  start_date: "시작일",
  end_date: "종료일",
  description: "활동 설명",
};

export const QUALIFICATIONS_LABELS: Record<string, string> = {
  qua_title: "자격증/시험명",
  organ: "발급/주관기관",
  acquisition_date: "취득일",
  score: "점수(어학만)",
};
