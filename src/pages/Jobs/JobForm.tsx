import { useEffect, useMemo, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import Text, { Textarea } from "@/components/FormElem/text";
import JobCard from "./components/card/JobCard";
import JobCardRow from "./components/card/JobCardRow";
import { cardSectionList } from "./JobDetail.css.ts";
import { container, innerContainer } from "./index.css.ts";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJobPosting,
  updateJobPosting,
  fetchJobDetail,
  type CreateJobPostingData,
  type JobPosting as JobDetailData,
} from "./api";

const MIN_TITLE_LENGTH = 2;
const MIN_COMPANY_LENGTH = 2;
const MIN_CONTENT_LENGTH = 10;
const MIN_QUALIFICATION_LENGTH = 2;

const optionalUrlValidator = ({ value }: { value: string }) => {
  const trimmed = (value ?? "").trim();
  if (!trimmed) return undefined;

  try {
    new URL(trimmed);
    return undefined;
  } catch {
    return "유효한 URL을 입력해주세요.";
  }
};

const flattenErrors = (errors: unknown[]): string =>
  errors
    .flatMap((error) => {
      if (!error) return [];
      if (typeof error === "string") return error;
      if (Array.isArray(error)) {
        return flattenErrors(error);
      }
      if (
        typeof error === "object" &&
        "message" in (error as Record<string, unknown>)
      ) {
        return String((error as { message?: unknown }).message);
      }
      return String(error);
    })
    .filter(Boolean)
    .join(", ");

const jobInfoSchema = z.object({
  id: z.string().optional(),
  url: z
    .union([z.literal(""), z.string().url("유효한 URL을 입력해주세요.")])
    .optional(),
  title: z
    .string()
    .min(MIN_TITLE_LENGTH, `제목은 ${MIN_TITLE_LENGTH}글자 이상이어야 합니다.`),
  company: z
    .string()
    .min(
      MIN_COMPANY_LENGTH,
      `회사명은 ${MIN_COMPANY_LENGTH}글자 이상이어야 합니다.`
    ),
  qualification: z
    .string()
    .min(MIN_QUALIFICATION_LENGTH, "자격 요건을 입력해주세요."),
  prefer: z.string().optional(),
  memo: z.string().optional(),
});

interface JobFormProps {
  mode: "create" | "edit";
}

type JobFormValues = {
  id: string;
  url: string;
  title: string;
  company: string;
  qualification: string;
  prefer: string;
  memo: string;
};

const createEmptyFormValues = (): JobFormValues => ({
  id: "",
  url: "",
  title: "",
  company: "",
  qualification: "",
  prefer: "",
  memo: "",
});

