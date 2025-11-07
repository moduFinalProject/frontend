import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ResumeCard from "./components/card/ResumeCard";
import ResumeCardRow from "./components/card/ResumeCardRow";

import { useForm } from "@tanstack/react-form";
import { keyof, z } from "zod";
import Text, { Textarea } from "@/components/FormElem/text";
import File from "@/components/FormElem/file/File";
import { container, innerContainer } from "./index.css.ts";

const basicInfoSchema = z.object({
  user_info: {
    name: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    phone: z
      .string()
      .regex(
        /^010-\d{4}-\d{4}$/,
        "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)"
      ),
  },
  url: z.string().min(2, "url은 http/https부터 입력해야 합니다."),
});

interface ResumeFormProps {
  mode: "create" | "edit";
}

type ResumeData = {
  id: string;
  title: string;
  photoUrl: string;
  url?: string;
  user_info: {
    name: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    military_service: string;
  };
  self_introduction: string;
  experience?: {
    job_title: string;
    position: string;
    department: string;
    start_date: string;
    end_date: string;
    description: string;
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
    qua_title: string;
    organ: string;
    acquisition_date: string;
    score?: string;
  }[];
};

const resumeData: ResumeData = {
  id: "1",
  title: "기본 이력서",
  photoUrl:
    "https://i.pinimg.com/736x/95/f0/8a/95f08adb4d08c76eda72fd488700bd3a.jpg",
  url: "https://career.example.com/job/123456",
  user_info: {
    name: "김취업",
    email: "email@email.com",
    phone: "010-0000-0000",
    gender: "남",
    address: "서울시 강남구",
    military_service: "현역",
  },
  self_introduction:
    "안녕하세요. 3년차 웹 개발자 김취업입니다.\n\n사용자 중심의 인터페이스 설계와 효율적인 코드 작성에 관심이 많으며, 항상 새로운 기술을 배우고 적용하는 것을 즐깁니다. 팀원들과의 원활한 소통을 통해 프로젝트를 성공적으로 이끌어 낸 경험이 있으며, 문제 해결 능력과 책임감을 바탕으로 맡은 업무를 완수하는 것을 목표로 하고 있습니다.\n\n지속적인 학습과 성장을 통해 더 나은 개발자가 되고자 노력하고 있습니다.",

  education: {
    organ: "한국대학교",
    department: "컴퓨터공학",
    degree_level: "학사",
    score: "3.8 / 4.5",
    start_date: "2020-06",
    end_date: "2022-02",
  },
  experience: [
    {
      job_title: "테크스타트업",
      position: "프론트엔드 개발자",
      start_date: "2022-03",
      end_date: "현재",
      description:
        "- React와 TypeScript를 활용한 웹 서비스 개발 및 유지보수\n- Redux를 이용한 상태 관리 구조 설계 및 구현\n- REST API 연동 및 데이터 처리 로직 개발\n- 반응형 웹 디자인 구현으로 모바일 사용자 경험 개선\n- Git을 활용한 버전 관리 및 코드 리뷰 참여\n- 웹 접근성 개선 작업으로 WCAG 2.1 AA 등급 달성",
      department: "개발팀",
      employment_status: "Y",
    },
    {
      job_title: "디지털솔루션",
      position: "주니어 웹 개발자",
      start_date: "2020-06",
      end_date: "2022-02",
      description:
        "- HTML, CSS, JavaScript를 활용한 웹 페이지 개발\n- jQuery를 이용한 동적 UI 구현\n- 크로스 브라우저 호환성 테스트 및 이슈 해결\n- 웹사이트 성능 최적화를 통한 로딩 속도 25% 개선\n- UI/UX 디자이너와 협업하여 사용자 경험 개선",
      department: "개발팀",
      employment_status: "N",
    },
  ],
  project: [
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
      qua_title: "정보처리기사",
      organ: "한국산업인력공단",
      acquisition_date: "2020-08",
    },
    {
      qua_title: "TOEIC",
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
        title: "",
        url: "",
        photoUrl: "",
        user_info: {
          name: "",
          email: "",
          phone: "",
          gender: "",
          address: "",
          military_service: "",
        },
        self_introduction: "",
        education: {
          organ: "",
          department: "",
          degree_level: "",
          score: "",
          start_date: "",
          end_date: "",
        },
        experience: [],
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
      <div className={`${container} ${innerContainer}`}>
        <ResumeCard isMust={true}>
          <ResumeCardRow
            value="표시는 필수 항목입니다. (증명사진, 기본정보, 경력, 학력)"
            widthType="full"
          />
        </ResumeCard>

        {Object.entries(defaultValues).map(([key, value]) => {
          // 기본 타입 (문자열)
          if (typeof value === "string") {
            if (!isEditMode && key === "url") return;
            if (key === "id")
              return (
                <basicInfoForm.Field name={key}>
                  {(field) => {
                    return (
                      <Text
                        isHidden={true}
                        // label="이력서 제목"
                        value={field.state.value}
                        onChange={field.handleChange}
                        onBlur={field.handleBlur}
                        error={field.state.meta.errors.join(", ")}
                        placeholder=""
                      />
                    );
                  }}
                </basicInfoForm.Field>
              );

            if (key === "photoUrl")
              return (
                <ResumeCard key={key} title={key} isMust={true}>
                  <basicInfoForm.Field name={key}>
                    {(field) => {
                      return (
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
                      );
                    }}
                  </basicInfoForm.Field>
                </ResumeCard>
              );

            return (
              <ResumeCard
                key={key}
                title={key}
                isMust={key === "title" && true}
              >
                <basicInfoForm.Field name={key}>
                  {(field) => {
                    return (
                      <ResumeCardRow
                        widthType="full"
                        input={
                          key === "self_introduction" ? (
                            <Textarea
                              // label="이력서 제목"
                              value={field.state.value}
                              onChange={field.handleChange}
                              onBlur={field.handleBlur}
                              error={field.state.meta.errors.join(", ")}
                              placeholder=""
                              rows={8}
                            />
                          ) : (
                            <Text
                              // label="이력서 제목"
                              value={field.state.value}
                              onChange={field.handleChange}
                              onBlur={field.handleBlur}
                              error={field.state.meta.errors.join(", ")}
                              placeholder=""
                              disabled={key === "url" && true}
                            />
                          )
                        }
                      />
                    );
                  }}
                </basicInfoForm.Field>
              </ResumeCard>
            );
          }

          // 객체 타입 (user_info, education 등)
          if (typeof value === "object" && !Array.isArray(value)) {
            return (
              <ResumeCard
                key={key}
                title={key}
                isMust={key === "user_info" || (key === "education" && true)}
              >
                {Object.entries(value).map(([subKey, subValue], idx) => (
                  <basicInfoForm.Field name={`${subKey}${idx}`}>
                    {(field) => (
                      <ResumeCardRow
                        widthType="half"
                        input={
                          <Text
                            label={subKey}
                            type={
                              subKey === "email"
                                ? "email"
                                : subKey === "phone"
                                ? "tel"
                                : subKey.includes("date")
                                ? "month"
                                : "text"
                            }
                            value={
                              field.state.value ? field.state.value : subValue
                            }
                            onChange={field.handleChange}
                            onBlur={field.handleBlur}
                            error={field.state.meta.errors.join(", ")}
                            placeholder=""
                          />
                        }
                      />
                    )}
                  </basicInfoForm.Field>
                ))}
              </ResumeCard>
            );
          }

          // 배열 타입 (experience, project 등)
          if (Array.isArray(value)) {
            return (
              <ResumeCard
                key={key}
                title={key}
                useButton={key !== "technology_stack" && true}
              >
                {value.length === 0 ? (
                  <p>등록된 항목이 없습니다.</p>
                ) : key === "technology_stack" ? (
                  <basicInfoForm.Field
                    name="technology_stack"
                    validators={{
                      onChange: ({ value }) => {
                        if (!value) return undefined;

                        // ',' 기준으로 나누기
                        const items = value
                          .split(",")
                          .map((v) => v.trim())
                          .filter((v) => v.length > 0);

                        // 2중복 여부 확인
                        const duplicates = items.filter(
                          (item, idx) => items.indexOf(item) !== idx
                        );

                        // 중복이 있으면 에러 메시지 리턴
                        if (duplicates.length > 0) {
                          return `중복된 항목이 있습니다: ${[
                            ...new Set(duplicates),
                          ].join(", ")}`;
                        }

                        // 통과
                        return undefined;
                      },
                    }}
                  >
                    {(field) => (
                      <>
                        <ResumeCardRow
                          widthType="full"
                          input={
                            <Text
                              value={field.state.value}
                              onChange={field.handleChange}
                              onBlur={field.handleBlur}
                              error={field.state.meta.errors.join(", ")}
                              placeholder="기술명을 중복이 되지 않도록 콤마(,)로 구분하여 입력하세요"
                            />
                          }
                        />
                      </>
                    )}
                  </basicInfoForm.Field>
                ) : (
                  value.map((item, idx) => (
                    <ResumeCard key={idx} title={key}>
                      {typeof item === "object"
                        ? Object.entries(item).map(([k, v]) => (
                            <basicInfoForm.Field key={k} name={`${k}${idx}`}>
                              {(field) => {
                                return (
                                  <ResumeCardRow
                                    widthType={
                                      k === "description" || k === "title"
                                        ? "full"
                                        : "half"
                                    }
                                    input={
                                      k === "description" ? (
                                        <Textarea
                                          label={k}
                                          value={
                                            field.state.value
                                              ? field.state.value
                                              : v
                                          }
                                          onChange={field.handleChange}
                                          onBlur={field.handleBlur}
                                          error={field.state.meta.errors.join(
                                            ", "
                                          )}
                                          placeholder=""
                                          rows={8}
                                        />
                                      ) : (
                                        <Text
                                          label={k}
                                          type={
                                            k.includes("date")
                                              ? "month"
                                              : "text"
                                          }
                                          value={
                                            field.state.value
                                              ? field.state.value
                                              : v
                                          }
                                          onChange={field.handleChange}
                                          onBlur={field.handleBlur}
                                          error={field.state.meta.errors.join(
                                            ", "
                                          )}
                                          placeholder=""
                                          disabled={key === "url" && true}
                                        />
                                      )
                                    }
                                  />
                                );
                              }}
                            </basicInfoForm.Field>
                          ))
                        : item}
                    </ResumeCard>
                  ))
                )}
              </ResumeCard>
            );
          }

          return null;
        })}
      </div>
    </form>
  );
}
