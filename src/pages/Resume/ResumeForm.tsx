import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeCard from "./components/card/ResumeCard";
import ResumeCardRow from "./components/card/ResumeCardRow";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import Text, { Textarea } from "@/components/FormElem/text";
import FileElem from "@/components/FormElem/file/File";
import Checkbox from "@/components/FormElem/checkbox/Checkbox";
import { container, innerContainer } from "./index.css.ts";
import Select from "@/components/FormElem/text/Select.tsx";

import {
  FIELD_LABELS,
  USER_INFO_LABELS,
  EDUCATION_LABELS,
  EXPERIENCE_LABELS,
  PROJECT_LABELS,
  ACTIVITY_LABELS,
  QUALIFICATIONS_LABELS,
} from "@/constants/fieldLabels.ts";
import { trimObjectStrings } from "@/utils/trimOojectStrings.ts";
import {
  basicInfoSchema,
  MAX_TEXTAREA_LENGTH,
  MAX_NAME_LENGTH,
  MIN_LENGTH,
  photoUrlFileSchema,
  photoUrlStringSchema,
  MAX_TITLE_LENGTH,
} from "./components/form/validators.ts";
import { errorInput } from "@/components/FormElem/text/Input.css.ts";

interface ResumeFormProps {
  mode: "create" | "edit";
}

type EducationItem = {
  organ: string;
  department?: string;
  degree_level?: "0" | "1" | "2" | "3" | "4" | "5";
  score: string;
  start_date: string;
  end_date: string;
};
type ExperienceItem = {
  job_title: string;
  department?: string;
  position: string;
  start_date: string;
  end_date: string | null;
  employmont_status: boolean;
  job_description: string;
};
type ProjectItem = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
};
type ActivityItem = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
};
type QualificationItem = {
  title: string;
  organ: string;
  acquisition_date: string;
  score?: string;
};
type ResumeFormValues = {
  resume_id: string;
  title: string;
  photoUrl: string | File;
  url?: string;
  user_info: {
    name: string;
    birth_date: string;
    email: string;
    phone: string;
    gender: "0" | "1" | "2";
    military_service: "0" | "1" | "2" | "3" | "4" | "5" | "6";
    address: string;
  };
  educations?: EducationItem[];
  self_introduction: string;
  experiences?: ExperienceItem[];
  projects?: ProjectItem[];
  activites?: ActivityItem[];
  technology_stacks?: string[];
  qualifications?: QualificationItem[];
};

