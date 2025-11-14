import { createContext, useContext, useState } from "react";
import { useMatch, useParams } from "react-router-dom";
export type EducationItem = {
  organ: string;
  department?: string;
  degree_level?: "0" | "1" | "2" | "3" | "4" | "5";
  score: string;
  start_date: string;
  end_date: string;
};
export type ExperienceItem = {
  job_title: string;
  department?: string;
  position: string;
  start_date: string;
  end_date: string | null;
  employment_status: boolean;
  job_description: string;
};
export type ProjectItem = {
  title: string;
  start_date: string;
  end_date: string;
  description: string;
};
export type ActivityItem = {
  title: string;
  start_date: string;
  end_date: string;
  description: string;
};
export type QualificationItem = {
  title: string;
  organ: string;
  acquisition_date: string;
  score?: string;
};
export type ResumeServerData = {
  resume_id: string;
  resume_type?: string;
  resume_type_detail?: string;
  created_at?: string;
  updated_at?: string;
  url?: string;
  image_url: string;
  portfolio_url?: string;
  title: string;
  name: string;
  birth_date: string;
  email: string;
  phone: string;
  gender: "0" | "1" | "2";
  gender_detail: string;
  address: string;
  military_service: "0" | "1" | "2" | "3" | "4" | "5" | "6";
  military_service_detail?: string;
  educations?: EducationItem[];
  self_introduction: string;
  experiences?: ExperienceItem[];
  projects?: ProjectItem[];
  activities?: ActivityItem[];
  technology_stacks?: { title: string }[];
  qualifications?: QualificationItem[];
};
export type ResumeData = {
  resume_id?: string;
  resume_type?: string;
  resume_type_detail?: string;
  created_at?: string;
  updated_at?: string;
  url?: string;
  image_url: string;
  portfolio_url?: string;
  title: string;
  user_info: {
    name: string;
    birth_date: string;
    email: string;
    phone: string;
    gender: "0" | "1" | "2";
    gender_detail: string;
    address: string;
    military_service: "0" | "1" | "2" | "3" | "4" | "5" | "6";
    military_service_detail?: string;
  };
  educations?: EducationItem[];
  self_introduction: string;
  experiences?: ExperienceItem[];
  projects?: ProjectItem[];
  activities?: ActivityItem[];
  technology_stacks?: string[];
  qualifications?: QualificationItem[];
};

const ResumeContext = createContext(null);

export const useResumeContext = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
};

const formatMonthDate = (
  dateString: string | undefined
): string | undefined => {
  if (typeof dateString === "string" && dateString.length >= 7) {
    // YYYY-MM-DD 형태(10글자)라면 YYYY-MM (7글자)까지만 자릅니다.
    return dateString.slice(0, 7);
  }
  return dateString;
};

const transformStacksFormServer = (
  stackArray: { title: string }[]
): string[] => {
  // 배열이 비어있거나 유효하지 않으면 빈 배열 반환
  if (!Array.isArray(stackArray) || stackArray.length === 0) {
    return [];
  }

  // map을 사용하여 각 객체에서 title 값만 추출
  return stackArray.map((item) => item.title);
};
function transformDataForForm(
  serverData: ResumeServerData,
  emptyForm: ResumeData
): ResumeData {
  if (!serverData) return emptyForm;

  const transformedData: ResumeData = {
    ...emptyForm,
    resume_type: serverData.resume_type || emptyForm.resume_type,
    resume_type_detail:
      serverData.resume_type_detail || emptyForm.resume_type_detail,
    title: serverData.title || emptyForm.title,
    url: serverData.url || emptyForm.url,
    image_url: serverData.image_url || emptyForm.image_url,
    self_introduction:
      serverData.self_introduction || emptyForm.self_introduction,

    user_info: {
      ...emptyForm.user_info,
      // 서버 데이터의 평탄화된 필드를 user_info 내부로 이동
      name: serverData.name || emptyForm.user_info.name,
      birth_date: serverData.birth_date || emptyForm.user_info.birth_date,
      email: serverData.email || emptyForm.user_info.email,
      phone: serverData.phone || emptyForm.user_info.phone,
      gender: serverData.gender || emptyForm.user_info.gender,
      gender_detail:
        serverData.gender_detail || emptyForm.user_info.gender_detail,
      military_service:
        serverData.military_service || emptyForm.user_info.military_service,
      military_service_detail:
        serverData.military_service_detail ||
        emptyForm.user_info.military_service_detail,
      address: serverData.address || emptyForm.user_info.address,
    },
    // 배열 필드 채우기
    educations: (serverData.educations || emptyForm.educations).map(
      (item: EducationItem) => ({
        ...item,
        start_date: formatMonthDate(item.start_date),
        end_date: formatMonthDate(item.end_date),
      })
    ),
    experiences: serverData.experiences.map((item: ExperienceItem) => ({
      // ...item,
      job_title: item.job_title,
      department: item.department,
      position: item.position,
      start_date: formatMonthDate(item.start_date),
      employment_status: item.employment_status,
      end_date: formatMonthDate(item.end_date),
      job_description: item.job_description,
    })),
    projects: (serverData.projects || emptyForm.projects).map(
      (item: ProjectItem) => ({
        ...item,
        start_date: formatMonthDate(item.start_date),
        end_date: formatMonthDate(item.end_date),
      })
    ),
    activities: (serverData.activities || emptyForm.activities).map(
      (item: ActivityItem) => ({
        ...item,
        start_date: formatMonthDate(item.start_date),
        end_date: formatMonthDate(item.end_date),
      })
    ),
    technology_stacks: transformStacksFormServer(
      serverData.technology_stacks || emptyForm.technology_stacks
    ),
    qualifications: (serverData.qualifications || emptyForm.qualifications).map(
      (item: QualificationItem) => ({
        title: item.title,
        organ: item.organ,
        acquisition_date: formatMonthDate(item.acquisition_date),
        score: item.score,
      })
    ),
  };

  return transformedData;
}
export type Resume = {
  resume_id: string;
  name: string;
  desc: string;
  date: string;
  url?: string;
  end_date?: string;
};

export const ResumeProvider = ({
  children,
  initialResumeData,
}: {
  children: any;
  initialResumeData: ResumeData;
}) => {
  const { id } = useParams();
  const isEditMode = Boolean(id) && id !== "new";
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const isCreate = useMatch("/resume/new");
  const isEdit = useMatch("/resume/:id/edit");
  const isCorrection = useMatch("/resume/:id/correction");
  const isView = useMatch("/resume/:id");
  const mode: "view" | "edit" | "create" | "list" | "correction" = isCreate
    ? "create"
    : isEdit
    ? "edit"
    : isView
    ? "view"
    : isCorrection
    ? "correction"
    : "list";

  function setResume(data: ResumeServerData): void {
    setResumeData(transformDataForForm(data, resumeData));
  }

  const contextValue = {
    resumes,
    setResumes,
    resumeData,
    setResume,
    isLoading,
    setIsLoading,
    id,
    isEditMode,
    mode,
    page,
    setPage,
    search,
    setSearch,
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};
