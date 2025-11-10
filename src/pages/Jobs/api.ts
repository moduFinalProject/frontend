const NETWORK_DELAY_MS = 300;

export type JobListItem = {
  id: string;
  title: string;
  desc: string;
  date: string;
  url?: string;
  end_date?: string;
  company?: string;
  location?: string;
  salary?: string;
};

const JOB_LIST: JobListItem[] = [
  {
    id: "1",
    title: "프론트엔드 개발자",
    desc: "React, TypeScript 기반 웹 개발",
    date: "2025.10.28",
    company: "네이버",
    location: "경기 성남시",
    salary: "4000~6000만원",
    url: "https://career.naver.com/job/123456",
    end_date: "2025.11.31",
  },
  {
    id: "2",
    title: "백엔드 개발자",
    desc: "Java Spring 기반 서버 개발",
    date: "2025.10.28",
    company: "쿠팡",
    location: "서울 송파구",
    salary: "5000~7000만원",
    url: "https://career.coupang.com/job/123456",
    end_date: "2025.11.30",
  },
  {
    id: "3",
    title: "풀스택 개발자",
    desc: "React + Node.js 풀스택 개발",
    date: "2025.10.28",
    company: "카카오",
    location: "제주 제주시",
    salary: "4500~6500만원",
    url: "https://careers.kakao.com/job/123456",
    end_date: "2025.12.15",
  },
  {
    id: "4",
    title: "모바일 앱 개발자",
    desc: "React Native 기반 앱 개발",
    date: "2025.10.30",
    company: "라인",
    location: "서울 강남구",
    salary: "4000~5500만원",
    url: "https://careers.linecorp.com/job/123456",
    end_date: "2025.11.25",
  },
  {
    id: "5",
    title: "데이터 엔지니어",
    desc: "빅데이터 파이프라인 구축",
    date: "2025.10.30",
    company: "배달의민족",
    location: "서울 송파구",
    salary: "5500~8000만원",
    url: "https://career.woowahan.com/job/123456",
    end_date: "2025.12.01",
  },
  {
    id: "6",
    title: "DevOps 엔지니어",
    desc: "AWS 기반 인프라 운영",
    date: "2025.10.31",
    company: "토스",
    location: "서울 강남구",
    salary: "6000~9000만원",
    url: "https://toss.im/career/job/123456",
    end_date: "2025.11.20",
  },
];

export type JobDetailData = JobListItem & {
  userId: string;
  content: string;
  qualification: string[];
  prefer?: string[];
  memo?: string;
};

const JOB_DETAIL: Record<string, JobDetailData> = {
  "1": {
    ...JOB_LIST[0],
    userId: "42",
    content:
      "네이버의 다양한 서비스를 개발하는 프론트엔드 개발자를 모집합니다.\n\n주요 업무:\n- React, TypeScript를 활용한 웹 서비스 개발\n- 사용자 경험 최적화 및 성능 개선\n- 디자이너, 백엔드 개발자와의 협업\n- 코드 리뷰 및 기술 문서 작성\n- 새로운 기술 도입 및 적용",
    qualification: [
      "React, JavaScript/TypeScript 개발 경험 3년 이상",
      "HTML, CSS, JavaScript 기본기 보유",
      "RESTful API 연동 경험",
      "Git을 활용한 협업 경험",
      "웹 표준 및 접근성에 대한 이해",
    ],
    prefer: [
      "Next.js, Vue.js 등 프레임워크 경험",
      "모바일 웹 개발 경험",
      "성능 최적화 경험",
      "테스트 코드 작성 경험",
      "오픈소스 기여 경험",
    ],
    memo: "AI 추천 대상 공고입니다.\n현재 팀에서 긴급 채용 중으로 빠른 연락 필요.",
  },
};

function delay() {
  return new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
}

function ensureJobDetail(id: string): JobDetailData | null {
  if (JOB_DETAIL[id]) {
    return JOB_DETAIL[id];
  }

  const listItem = JOB_LIST.find((item) => item.id === id);
  if (!listItem) {
    return null;
  }

  const fallback: JobDetailData = {
    ...listItem,
    userId: "0",
    content: listItem.desc,
    qualification: [],
    prefer: undefined,
    memo: "",
  };

  JOB_DETAIL[id] = fallback;
  return fallback;
}

export async function fetchJobList(): Promise<JobListItem[]> {
  await delay();
  return JOB_LIST.map((item) => ({ ...item }));
}

export async function fetchJobDetail(id: string): Promise<JobDetailData> {
  await delay();
  const detail = ensureJobDetail(id);
  if (!detail) {
    throw new Error("해당 공고를 찾을 수 없습니다.");
  }
  return {
    ...detail,
    qualification: [...detail.qualification],
    prefer: detail.prefer ? [...detail.prefer] : undefined,
  };
}

export type JobUpsertInput = {
  id?: string;
  userId?: string;
  url?: string;
  title: string;
  company: string;
  content: string;
  qualification: string[];
  prefer?: string[];
  memo?: string;
};

export async function saveJob(input: JobUpsertInput): Promise<JobDetailData> {
  await delay();

  const id = input.id ?? Date.now().toString();
  const existingDetail = ensureJobDetail(id);
  const existingListItem = JOB_LIST.find((item) => item.id === id);

  const summary =
    input.content.split("\n").find((line) => line.trim().length > 0) ??
    input.content;

  const baseList: JobListItem = {
    id,
    title: existingListItem?.title ?? existingDetail?.title ?? input.title,
    desc: summary,
    date:
      existingListItem?.date ??
      existingDetail?.date ??
      new Date().toISOString().slice(0, 10).replace(/-/g, "."),
    url: input.url ?? existingListItem?.url ?? existingDetail?.url,
    end_date: existingListItem?.end_date ?? existingDetail?.end_date,
    company: input.company,
    location: existingListItem?.location ?? existingDetail?.location,
    salary: existingListItem?.salary ?? existingDetail?.salary,
  };

  const detail: JobDetailData = {
    ...(existingDetail ?? {
      ...baseList,
      userId: input.userId ?? "0",
      content: "",
      qualification: [],
      prefer: undefined,
      memo: "",
    }),
    ...baseList,
    userId: input.userId ?? existingDetail?.userId ?? "0",
    content: input.content,
    qualification: [...input.qualification],
    prefer:
      input.prefer && input.prefer.length > 0 ? [...input.prefer] : undefined,
    memo: input.memo ?? existingDetail?.memo ?? "",
  };

  JOB_DETAIL[id] = detail;

  const listIndex = JOB_LIST.findIndex((item) => item.id === id);
  if (listIndex >= 0) {
    JOB_LIST[listIndex] = baseList;
  } else {
    JOB_LIST.unshift(baseList);
  }

  return {
    ...detail,
    qualification: [...detail.qualification],
    prefer: detail.prefer ? [...detail.prefer] : undefined,
  };
}