const resumeDataSample: ResumeFormValues = {
  resume_id: "1",
  title: "기본 이력서",
  photoUrl:
    "https://i.pinimg.com/736x/95/f0/8a/95f08adb4d08c76eda72fd488700bd3a.jpg",
  url: "https://career.example.com/job/123456",
  user_info: {
    name: "김취업",
    birth_date: "1996-12-12",
    email: "email@email.com",
    phone: "010-0000-0000",
    gender: "1",
    military_service: "2",
    address: "서울시 강남구",
  },
  educations: [
    {
      organ: "한국대학교",
      department: "컴퓨터공학과",
      degree_level: "3",
      score: "3.8 / 4.5점",
      start_date: "2020-06",
      end_date: "2022-02",
    },
    {
      organ: "한국대학교",
      department: "컴퓨터공학과",
      degree_level: "3",
      score: "3.8 / 4.5점",
      start_date: "2020-06",
      end_date: "2022-02",
    },
  ],
  self_introduction:
    "안녕하세요. 3년차 웹 개발자 김취업입니다.\n\n사용자 중심의 인터페이스 설계와 효율적인 코드 작성에 관심이 많으며, 항상 새로운 기술을 배우고 적용하는 것을 즐깁니다. 팀원들과의 원활한 소통을 통해 프로젝트를 성공적으로 이끌어 낸 경험이 있으며, 문제 해결 능력과 책임감을 바탕으로 맡은 업무를 완수하는 것을 목표로 하고 있습니다.\n\n지속적인 학습과 성장을 통해 더 나은 개발자가 되고자 노력하고 있습니다.",

  experiences: [
    {
      job_title: "테크스타트업",
      department: "개발팀",
      position: "프론트엔드 개발자",
      start_date: "2022-03",
      end_date: null,
      employmont_status: true,
      job_description:
        "- React와 TypeScript를 활용한 웹 서비스 개발 및 유지보수\n- Redux를 이용한 상태 관리 구조 설계 및 구현\n- REST API 연동 및 데이터 처리 로직 개발\n- 반응형 웹 디자인 구현으로 모바일 사용자 경험 개선\n- Git을 활용한 버전 관리 및 코드 리뷰 참여\n- 웹 접근성 개선 작업으로 WCAG 2.1 AA 등급 달성",
    },
    {
      job_title: "디지털솔루션",
      department: "개발팀",
      position: "주니어 웹 개발자",
      start_date: "2020-06",
      end_date: "2022-02",
      employmont_status: false,
      job_description:
        "- HTML, CSS, JavaScript를 활용한 웹 페이지 개발\n- jQuery를 이용한 동적 UI 구현\n- 크로스 브라우저 호환성 테스트 및 이슈 해결\n- 웹사이트 성능 최적화를 통한 로딩 속도 25% 개선\n- UI/UX 디자이너와 협업하여 사용자 경험 개선",
    },
  ],
  projects: [
    {
      title: "전자상거래 플랫폼 구축",
      start_date: "2020-06",
      end_date: "2022-02",
      description:
        "- React와 Next.js를 활용한 SSR 기반 전자상거래 플랫폼 개발\n- 상품 검색, 장바구니, 결제 시스템 등 핵심 기능 구현\n- 5인 개발팀에서 프론트엔드 파트 리딩\n- 페이지 로딩 속도 최적화로 Lighthouse 성능 점수 85점 이상 달성",
    },
    {
      title: "사내 관리 시스템 개발",
      start_date: "2020-06",
      end_date: "2022-02",
      description:
        "- 사내 업무 효율화를 위한 관리 시스템 개발\n- 실시간 데이터 동기화를 위한 WebSocket 구현\n- Chart.js를 활용한 데이터 시각화 대시보드 개발\n- 사용자 권한 관리 시스템 구축",
    },
  ],
  activites: [
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
  technology_stacks: [
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
      score: "",
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

  // 항목 추가를 위한 빈 템플릿
  const emptyEducationItem: EducationItem = {
    organ: "",
    department: "",
    degree_level: "0",
    score: "",
    start_date: "",
    end_date: "",
  };
  const emptyExperienceItem: ExperienceItem = {
    job_title: "",
    department: "",
    position: "",
    start_date: "",
    end_date: "",
    employmont_status: false,
    job_description: "",
  };
  const emptyProjectItem: ProjectItem = {
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  };
  const emptyActivityItem: ActivityItem = {
    title: "",
    description: "",
    start_date: "",
    end_date: "",
  };
  const emptyQualificationItem: QualificationItem = {
    title: "",
    organ: "",
    acquisition_date: "",
    score: "",
  };

  const defaultValues = isEditMode
    ? resumeDataSample
    : {
        title: "",
        url: "",
        photoUrl: "",
        user_info: {
          name: "",
          birth_date: "",
          email: "",
          phone: "",
          gender: "0",
          military_service: "0",
          address: "",
        },
        educations: [emptyEducationItem],
        self_introduction: "",
        experiences: [],
        projects: [],
        activites: [],
        technology_stacks: [],
        qualifications: [],
      };

  // 기본 정보 폼
  const form = useForm<ResumeFormValues>({
    defaultValues,
    onSubmit: async ({ value }) => {
      // console.log(value);
      try {
        const trimmedValue = trimObjectStrings(value);
        basicInfoSchema.parse(trimmedValue);

        // TODO: API 호출
        const resumeData: ResumeFormValues = trimmedValue;

        const photoUrlValue = resumeData.photoUrl;
        const photoFile: File | null =
          photoUrlValue && photoUrlValue instanceof File ? photoUrlValue : null;

        const dataToFlatten = {
          ...resumeData,
        };

        if (dataToFlatten.user_info) {
          const flattenedData = {
            ...dataToFlatten.user_info,
            ...dataToFlatten,
          };
          delete flattenedData.user_info;

          const finalData = flattenedData;
          console.log(finalData);

          const formData = new FormData();
          formData.append("data", JSON.stringify(finalData));

          if (photoFile) {
            formData.append("photo", photoFile, photoFile.name);
          }
        }

        // fetch 요청
        // fetch("/api/resumes", {
        //   method: "POST",
        //   body: formData,
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Success:", data);
        //     alert("기본 정보가 저장되었습니다.");
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
        // navigate("/resume");
        alert(`${mode === "edit" ? "수정" : "생성"} 완료!`);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("검증 오류:", error.issues);
        }
      }
    },
    onSubmitInvalid: () => {
      const selector = `input.${errorInput}, textarea.${errorInput}, select.${errorInput}`;
      const firstInvalidElement = window.document.querySelector(selector);

      if (firstInvalidElement) {
        // 2. DOM에서 찾은 요소에 포커스를 맞추고 스크롤 이동
        firstInvalidElement.focus();
        firstInvalidElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // 이 방식은 requiredFieldOrder 없이 DOM 순서대로 첫 번째 필드를 찾습니다.
      }
    },
  });

  useEffect(() => {
    if (isEditMode) {
      // 기존 이력서 불러오기 로직
      // fetch(`/api/resume/${resumeId}`).then(...)
      // setForm(resumeData);
      // Object.entries(resumeData).forEach(([key, value]) => {
      //   // @ts-ignore
      //   basicInfoForm.setFieldValue(key, value);
      // });
    }
  }, [isEditMode]);

  // 필드 렌더 해오기
  function renderFieldByType(
    form: any,
    key: string,
    value: any,
    isEditMode: boolean
  ) {
    if (typeof value === "string")
      return renderTextField(form, key, value, isEditMode);
    if (Array.isArray(value)) return renderArrayField(form, key, value);
    if (typeof value === "object") return renderObjectField(form, key, value);
    return null;
  }

  // text 필드 (이력서 제목, 증명사진, 자기소개)
  function renderTextField(
    form: any,
    key: string,
    value: string,
    isEditMode: boolean
  ) {
    if (!isEditMode && key === "url") return null;
    // 증명사진
    if (key === "photoUrl")
      return (
        <ResumeCard key={key} title={FIELD_LABELS[key].label} isMust>
          <form.Field
            name={key}
            validators={{
              onChange: ({ value }: { value: string }) => {
                // basicInfoSchema.parseAsync(value);

                const result = z
                  .union([photoUrlFileSchema, photoUrlStringSchema])
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
                isPhoto
                input={
                  <FileElem
                    name={key}
                    label="사진 업로드"
                    type="img"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    placeholder={FIELD_LABELS[key].placeholder}
                    error={field.state.meta.errors.join(", ")}
                  />
                }
              />
            )}
          </form.Field>
        </ResumeCard>
      );

    // 이력서 제목, 자기소개
    return (
      <ResumeCard
        key={key}
        title={FIELD_LABELS[key].label}
        isMust={key === "title"}
      >
        <form.Field
          name={key}
          validators={{
            onChange: ({ value }) => {
              // basicInfoSchema.parseAsync(value)
              let result;
              if (key === "title")
                result = z
                  .string()
                  .trim()
                  .min(
                    MIN_LENGTH,
                    `이력서 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
                  )
                  .max(
                    MAX_TITLE_LENGTH,
                    `이력서 이름을 ${MAX_TITLE_LENGTH}글자 이하 입력하세요.`
                  )
                  .safeParse(value);
              else if (key === "self_introduction")
                result = z
                  .string()
                  .trim()
                  .max(
                    MAX_TEXTAREA_LENGTH,
                    `자기소개는 ${MAX_TEXTAREA_LENGTH}자 이하로 입력하세요.`
                  )
                  .nullable()
                  .optional()
                  .safeParse(value);
              return result?.success
                ? undefined
                : result?.error.issues[0].message;
            },
          }}
        >
          {(field) => (
            <ResumeCardRow
              widthType="full"
              input={
                key === "self_introduction" ? (
                  <Textarea
                    name={key}
                    rows={8}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    placeholder={FIELD_LABELS[key].placeholder}
                    error={field.state.meta.errors.join(", ")}
                  />
                ) : (
                  <Text
                    name={key}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    placeholder={FIELD_LABELS[key].placeholder}
                    disabled={key === "url"}
                    error={field.state.meta.errors.join(", ")}
                  />
                )
              }
            />
          )}
        </form.Field>
      </ResumeCard>
    );
  }

  // 객체 필드(기본정보)
  function renderObjectField(
    form: any,
    key: string,
    value: Record<string, any>
  ) {
    return (
      <ResumeCard key={key} title={FIELD_LABELS[key].label} isMust>
        {Object.entries(value).map(([subKey, subValue], idx) => (
          <form.Field
            key={subKey}
            name={`${key}.${subKey}`}
            validators={{
              onChange: ({ value }) => {
                // basicInfoSchema.parseAsync(value)
                const userInfoSchema: {
                  name: z.ZodString;
                  birth_date: z.ZodString;
                  email: z.ZodString;
                  phone: z.ZodString;
                  gender: z.ZodEnum<{
                    1: "1";
                    2: "2";
                  }>;
                  address: z.ZodString;
                  military_service: z.ZodEnum<{
                    1: "1";
                    2: "2";
                    3: "3";
                    4: "4";
                    5: "5";
                    6: "6";
                  }>;
                } = {
                  name: z
                    .string()
                    .trim()
                    .min(
                      MIN_LENGTH,
                      `이름은 ${MIN_LENGTH}글자 이상 입력하세요.`
                    )
                    .max(
                      MAX_NAME_LENGTH,
                      `이름은 ${MAX_NAME_LENGTH}글자 이상 입력하세요.`
                    ),
                  birth_date: z
                    .string()
                    .trim()
                    .regex(/^\d{4}-\d{2}-\d{2}$/, "생일을 입력하세요."),
                  email: z
                    .string()
                    .trim()
                    .min(MIN_LENGTH, "이메일을 입력하세요.")
                    .max(
                      MAX_NAME_LENGTH,
                      `이메일은 ${MAX_NAME_LENGTH}글자 이하 입력하세요.`
                    )
                    .email("올바른 이메일 형식이 아닙니다."),
                  phone: z
                    .string()
                    .trim()
                    .regex(
                      /^010-\d{4}-\d{4}$/,
                      "010-0000-0000 형식으로 입력하세요."
                    ),
                  gender: z.enum(["1", "2"], "성별을 선택해주세요"),
                  address: z
                    .string()
                    .trim()
                    .min(MIN_LENGTH, "주소를 입력해주세요")
                    .max(
                      MAX_NAME_LENGTH,
                      `주소는 ${MAX_NAME_LENGTH}글자 이하 입력하세요.`
                    )
                    .regex(
                      /^.+시\s+.+구/,
                      "주소는 'OO시 OO구' 형식으로 입력해주세요"
                    ),
                  military_service: z.enum(
                    ["1", "2", "3", "4", "5", "6"],
                    "병역 여부를 선택해주세요"
                  ),
                };
                const result = userInfoSchema[subKey].safeParse(value);
                return result?.success
                  ? undefined
                  : result?.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <ResumeCardRow
                widthType={["address"].includes(subKey) ? "full" : "half"}
                input={
                  subKey === "gender" ? (
                    <Select
                      name={`${key}.${subKey}`}
                      isMust
                      label={USER_INFO_LABELS[subKey].label}
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder={USER_INFO_LABELS[subKey].placeholder}
                      options={[
                        { value: "1", label: "남" },
                        { value: "2", label: "여" },
                      ]}
                    />
                  ) : subKey === "military_service" ? (
                    <Select
                      name={`${key}.${subKey}`}
                      isMust
                      label={USER_INFO_LABELS[subKey].label}
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                      placeholder={USER_INFO_LABELS[subKey].placeholder}
                      options={[
                        { value: "1", label: "면제" },
                        { value: "2", label: "군필" },
                        { value: "3", label: "미필" },
                        { value: "4", label: "공익" },
                        { value: "5", label: "병역특례" },
                        { value: "6", label: "해당없음" },
                      ]}
                    />
                  ) : (
                    <Text
                      name={`${key}.${subKey}`}
                      isMust
                      label={USER_INFO_LABELS[subKey].label}
                      type={
                        subKey === "email"
                          ? "email"
                          : subKey === "phone"
                          ? "tel"
                          : subKey === "birth_date"
                          ? "date"
                          : subKey.includes("date")
                          ? "month"
                          : "text"
                      }
                      placeholder={USER_INFO_LABELS[subKey].placeholder}
                      value={field.state.value || subValue}
                      onChange={field.handleChange}
                      error={field.state.meta.errors.join(", ")}
                    />
                  )
                }
              />
            )}
          </form.Field>
        ))}
      </ResumeCard>
    );
  }

  // 배열 필드 (학력, 경력, 프로젝트, 대외활동, 자격증)
  function renderArrayField(form: any, key: string, value: any[]) {
    // 스택
    if (key === "technology_stacks")
      return (
        <ResumeCard key={key} title={FIELD_LABELS[key].label}>
          <form.Field
            name="technology_stacks"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .preprocess(
                    (val) => {
                      if (typeof val !== "string") return val;

                      const processedArray = val
                        .split(",")
                        .map((item) => item.trim())
                        .filter((item) => item.length > 0);

                      return processedArray.length > 0
                        ? processedArray
                        : undefined;
                    },
                    z
                      .array(
                        z.string().trim().min(1, "스킬 이름을 입력하세요.")
                      )
                      .superRefine((items, ctx) => {
                        const duplicates = items.filter(
                          (item, idx) => items.indexOf(item) !== idx
                        );
                        if (duplicates.length > 0) {
                          const uniqueDuplicates = [...new Set(duplicates)];
                          ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: `중복된 스킬 항목이 있습니다: ${uniqueDuplicates.join(
                              ", "
                            )}`,
                          });
                        }
                      })
                      .nullable()
                      .optional()
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
                widthType="full"
                input={
                  <Text
                    name="technology_stacks"
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder={FIELD_LABELS[key].placeholder}
                    error={field.state.meta.errors.join(", ")}
                  />
                }
              />
            )}
          </form.Field>
        </ResumeCard>
      );

    return (
      <form.Field key={key} name={key}>
        {(field) => {
          const fieldArrayValue = field.state.value as any[];
          // console.log(fieldArrayValue);

          // experience, project 등
          const isEducation = key === "education";
          const handleAddItem = () => {
            let newItem;
            if (key === "experiences") newItem = emptyExperienceItem;
            else if (key === "educations") newItem = emptyEducationItem;
            else if (key === "projects") newItem = emptyProjectItem;
            else if (key === "activites") newItem = emptyActivityItem;
            else if (key === "qualifications") newItem = emptyQualificationItem;

            if (newItem) {
              field.pushValue(newItem);
              console.log(newItem);
              console.log("추가완료");
            }
          };

          const handleRemoveItem = (index: number) => {
            if (isEducation && fieldArrayValue.length <= 1) {
              alert("학력은 최소 한 개 이상 등록해야 합니다.");
              return;
            }
            field.removeValue(index);
          };

          return (
            <ResumeCard
              key={key}
              title={FIELD_LABELS[key].label}
              useButton={true}
              btnType="PLUSBLACK"
              onAdd={handleAddItem}
              isMust={"educations".includes(key)}
            >
              {fieldArrayValue.length === 0 && <p>등록된 항목이 없습니다.</p>}
              {fieldArrayValue.map((item, idx) => (
                <ResumeCard
                  key={idx}
                  title={`${FIELD_LABELS[key].label} #${idx + 1}`}
                  useButton={true}
                  btnType="DEL"
                  onDelete={
                    isEducation && fieldArrayValue.length <= 1
                      ? () => {
                          alert("학력은 최소 1개 이상 입력해야 합니다.");
                        }
                      : () => handleRemoveItem(idx)
                  }
                >
                  {Object.entries(item).map(([k, v]) => {
                    if (key === "experiences" && k === "employmont_status") {
                      return null;
                    }

                    return (
                      <form.Field
                        key={k}
                        name={`${key}[${idx}].${k}`}
                        validators={{
                          onChange: ({ value }) => {
                            // basicInfoSchema.parseAsync(value)
                            const itemSchema = {
                              educations: {
                                organ: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `학교 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  )
                                  .regex(
                                    /^.+학교/,
                                    "oo학교 형식으로 입력하세요."
                                  ),
                                department: z
                                  .string()
                                  .min(
                                    MIN_LENGTH,
                                    `학과를 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  )
                                  .regex(/^.+과/, "oo과 형식으로 입력하세요."),
                                degree_level: z.enum(
                                  ["1", "2", "3", "4", "5"],
                                  "학위를 선택하세요."
                                ),
                                score: z
                                  .string()
                                  .trim()
                                  .regex(/^.+점/, "00점 형식으로 입력하세요.")
                                  .nullable()
                                  .optional(),
                                start_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "입학년월을 입력하세요."
                                  ),
                                end_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "졸업년월을 입력하세요."
                                  ),
                              },
                              experiences: {
                                job_title: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `회사명을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  ),
                                department: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `부서명을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  )
                                  .optional(),
                                position: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `직무를 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  ),
                                start_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "입사년월을 입력하세요."
                                  ),
                                end_date: z
                                  .union([
                                    z.literal(null),
                                    z
                                      .string()
                                      .trim()
                                      .regex(
                                        /^\d{4}-\d{2}$/,
                                        "퇴사년월을 입력하세요."
                                      )
                                      .nullable(),
                                  ])
                                  .optional(),
                                job_description: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `주요 업무 및 성과를 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  )
                                  .max(
                                    MAX_TEXTAREA_LENGTH,
                                    `주요 업무 및 성과를 ${MAX_TEXTAREA_LENGTH}글자 이하 입력하세요.`
                                  ),
                              },
                              projects: {
                                title: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `프로젝트 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  ),
                                description: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `프로젝트 내용을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  )
                                  .max(
                                    MAX_TEXTAREA_LENGTH,
                                    `프로젝트 내용을 ${MAX_TEXTAREA_LENGTH}글자 이하 입력하세요.`
                                  ),
                                start_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "시작년월을 입력하세요."
                                  ),
                                end_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "마감년월을 입력하세요."
                                  ),
                              },
                              activites: {
                                title: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `활동 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  ),
                                description: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `활동 내용을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  )
                                  .max(
                                    MAX_TEXTAREA_LENGTH,
                                    `활동 내용을 ${MAX_TEXTAREA_LENGTH}글자 이하 입력하세요.`
                                  ),
                                start_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "입학년월을 입력하세요."
                                  ),
                                end_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "졸업년월을 입력하세요."
                                  ),
                              },
                              qualifications: {
                                title: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `자격증 또는 어학 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  ),
                                organ: z
                                  .string()
                                  .trim()
                                  .min(
                                    MIN_LENGTH,
                                    `발급 및 주관기관 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
                                  ),
                                acquisition_date: z
                                  .string()
                                  .trim()
                                  .regex(
                                    /^\d{4}-\d{2}$/,
                                    "취득년월을 입력하세요."
                                  ),
                                score: z
                                  .union([
                                    z.literal(""), // 빈 문자열을 허용
                                    z
                                      .string()
                                      .trim()
                                      .regex(
                                        /^.+점$/,
                                        "00점 형식으로 입력하세요."
                                      ),
                                  ])
                                  .optional(),
                              },
                            };

                            // 날짜 데이터 비교
                            if (k === "end_date") {
                              const startDate = form.getFieldValue(
                                `${key}[${idx}].start_date`
                              );

                              if (startDate && startDate > value) {
                                if (key === "experience" && value === null)
                                  return;
                                return "시작년월은 마감년월보다 빠를 수 없습니다.";
                              }
                            }

                            const result = itemSchema[key][k]?.safeParse(value);
                            return result?.success
                              ? undefined
                              : result?.error.issues[0].message;
                          },
                        }}
                      >
                        {(field) => (
                          <ResumeCardRow
                            widthType={
                              k.includes("description") ||
                              (key !== "qualifications" && k.includes("title"))
                                ? "full"
                                : "half"
                            }
                            isInner={true}
                            input={
                              k.includes("description") ? (
                                <Textarea
                                  name={`${key}[${idx}].${k}`}
                                  label={
                                    key === "educations"
                                      ? EDUCATION_LABELS[k].label
                                      : key === "experiences"
                                      ? EXPERIENCE_LABELS[k].label
                                      : key === "projects"
                                      ? PROJECT_LABELS[k].label
                                      : key === "activites"
                                      ? ACTIVITY_LABELS[k].label
                                      : QUALIFICATIONS_LABELS[k].label
                                  }
                                  isMust
                                  rows={8}
                                  value={field.state.value || v}
                                  onChange={field.handleChange}
                                  placeholder={
                                    key === "educations"
                                      ? EDUCATION_LABELS[k].placeholder
                                      : key === "experiences"
                                      ? EXPERIENCE_LABELS[k].placeholder
                                      : key === "projects"
                                      ? PROJECT_LABELS[k].placeholder
                                      : key === "activites"
                                      ? ACTIVITY_LABELS[k].placeholder
                                      : QUALIFICATIONS_LABELS[k].placeholder
                                  }
                                  error={field.state.meta.errors.join(", ")}
                                />
                              ) : k === "degree_level" ? (
                                <Select
                                  name={`${key}[${idx}].employmont_status`}
                                  isMust
                                  label={EDUCATION_LABELS[k].label}
                                  value={field.state.value}
                                  onChange={field.handleChange}
                                  onBlur={field.handleBlur}
                                  error={field.state.meta.errors.join(", ")}
                                  placeholder={EDUCATION_LABELS[k].placeholder}
                                  options={[
                                    { value: "1", label: "고졸" },
                                    { value: "2", label: "전문학사" },
                                    { value: "3", label: "학사" },
                                    { value: "4", label: "석사" },
                                    { value: "5", label: "박사" },
                                  ]}
                                />
                              ) : (
                                <>
                                  <Text
                                    name={`${key}[${idx}].${k}`}
                                    label={
                                      key === "educations"
                                        ? EDUCATION_LABELS[k].label
                                        : key === "experiences"
                                        ? EXPERIENCE_LABELS[k].label
                                        : key === "projects"
                                        ? PROJECT_LABELS[k].label
                                        : key === "activites"
                                        ? ACTIVITY_LABELS[k].label
                                        : QUALIFICATIONS_LABELS[k].label
                                    }
                                    placeholder={
                                      key === "educations"
                                        ? EDUCATION_LABELS[k].placeholder
                                        : key === "experiences"
                                        ? EXPERIENCE_LABELS[k].placeholder
                                        : key === "projects"
                                        ? PROJECT_LABELS[k].placeholder
                                        : key === "activites"
                                        ? ACTIVITY_LABELS[k].placeholder
                                        : QUALIFICATIONS_LABELS[k].placeholder
                                    }
                                    isMust={
                                      !(
                                        key === "qualifications" &&
                                        ["score"].includes(k)
                                      )
                                    }
                                    type={k.includes("date") ? "month" : "text"}
                                    value={field.state.value || v}
                                    onChange={field.handleChange}
                                    error={field.state.meta.errors.join(", ")}
                                    disabled={
                                      k === "end_date" &&
                                      key === "experiences" &&
                                      field.form.getFieldValue(
                                        `${key}[${idx}].employmont_status`
                                      )
                                    }
                                  />
                                  {key === "experiences" &&
                                    k === "end_date" && (
                                      <form.Field
                                        key={"employmont_status_checkbox"}
                                        name={`${key}[${idx}].employmont_status`}
                                      >
                                        {(checkboxField) => (
                                          <Checkbox
                                            label={
                                              EXPERIENCE_LABELS[
                                                "employmont_status"
                                              ].label
                                            }
                                            name={checkboxField.name}
                                            value={checkboxField.state.value}
                                            onChange={(e) => {
                                              const isChecked =
                                                e.target.checked;
                                              checkboxField.handleChange(
                                                isChecked
                                              );

                                              const form = checkboxField.form;
                                              const endDateFieldName = `${key}[${idx}].end_date`;

                                              if (isChecked) {
                                                // 재직 중
                                                form.setFieldValue(
                                                  endDateFieldName,
                                                  null
                                                );
                                                form.setFieldMeta(
                                                  endDateFieldName,
                                                  { errors: [] }
                                                );
                                              } else {
                                                // 퇴사
                                                form.setFieldValue(
                                                  endDateFieldName,
                                                  ""
                                                );
                                              }
                                            }}
                                          />
                                        )}
                                      </form.Field>
                                    )}
                                </>
                              )
                            }
                          />
                        )}
                      </form.Field>
                    );
                  })}
                </ResumeCard>
              ))}
            </ResumeCard>
          );
        }}
      </form.Field>
    );
  }

  return (
    <form
      id="resumeForm"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className={`${container} ${innerContainer}`}>
        <ResumeCard isMust={true}>
          <ResumeCardRow
            value="표시는 필수 항목입니다. (이력서 제목, 증명사진, 기본정보,  학력)"
            widthType="full"
          />
        </ResumeCard>

        {Object.entries(defaultValues).map(([key, value]) => {
          if (key !== "resume_id")
            return renderFieldByType(form, key, value, isEditMode);
        })}
      </div>
    </form>
  );
}
