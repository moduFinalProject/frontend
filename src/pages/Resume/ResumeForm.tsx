import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeCard from "./components/card/ResumeCard";
import ResumeCardRow from "./components/card/ResumeCardRow";
import { flex } from "./ResumeDetail.css.ts";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Text, { Textarea } from "@/components/FormElem/text";
import File from "@/components/FormElem/file/File";

const basicInfoSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  phone: z
    .string()
    .regex(
      /^010-\d{4}-\d{4}$/,
      "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)"
    ),
  url: z.string().min(2, "url은 http/https부터 입력해야 합니다."),
});

interface ResumeFormProps {
  mode: "create" | "edit";
}

type ResumeData = {
  id: string;
  url?: string;
  imgUrl: string;
  photoUrl: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  military_service: string;
  self_introduction: string;
  experience?: {
    job_title: string;
    position: string;
    department: string;
    start_date: string;
    end_date: string;
    job_description: string;
    employment_status: "Y" | "N";
  }[];
  education?: {
    organ: string;
    department: string;
    degree_level: string;
    start_date: string;
    end_date: string;
    score: string;
  };
  project?: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
  }[];
  activity?: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
  }[];
  technology_stack?: string[];
  qualifications?: {
    title: string;
    organ: string;
    acquisition_date: string;
    score?: string;
  }[];
};

const resumeData: ResumeData = {
  id: "1",
  url: "https://career.example.com/job/123456",
  imgUrl:
    "https://i.pinimg.com/736x/95/f0/8a/95f08adb4d08c76eda72fd488700bd3a.jpg",
  photoUrl: "",
  title: "기본 이력서",
  name: "김취업",
  email: "email.email.com",
  phone: "010-0000-0000",
  gender: "남",
  address: "서울시 강남구",
  military_service: "현역",
  self_introduction:
    "안녕하세요. 3년차 웹 개발자 김취업입니다.\n\n사용자 중심의 인터페이스 설계와 효율적인 코드 작성에 관심이 많으며, 항상 새로운 기술을 배우고 적용하는 것을 즐깁니다. 팀원들과의 원활한 소통을 통해 프로젝트를 성공적으로 이끌어 낸 경험이 있으며, 문제 해결 능력과 책임감을 바탕으로 맡은 업무를 완수하는 것을 목표로 하고 있습니다.\n\n지속적인 학습과 성장을 통해 더 나은 개발자가 되고자 노력하고 있습니다.",
  experience: [
    {
      job_title: "테크스타트업",
      position: "프론트엔드 개발자",
      start_date: "2022-03",
      end_date: "현재",
      job_description:
        "- React와 TypeScript를 활용한 웹 서비스 개발 및 유지보수\n- Redux를 이용한 상태 관리 구조 설계 및 구현\n- REST API 연동 및 데이터 처리 로직 개발\n- 반응형 웹 디자인 구현으로 모바일 사용자 경험 개선\n- Git을 활용한 버전 관리 및 코드 리뷰 참여\n- 웹 접근성 개선 작업으로 WCAG 2.1 AA 등급 달성",
      department: "개발팀",
      employment_status: "Y",
    },
    {
      job_title: "디지털솔루션",
      position: "주니어 웹 개발자",
      start_date: "2020-06",
      end_date: "2022-02",
      job_description:
        "- HTML, CSS, JavaScript를 활용한 웹 페이지 개발\n- jQuery를 이용한 동적 UI 구현\n- 크로스 브라우저 호환성 테스트 및 이슈 해결\n- 웹사이트 성능 최적화를 통한 로딩 속도 25% 개선\n- UI/UX 디자이너와 협업하여 사용자 경험 개선",
      department: "개발팀",
      employment_status: "N",
    },
  ],
  education: {
    organ: "한국대학교",
    department: "컴퓨터공학",
    degree_level: "학사",
    start_date: "2020-06",
    end_date: "2022-02",
    score: "3.8 / 4.5",
  },
  project: [
    {
      title: "전자상거래 플랫폼 구축",
      description:
        "- React와 Next.js를 활용한 SSR 기반 전자상거래 플랫폼 개발\n- 상품 검색, 장바구니, 결제 시스템 등 핵심 기능 구현\n- 5인 개발팀에서 프론트엔드 파트 리딩\n- 페이지 로딩 속도 최적화로 Lighthouse 성능 점수 85점 이상 달성",
      start_date: "2020-06",
      end_date: "2022-02",
    },
    {
      title: "사내 관리 시스템 개발",
      description:
        "- 사내 업무 효율화를 위한 관리 시스템 개발\n- 실시간 데이터 동기화를 위한 WebSocket 구현\n- Chart.js를 활용한 데이터 시각화 대시보드 개발\n- 사용자 권한 관리 시스템 구축",
      start_date: "2020-06",
      end_date: "2022-02",
    },
  ],
  activity: [
    {
      title: "오픈소스 프로젝트 기여",
      start_date: "2020-06",
      end_date: "2022-02",
      description:
        "- React 관련 오픈소스 라이브러리에 버그 수정 및 기능 개선 PR 제출\n- 총 15개의 PR이 메인 브랜치에 머지됨\n- 프로젝트 문서화 작업에 참여",
    },
    {
      title: "개발자 스터디 그룹 운영",
      start_date: "2020-06",
      end_date: "2022-02",
      description:
        "- 주 1회 웹 개발 관련 스터디 진행 (총 12명 참여)\n- React, TypeScript 등 최신 기술 스택 학습 및 토론\n- 토이 프로젝트 협업을 통한 실무 경험 공유",
    },
  ],
  technology_stack: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Redux",
    "Next.js",
    "Git",
    "REST API",
    "Responsive Design",
  ],
  qualifications: [
    {
      title: "정보처리기사",
      organ: "한국산업인력공단",
      acquisition_date: "2020-08",
    },
    {
      title: "TOEIC",
      organ: "ETS",
      acquisition_date: "2024-05",
      score: "850점",
    },
  ],
};

