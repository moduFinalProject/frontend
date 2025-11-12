// src/constants/fieldLabels.ts

type labelPlaceholderSet = { label: string; placeholder?: string };

// 최상위 필드 및 섹션 제목
export const FIELD_LABELS: Record<string, labelPlaceholderSet> = {
  // 최상위 필드
  title: { label: "이력서 제목", placeholder: "이력서 제목을 입력하세요" },
  photoUrl: {
    label: "증명사진",
    placeholder: "권장 크기: 3:4 비율 (예: 300x400px)",
  },
  url: { label: "외부 링크" },
  self_introduction: {
    label: "자기소개",
    placeholder: "자신의 강점, 경험, 목표 등을 자유롭게 작성해주세요.",
  },
  technology_stacks: {
    label: "기술 스택",
    placeholder:
      "사용 가능한 스텍을 중복 없이 콤마(,)를 이용하여 작성해주세요. 예) React, TypeScript, ...",
  },

  // 섹션 제목
  user_info: {
    label: "기본 정보",
  },
  educations: {
    label: "학력",
  },
  experiences: {
    label: "경력",
  },
  projects: {
    label: "프로젝트",
  },
  activities: {
    label: "대외 활동",
  },
  qualifications: {
    label: "자격증/어학",
  },
};

// 기본 정보(user_info) 내부 필드
export const USER_INFO_LABELS: Record<string, labelPlaceholderSet> = {
  name: { label: "이름", placeholder: "이름은 2글자 이상 입력하세요" },
  birth_date: { label: "생일", placeholder: "생일을 입력하세요" },
  email: { label: "이메일", placeholder: "example@example.com" },
  phone: { label: "연락처", placeholder: "010-0000-0000" },
  gender: { label: "성별", placeholder: "남/여" },
  military_service: { label: "병역", placeholder: "병역 여부 선택" },
  address: { label: "주소", placeholder: "oo시 oo구" },
};

// 배열 항목(e.g., education, experience) 내부 필드
export const EDUCATION_LABELS: Record<string, labelPlaceholderSet> = {
  organ: { label: "학교명", placeholder: "ooo학교" },
  department: { label: "학과명", placeholder: "oo과" },
  degree_level: { label: "학위", placeholder: "학위 선택" },
  score: { label: "학점", placeholder: "00점" },
  start_date: { label: "입학일" },
  end_date: { label: "졸업일" },
};

export const EXPERIENCE_LABELS: Record<string, labelPlaceholderSet> = {
  job_title: { label: "회사명", placeholder: "회사명을 입력하세요" },
  department: { label: "부서", placeholder: "부서명을 입력하세요" },
  position: { label: "직무", placeholder: "직무를 입력하세요" },
  start_date: { label: "입사일" },
  end_date: { label: "퇴사일" },
  employmont_status: { label: "현재 재직중" },
  job_description: {
    label: "경력 기술서 (담당 업무 및 성과)",
    placeholder:
      "- 주요 업무 내용 및 담당 역할\n- 사용한 기술 스택과 도구\n- 구체적인 성과 및 기여도 (수치화 권장)\n- 프로젝트 규모 및 팀 구성\n\n예시:\n- React와 TypeScript를 활용한 웹 서비스 개발 및 유지보수\n- 성능 최적화를 통한 페이지 로딩 속도 30% 개선\n- 5인 팀에서 프론트엔드 파트 리딩",
  },
};

export const PROJECT_LABELS: Record<string, labelPlaceholderSet> = {
  title: { label: "프로젝트명", placeholder: "프로젝트명을 입력하세요" },
  start_date: { label: "시작일" },
  end_date: { label: "종료일" },
  description: {
    label: "프로젝트 설명",
    placeholder: "프로젝트 내용, 역할, 성과 등을 작성해주세요",
  },
};

export const ACTIVITY_LABELS: Record<string, labelPlaceholderSet> = {
  title: { label: "활동명", placeholder: "활동명을 입력하세요" },
  start_date: { label: "시작일" },
  end_date: { label: "종료일" },
  description: {
    label: "활동 설명",
    placeholder: "활동 내용, 역할, 성과 등을 작성해주세요",
  },
};

export const QUALIFICATIONS_LABELS: Record<string, labelPlaceholderSet> = {
  title: {
    label: "자격증/시험명",
    placeholder: "자격증명 또는 시험명을 입력하세요",
  },
  organ: {
    label: "발급/주관기관",
    placeholder: "발급기관 또는 주관 기관명을 입력하세요",
  },
  acquisition_date: { label: "취득일" },
  score: {
    label: "점수(어학만)",
    placeholder: "어학인 경우 점수를 입력하세요. 예)000점",
  },
};