export default function JobForm({ mode }: JobFormProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = mode === "edit" && Boolean(id);

  const titleRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const qualificationRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs = {
    title: titleRef,
    company: companyRef,

    qualification: qualificationRef,
  } as const;

  const requiredFieldOrder = ["title", "company", "qualification"] as const;

  const defaultFormValues = useMemo(() => createEmptyFormValues(), []);

  const {
    data: jobDetail,
    isPending: isDetailPending,
    isError: isDetailError,
    error: _detailError,
  } = useQuery<JobDetailData>({
    queryKey: ["job-detail", id],
    queryFn: () => fetchJobDetail(id!),
    enabled: isEditMode && Boolean(id),
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: ({
      payload,
      isEdit,
    }: {
      payload: CreateJobPostingData & { id?: string };
      isEdit: boolean;
    }) => {
      if (isEdit) {
        return updateJobPosting(Number(payload.id), payload);
      }
      return createJobPosting(payload);
    },
    onSuccess: async (savedJob) => {
      await queryClient.invalidateQueries({
        queryKey: ["job-detail", String(savedJob.posting_id)],
      });
      await queryClient.invalidateQueries({
        queryKey: ["job-list"],
        exact: true,
      });
    },
  });

  const jobInfoForm = useForm({
    defaultValues: defaultFormValues,
    onSubmit: async ({ value }) => {
      try {
        const trimmedValue = {
          ...value,
          url: value.url.trim(),
          title: value.title.trim(),
          company: value.company.trim(),
          qualification: value.qualification.trim(),
          prefer: value.prefer.trim(),
          memo: value.memo.trim(),
        };

        const payload: CreateJobPostingData & { id?: string } = {
          ...trimmedValue,
          id: isEditMode ? id : undefined,
          url: trimmedValue.url || undefined,
          prefer: trimmedValue.prefer || undefined,
          memo: trimmedValue.memo || undefined,
        };

        const savedJob = await saveMutation.mutateAsync({
          payload,
          isEdit: isEditMode,
        });

        alert("채용공고가 저장되었습니다.");
        if (!isEditMode) {
          navigate(`/jobs/${savedJob.posting_id}`);
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error("검증 오류:", err.issues);
        } else if (err instanceof Error) {
          console.error("저장 실패:", err);
          alert(`저장에 실패했습니다: ${err.message}`);
        } else {
          alert("알 수 없는 오류로 저장에 실패했습니다.");
        }
      }
    },
    onSubmitInvalid: ({ formApi }) => {
      requiredFieldOrder.some((fieldName) => {
        const meta = formApi.getFieldMeta(fieldName);
        if (!meta || !Array.isArray(meta.errors)) {
          return false;
        }

        const hasError = meta.errors.some((error) => {
          if (!error) return false;
          if (Array.isArray(error)) {
            return error.some((nested) => Boolean(nested));
          }
          if (typeof error === "object") {
            return Object.keys(error as Record<string, unknown>).length > 0;
          }
          return true;
        });

        if (!hasError) {
          return false;
        }

        const element = fieldRefs[fieldName].current;
        if (element) {
          element.focus();
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        return true;
      });
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      jobInfoForm.reset(createEmptyFormValues());
    }
  }, [isEditMode, jobInfoForm]);

  useEffect(() => {
    if (jobDetail) {
      // API 응답 데이터를 폼 값으로 변환합니다.
      const formValues = {
        id: String(jobDetail.posting_id),
        url: jobDetail.url ?? "",
        title: jobDetail.title,
        company: jobDetail.company ?? "",
        qualification: jobDetail.qualification,
        prefer: jobDetail.prefer ?? "",
        memo: jobDetail.memo ?? "",
      };
      jobInfoForm.reset(formValues);
    }
  }, [jobDetail, jobInfoForm]);

  if (isEditMode && isDetailPending) {
    return (
      <main className={`${container} ${cardSectionList}`} aria-busy="true">
        <p>채용공고 정보를 불러오는 중입니다...</p>
      </main>
    );
  }

  if (isEditMode && isDetailError) {
    const message =
      _detailError instanceof Error
        ? _detailError.message
        : "채용공고 정보를 불러오지 못했습니다.";
    return (
      <main className={`${container} ${cardSectionList}`}>
        <p>{message}</p>
      </main>
    );
  }

  return (
    <main className={container}>
      <form
        id="jobForm"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          jobInfoForm.handleSubmit();
        }}
      >
        <div className={`${innerContainer} ${cardSectionList}`}>
          <JobCard isMust={true}>
            <JobCardRow
              value="표시는 필수 항목입니다. (채용 제목, 회사명, 내용 요약, 자격 요건)"
              widthType="full"
            />
          </JobCard>

          <JobCard title="기본 정보" isMust>
            <jobInfoForm.Field
              name="title"
              validators={{ onChange: jobInfoSchema.shape.title }}
            >
              {(field) => (
                <JobCardRow
                  widthType="half"
                  input={
                    <Text
                      isMust
                      label="채용 제목"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={flattenErrors(field.state.meta.errors)}
                      placeholder="프론트엔드 개발자"
                      ref={titleRef}
                    />
                  }
                />
              )}
            </jobInfoForm.Field>

            <jobInfoForm.Field
              name="company"
              validators={{ onChange: jobInfoSchema.shape.company }}
            >
              {(field) => (
                <JobCardRow
                  widthType="half"
                  input={
                    <Text
                      isMust
                      label="회사명"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={flattenErrors(field.state.meta.errors)}
                      placeholder="네이버"
                      ref={companyRef}
                    />
                  }
                />
              )}
            </jobInfoForm.Field>

            <jobInfoForm.Field
              name="url"
              validators={{ onBlur: optionalUrlValidator }}
            >
              {(field) => (
                <JobCardRow
                  widthType="full"
                  input={
                    <Text
                      label="공고 URL"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={flattenErrors(field.state.meta.errors)}
                      placeholder="https://career.example.com/job/123456"
                    />
                  }
                />
              )}
            </jobInfoForm.Field>

            <jobInfoForm.Field
              name="qualification"
              validators={{ onChange: jobInfoSchema.shape.qualification }}
            >
              {(field) => (
                <JobCardRow
                  widthType="full"
                  input={
                    <Textarea
                      label="자격 요건"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={flattenErrors(field.state.meta.errors)}
                      rows={5}
                      placeholder="자격 요건을 줄바꿈으로 구분하여 작성해주세요."
                      ref={qualificationRef}
                    />
                  }
                />
              )}
            </jobInfoForm.Field>

            <jobInfoForm.Field name="prefer">
              {(field) => (
                <JobCardRow
                  widthType="full"
                  input={
                    <Textarea
                      label="우대 사항"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={flattenErrors(field.state.meta.errors)}
                      rows={4}
                      placeholder="우대 사항이 있다면 줄바꿈으로 구분하여 작성해주세요."
                    />
                  }
                />
              )}
            </jobInfoForm.Field>
          </JobCard>

          <JobCard title="추가 메모">
            <jobInfoForm.Field name="memo">
              {(field) => (
                <JobCardRow
                  widthType="full"
                  input={
                    <Textarea
                      label="메모"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={flattenErrors(field.state.meta.errors)}
                      rows={3}
                      placeholder="내부 메모가 있다면 작성해주세요."
                    />
                  }
                />
              )}
            </jobInfoForm.Field>
          </JobCard>
        </div>
      </form>
    </main>
  );
}