export default function ResumeForm({ mode }: ResumeFormProps) {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const defaultValues = isEditMode
    ? resumeData
    : {
        name: "",
        email: "",
        phone: "",
        gender: "",
        address: "",
        military_service: "",
        self_introduction: "",
        experience: [],
        education: {
          organ: "",
          department: "",
          degree_level: "",
          start_date: "",
          end_date: "",
          score: "",
        },
        project: [],
        activity: [],
        technology_stack: [],
        qualifications: [],
      };

  // 기본 정보 폼
  const basicInfoForm = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        if (isEditMode) {
          // ✏️ 수정 API 호출
          console.log("Edit mode:", value);
        } else {
          // 🆕 생성 API 호출
          console.log("Create mode:", value);
        }
        basicInfoSchema.parse(value);
        console.log("기본 정보 저장:", value);
        // TODO: API 호출
        alert("기본 정보가 저장되었습니다.");
        // navigate("/resume");
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("검증 오류:", error.issues);
        }
      }
    },
  });
  // const [form, setForm] = useState<ResumeData>({} as ResumeData);

  useEffect(() => {
    if (mode === "edit" && id) {
      // 기존 이력서 불러오기 로직
      // fetch(`/api/resume/${resumeId}`).then(...)
      // setForm(resumeData);
      // Object.entries(resumeData).forEach(([key, value]) => {
      //   // @ts-ignore
      //   basicInfoForm.setFieldValue(key, value);
      // });
    }
  }, [mode, id, basicInfoForm]);

  return (
    <form
      id="resumeForm"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        basicInfoForm.handleSubmit();
      }}
    >
      <div className={flex}>
        <ResumeCard isMust={true}>
          <ResumeCardRow
            value="표시는 필수 항목입니다. (증명사진, 기본정보, 경력, 학력)"
            widthType="full"
          />
        </ResumeCard>
        <ResumeCard title="이력서 제목" isMust={true}>
          <basicInfoForm.Field
            name="title"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, "이름은 2글자 이상이어야 합니다.")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="full"
                input={
                  <Text
                    // label="이력서 제목"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="이력서 제목을 입력하세요"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
        </ResumeCard>
        <ResumeCard title="증명사진" isMust={true}>
          <basicInfoForm.Field
            name="imgUrl"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, "이름은 2글자 이상이어야 합니다.")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="full"
                isPhoto={true}
                input={
                  <File
                    label="사진 업로드"
                    type="img"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="권장 크기: 3:4 비율 (예: 300x400px)"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
        </ResumeCard>
        {isEditMode && resumeData.url ? (
          <basicInfoForm.Field
            name="url"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, "이름은 2글자 이상이어야 합니다.")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCard title="공고 url" isMust={true}>
                <ResumeCardRow
                  widthType="full"
                  input={
                    <Text
                      value={field.state.value ? field.state.value : ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      disabled={true}
                    />
                  }
                />
              </ResumeCard>
            )}
          </basicInfoForm.Field>
        ) : (
          ""
        )}
        <ResumeCard title="기본정보" isMust={true}>
          <basicInfoForm.Field
            name="name"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, "이름은 2글자 이상이어야 합니다.")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="half"
                input={
                  <Text
                    isMust={true}
                    label="이름"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="홍길동"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
          <basicInfoForm.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, "이름은 2글자 이상이어야 합니다.")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="half"
                input={
                  <Text
                    isMust={true}
                    label="이메일"
                    type="email"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="email@example.com"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
          <basicInfoForm.Field
            name="phone"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, "이름은 2글자 이상이어야 합니다.")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="half"
                input={
                  <Text
                    isMust={true}
                    label="연락처"
                    type="tel"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="email@example.com"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
          <basicInfoForm.Field
            name="gender"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(1, "남/여 중 하나를 적으세요")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="half"
                input={
                  <Text
                    label="성별"
                    type="text"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="남/여"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
          <basicInfoForm.Field
            name="address"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(5, "주소를 적으세요")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="half"
                input={
                  <Text
                    label="주소"
                    type="text"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="서울시 강남구"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
          <basicInfoForm.Field
            name="military_service"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(1, "군필/미필/해당없음 중 하나를 적으세요")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="half"
                input={
                  <Text
                    label="병역 구분"
                    type="text"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="군필/미필/해당없음"
                  />
                }
              />
            )}
          </basicInfoForm.Field>
        </ResumeCard>
        <ResumeCard title="자기소개">
          <basicInfoForm.Field
            name="self_introduction"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .max(400, "400자 이하로 작성해주세요")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType="full"
                input={
                  <Textarea
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="자신의 강점, 경험, 목표 등을 자유롭게 작성해주세요."
                  />
                }
              />
            )}
          </basicInfoForm.Field>
        </ResumeCard>
        <ResumeCard title="학력" isMust={true} useButton={true}>
          <ResumeCard span={2} title="학력 #1">
            <basicInfoForm.Field
              name="education.organ"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "학교명을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      isMust={true}
                      label="학교명"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="한국대학교"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="education.department"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "전공을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      isMust={true}
                      label="전공"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="컴퓨터공학"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="education.degree_level"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "학위를 선택해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      isMust={true}
                      label="학위"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="학사/석사/박사"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="education.score"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(
                      /^\d+\.?\d*\s*\/\s*\d+\.?\d*$/,
                      "학점 형식으로 입력해주세요 (예: 3.8 / 4.5)"
                    )
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="학점"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="3.8 / 4.5"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="education.start_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      isMust={true}
                      label="입학일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2020-03"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="education.end_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      isMust={true}
                      label="졸업일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2024-02"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>
          </ResumeCard>
        </ResumeCard>
        {/* <EducationSection form={basicInfoForm} /> 👈 여기 추가 */}
        <ResumeCard title="경력" useButton={true}>
          <ResumeCard span={2} title="경력 #1">
            <basicInfoForm.Field
              name="experience[0].job_title"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "회사명을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="회사명"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="회사명"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="experience[0].position"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "직무를 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="직책/직무"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="프론트엔드 개발자"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="experience[0].start_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="시작일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2020-03"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="experience[0].end_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="종료일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2020-03"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="experience[0].job_description"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .max(400, "400자 미만으로 적어주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="full"
                  input={
                    <Textarea
                      label="경력 기술서 (담당 업무 및 성과)"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      rows={10}
                      placeholder="- 주요 업무 내용 및 담당 역할
- 사용한 기술 스택과 도구
- 구체적인 성과 및 기여도 (수치화 권장)
- 프로젝트 규모 및 팀 구성
예시:
- React와 TypeScript를 활용한 웹 서비스 개발 및 유지보수
- 성능 최적화를 통한 페이지 로딩 속도 30% 개선
- 5인 팀에서 프론트엔드 파트 리딩"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>
          </ResumeCard>
        </ResumeCard>
        <ResumeCard title="프로젝트" useButton={true}>
          <ResumeCard span={2} title="프로젝트 #1">
            <basicInfoForm.Field
              name="project[0].title"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "프로젝트명을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="full"
                  input={
                    <Text
                      label="프로젝트명"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="프로젝트명"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="project[0].start_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="시작일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2020-03"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="project[0].end_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="마감일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2024-02"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="project[0].description"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .max(400, "400자 미만으로 적어주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="full"
                  input={
                    <Textarea
                      label="프로젝트 설명"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      rows={5}
                      placeholder="프로젝트 내용, 역할, 성과 등을 작성해주세요"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>
          </ResumeCard>
        </ResumeCard>
        <ResumeCard title="경험/활동" useButton={true}>
          <ResumeCard span={2} title="경험/활동 #1">
            <basicInfoForm.Field
              name="activity[0].title"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "활동명을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="full"
                  input={
                    <Text
                      label="활동명"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="활동명"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="activity[0].start_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="시작일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2020-03"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="activity[0].end_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="마감일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2024-02"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="activity[0].description"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .max(400, "400자 미만으로 적어주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="full"
                  input={
                    <Textarea
                      label="활동 설명"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      rows={5}
                      placeholder="활동 내용, 역할, 성과 등을 작성해주세요"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>
          </ResumeCard>
        </ResumeCard>
        <ResumeCard title="기술 스택">
          <basicInfoForm.Field
            name="technology_stack"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(2, "이름은 2글자 이상이어야 합니다.")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <>
                <ResumeCardRow
                  widthType="full"
                  input={
                    <Text
                      // label="이력서 제목"
                      isBtn={true}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="기술명을 입력하고 Enter 또는 추가 버튼을 눌러주세요"
                    />
                  }
                />
                <ResumeCardRow
                  widthType="full"
                  subTile={
                    field.state.value === null && "추가된 기술 스택이 없습니다"
                  }
                  keyword={field.state.value?.slice(",")}
                />
              </>
            )}
          </basicInfoForm.Field>
        </ResumeCard>
        <ResumeCard title="자격증 및 어학" useButton={true}>
          <ResumeCard span={2} title="자격증 #1">
            <basicInfoForm.Field
              name="qualifications[0].title"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "자격증명을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="자격증명"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="자격증명"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="qualifications[0].organ"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "자격증명을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="발급기관"
                      type="text"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="자격증명"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="qualifications[0].acquisition_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="취득일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2024-02"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>
          </ResumeCard>
          <ResumeCard span={2} title="어학 #2">
            <basicInfoForm.Field
              name="qualifications[1].title"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "시험명을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="시험명"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="TOEIC"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="qualifications[1].organ"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(2, "주관기관을 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="주관기관"
                      type="text"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="ETS"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="qualifications[1].acquisition_date"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .regex(/^\d{4}-\d{2}$/, "YYYY-MM 형식으로 입력해주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="취득일"
                      type="month"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="2024-02"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>

            <basicInfoForm.Field
              name="qualifications[1].score"
              validators={{
                onChange: ({ value }) => {
                  const result = z
                    .string()
                    .min(1000, "점수를 적어주세요")
                    .safeParse(value);
                  return result.success
                    ? undefined
                    : result.error.issues[0].message;
                },
              }}
            >
              {(field) => (
                <ResumeCardRow
                  widthType="half"
                  input={
                    <Text
                      label="점수"
                      type="text"
                      value={field.state.value ?? ""}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder="900"
                    />
                  }
                />
              )}
            </basicInfoForm.Field>
          </ResumeCard>
        </ResumeCard>
      </div>
    </form>
  );
}
