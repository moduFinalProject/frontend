import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  addDay,
  createResume,
  getResume,
  getUserInfo,
  updateResume,
} from "@/services/resumes.ts";
import {
  useResumeContext,
  type ActivityItem,
  type EducationItem,
  type ExperienceItem,
  type ProjectItem,
  type QualificationItem,
  type ResumeData,
} from "./ResumeContext.tsx";
import { toast } from "react-toastify";

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
  employment_status: false,
  job_description: "",
};
const emptyProjectItem: ProjectItem = {
  title: "",
  start_date: "",
  end_date: "",
  description: "",
};
const emptyActivityItem: ActivityItem = {
  title: "",
  start_date: "",
  end_date: "",
  description: "",
};
const emptyQualificationItem: QualificationItem = {
  title: "",
  organ: "",
  acquisition_date: "",
  score: "",
};

function transformStacksForForm(stackArray: string[]): { title: string }[] {
  if (!Array.isArray(stackArray) || stackArray.length === 0) {
    return [];
  }

  return stackArray
    .filter((stack: string) => stack.trim().length > 0)
    .map((stack: string) => ({
      title: stack,
    }));
}

export default function ResumeForm() {
  const {
    resumeData,
    setResume,
    isLoading,
    setIsLoading,
    isEditMode,
    id,
  }: {
    resumeData: ResumeData;
    setResume: (arg0: ResumeData) => void;
    isLoading: boolean;
    setIsLoading: (arg0: boolean) => void;
    isEditMode: boolean;
    id: string;
  } = useResumeContext();
  const navigate = useNavigate();

  const defaultValues = isEditMode
    ? resumeData
    : {
        title: "",
        url: "",
        image_url: "",
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
        activities: [],
        technology_stacks: [],
        qualifications: [],
      };

  // 기본 정보 폼
  const form = useForm<ResumeData>({
    defaultValues,
    onSubmit: async ({ value }) => {
      try {
        // trim 적용
        const trimmedValue = trimObjectStrings(value);
        basicInfoSchema.parse(trimmedValue);

        // 전송할 데이터
        const resumeData: ResumeData = trimmedValue;

        // 사진 File 여부 체크
        const photoUrlValue: File | string = resumeData.image_url;
        const photoFile: File | null =
          photoUrlValue && photoUrlValue instanceof File ? photoUrlValue : null;

        const dataToFlatten = {
          ...resumeData,
          image_url: photoUrlValue instanceof File ? "" : photoUrlValue,
        };

        // user_info 내부 값 상위로 올리기
        const flattenedData = {
          ...dataToFlatten.user_info,
          ...dataToFlatten,
          resume_type: "1",
        };
        delete flattenedData.user_info;

        // 학력 날짜에 -01 붙이기
        flattenedData.educations = addDay(flattenedData.educations);

        // 경력 날짜에 -01 붙이기
        flattenedData.experiences = addDay(flattenedData.experiences);

        // 프로젝트 날짜에 -01 붙이기
        flattenedData.projects = addDay(flattenedData.projects);

        // 활동 날짜에 -01 붙이기
        flattenedData.activities = addDay(flattenedData.activities);

        // 자격증/어학 날짜에 -01 붙이기
        flattenedData.qualifications = addDay(flattenedData.qualifications);

        // 스택 배열로 만들기
        if (typeof flattenedData.technology_stacks === "string") {
          flattenedData.technology_stacks = flattenedData.technology_stacks
            .split(",")
            .map((stack: string) => stack.trim());
        }

        flattenedData.technology_stacks = transformStacksForForm(
          flattenedData.technology_stacks
        );

        // 최종 수정값
        const finalData = flattenedData;

        const formData = new FormData();
        formData.append("data", JSON.stringify(finalData));

        if (photoFile) {
          formData.append("photo", photoFile, photoFile.name);
        }

        // fetch 요청
        let result;

        if (isEditMode) {
          result = await updateResume(formData, id);
        } else {
          result = await createResume(formData);
        }

        if (!result) {
          toast.error(
            `${!isEditMode ? "생성" : "수정"} 중 문제가 발생했습니다.`,
            {
              className: "custom-error-toast",
            }
          );
          return;
        }

        toast.success(`${!isEditMode ? "생성" : "수정"} 완료!`, {
          className: "custom-success-toast",
        });

        navigate(`/resume/${result.resume_id}`);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("검증 오류:", error.issues);
          const message =
            error instanceof Error
              ? `저장에 실패했습니다: ${error.message}`
              : "저장 처리 중 오류가 발생했습니다.";
          toast.error(message, {
            className: "custom-error-toast",
          });
        }
      }
    },
    onSubmitInvalid: () => {
      const selector = `input.${errorInput}, textarea.${errorInput}, select.${errorInput}`;
      const firstInvalidElement = window.document.querySelector(selector);

      if (firstInvalidElement) {
        // 스크롤 이동
        firstInvalidElement.focus();
        firstInvalidElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        toast.error("필수 항목을 확인해주세요.", {
          className: "custom-error-toast",
        });
      }
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      const loadAndSetUserData = async () => {
        const userInfo = await getUserInfo();

        form.reset({
          ...defaultValues,
          user_info: {
            ...defaultValues.user_info,
            name: userInfo.name,
            birth_date: userInfo.birth_date,
            email: userInfo.email,
            gender: userInfo.gender,
            phone: userInfo.phone,
            address: userInfo.address,
          },
        });
      };
      loadAndSetUserData();

      setIsLoading(false);
      return;
    }

    if (resumeData.resume_id !== id) {
      const loadAndSetData = async () => {
        setIsLoading(true);
        const serverData = await getResume(id);

        if (serverData) {
          setResume(serverData);
        }
        setIsLoading(false);
      };

      loadAndSetData();
    }
  }, [id]);

  if (isLoading) {
    return <div>이력서 데이터를 불러오는 중입니다...</div>;
  }

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
    if (key.includes("resume") || key.includes("updated")) return;
    if ((!isEditMode || (isEditMode && value === "")) && key === "url")
      return null;
    // 증명사진
    if (key === "image_url")
      return (
        <ResumeCard key={key} title={FIELD_LABELS[key]?.label} isMust>
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
            {(field) => {
              return (
                <ResumeCardRow
                  widthType="full"
                  isPhoto
                  imgUrl={field.state.value}
                  input={
                    <FileElem
                      name={key}
                      label="사진 업로드"
                      type="img"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      placeholder={FIELD_LABELS[key]?.placeholder}
                      error={field.state.meta.errors.join(", ")}
                    />
                  }
                />
              );
            }}
          </form.Field>
        </ResumeCard>
      );

    // 이력서 제목, 자기소개
    return (
      <ResumeCard
        key={key}
        title={FIELD_LABELS[key]?.label}
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
                    placeholder={FIELD_LABELS[key]?.placeholder}
                    error={field.state.meta.errors.join(", ")}
                  />
                ) : (
                  <Text
                    name={key}
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    placeholder={FIELD_LABELS[key]?.placeholder}
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
    value: Record<string, string>
  ) {
    return (
      <ResumeCard key={key} title={FIELD_LABELS[key]?.label} isMust>
        {value &&
          Object.entries(value).map(([subKey, subValue]) => (
            <form.Field
              key={subKey}
              name={`${key}.${subKey}`}
              validators={{
                onChange: ({ value }: { value: string }) => {
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
                      ),
                    military_service: z.enum(
                      ["1", "2", "3", "4", "5", "6"],
                      "병역 여부를 선택해주세요"
                    ),
                  };
                  const result = userInfoSchema[subKey]?.safeParse(value);
                  return result?.success
                    ? undefined
                    : result?.error.issues[0].message;
                },
              }}
            >
              {(field) => {
                if (subKey.includes("detail")) return;

                return (
                  <ResumeCardRow
                    widthType={"address".includes(subKey) ? "full" : "half"}
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
                );
              }}
            </form.Field>
          ))}
      </ResumeCard>
    );
  }

  // 배열 필드 (학력, 경력, 프로젝트, 대외활동, 자격증)
  function renderArrayField(
    form: any,
    key: string,
    value: (
      | EducationItem
      | ExperienceItem
      | ProjectItem
      | ActivityItem
      | QualificationItem
    )[]
  ) {
    // 스택
    if (key === "technology_stacks")
      return (
        <ResumeCard key={key} title={FIELD_LABELS[key].label}>
          <form.Field
            name="technology_stacks"
            validators={{
              onChange: ({ value }: { value: string }) => {
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

          // experience, project 등
          const isEducation = key === "educations";
          const handleAddItem = () => {
            let newItem;
            if (key === "experiences") newItem = emptyExperienceItem;
            else if (key === "educations") newItem = emptyEducationItem;
            else if (key === "projects") newItem = emptyProjectItem;
            else if (key === "activities") newItem = emptyActivityItem;
            else if (key === "qualifications") newItem = emptyQualificationItem;

            if (newItem) {
              field.pushValue(newItem);
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
                  {item &&
                    Object.entries(item).map(([k, v]) => {
                      if (key === "experiences" && k === "employment_status") {
                        return null;
                      }

                      return (
                        <form.Field
                          key={k}
                          name={`${key}[${idx}].${k}`}
                          validators={{
                            onChange: ({ value }: { value: string }) => {
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
                                    .regex(
                                      /^.+과/,
                                      "oo과 형식으로 입력하세요."
                                    ),
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
                                activities: {
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

                              const result =
                                itemSchema[key][k]?.safeParse(value);
                              return result?.success
                                ? undefined
                                : result?.error.issues[0].message;
                            },
                          }}
                        >
                          {(field) => {
                            if (k.includes("detail")) return;
                            return (
                              <ResumeCardRow
                                widthType={
                                  k.includes("description") ||
                                  (key !== "qualifications" &&
                                    k.includes("title"))
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
                                          ? EDUCATION_LABELS[k]?.label
                                          : key === "experiences"
                                          ? EXPERIENCE_LABELS[k]?.label
                                          : key === "projects"
                                          ? PROJECT_LABELS[k]?.label
                                          : key === "activities"
                                          ? ACTIVITY_LABELS[k]?.label
                                          : QUALIFICATIONS_LABELS[k]?.label
                                      }
                                      isMust
                                      rows={8}
                                      value={field.state.value || v}
                                      onChange={field.handleChange}
                                      placeholder={
                                        key === "educations"
                                          ? EDUCATION_LABELS[k]?.placeholder
                                          : key === "experiences"
                                          ? EXPERIENCE_LABELS[k]?.placeholder
                                          : key === "projects"
                                          ? PROJECT_LABELS[k]?.placeholder
                                          : key === "activities"
                                          ? ACTIVITY_LABELS[k]?.placeholder
                                          : QUALIFICATIONS_LABELS[k]
                                              ?.placeholder
                                      }
                                      error={field.state.meta.errors.join(", ")}
                                    />
                                  ) : k === "degree_level" ? (
                                    <Select
                                      name={`${key}[${idx}].employment_status`}
                                      isMust
                                      label={EDUCATION_LABELS[k]?.label}
                                      value={field.state.value}
                                      onChange={field.handleChange}
                                      onBlur={field.handleBlur}
                                      error={field.state.meta.errors.join(", ")}
                                      placeholder={
                                        EDUCATION_LABELS[k]?.placeholder
                                      }
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
                                            ? EDUCATION_LABELS[k]?.label
                                            : key === "experiences"
                                            ? EXPERIENCE_LABELS[k]?.label
                                            : key === "projects"
                                            ? PROJECT_LABELS[k]?.label
                                            : key === "activities"
                                            ? ACTIVITY_LABELS[k]?.label
                                            : QUALIFICATIONS_LABELS[k]?.label
                                        }
                                        placeholder={
                                          key === "educations"
                                            ? EDUCATION_LABELS[k]?.placeholder
                                            : key === "experiences"
                                            ? EXPERIENCE_LABELS[k]?.placeholder
                                            : key === "projects"
                                            ? PROJECT_LABELS[k]?.placeholder
                                            : key === "activities"
                                            ? ACTIVITY_LABELS[k]?.placeholder
                                            : QUALIFICATIONS_LABELS[k]
                                                ?.placeholder
                                        }
                                        isMust={
                                          !(
                                            key === "qualifications" &&
                                            ["score"].includes(k)
                                          )
                                        }
                                        type={
                                          k.includes("date") ? "month" : "text"
                                        }
                                        value={field.state.value || v}
                                        onChange={field.handleChange}
                                        error={field.state.meta.errors.join(
                                          ", "
                                        )}
                                        disabled={
                                          k === "end_date" &&
                                          key === "experiences" &&
                                          field.form.getFieldValue(
                                            `${key}[${idx}].employment_status`
                                          )
                                        }
                                      />
                                      {key === "experiences" &&
                                        k === "end_date" && (
                                          <form.Field
                                            key={"employment_status_checkbox"}
                                            name={`${key}[${idx}].employment_status`}
                                          >
                                            {(checkboxField) => (
                                              <Checkbox
                                                label={
                                                  EXPERIENCE_LABELS[
                                                    "employment_status"
                                                  ].label
                                                }
                                                name={checkboxField.name}
                                                value={
                                                  checkboxField.state.value
                                                }
                                                onChange={(e) => {
                                                  const isChecked =
                                                    e.target.checked;
                                                  checkboxField.handleChange(
                                                    isChecked
                                                  );

                                                  const form =
                                                    checkboxField.form;
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
                            );
                          }}
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

        {defaultValues &&
          Object.entries(defaultValues).map(([key, value]) => {
            if (key !== "resume_id")
              return renderFieldByType(form, key, value, isEditMode);
          })}
      </div>
    </form>
  );
}
