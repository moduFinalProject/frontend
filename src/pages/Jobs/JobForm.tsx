import { useEffect, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import { z } from "zod";

import Text, { Textarea } from "@/components/FormElem/text";
import JobCard from "./components/card/JobCard";
import JobCardRow from "./components/card/JobCardRow";
import { cardSectionList } from "./JobDetail.css.ts";
import { container, innerContainer } from "./index.css.ts";
import {
  fetchJobDetail,
  saveJob,
  type JobDetailData,
  type JobUpsertInput,
} from "./api";

import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const MIN_TITLE_LENGTH = 2;
const MIN_COMPANY_LENGTH = 2;
const MIN_CONTENT_LENGTH = 10;
const MIN_QUALIFICATION_LENGTH = 2;

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
  content: z
    .string()
    .min(MIN_CONTENT_LENGTH, "내용 요약은 10글자 이상 입력해주세요."),
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
  content: string;
  qualification: string;
  prefer: string;
  memo: string;
};

const createEmptyFormValues = (): JobFormValues => ({
  id: "",
  url: "",
  title: "",
  company: "",
  content: "",
  qualification: "",
  prefer: "",
  memo: "",
});

const createMinLengthValidator =
  (min: number, message: string) =>
  ({ value }: { value: string }) => {
    const trimmed = (value ?? "").trim();
    return trimmed.length >= min ? undefined : message;
  };

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

const splitByLine = (source: string) =>
  source
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

function mapDetailToFormValues(
  detail: Awaited<ReturnType<typeof fetchJobDetail>>
): JobFormValues {
  return {
    id: detail.id,
    url: detail.url ?? "",
    title: detail.title,
    company: detail.company ?? "",
    content: detail.content,
    qualification: detail.qualification.join("\n"),
    prefer: (detail.prefer ?? []).join("\n"),
    memo: detail.memo ?? "",
  };
}

export default function JobForm({ mode }: JobFormProps) {
  const { id } = useParams();
  const isEditMode = mode === "edit" && Boolean(id);

  const titleRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const qualificationRef = useRef<HTMLTextAreaElement>(null);

  const fieldRefs = {
    title: titleRef,
    company: companyRef,
    content: contentRef,
    qualification: qualificationRef,
  } as const;

  const requiredFieldOrder = [
    "title",
    "company",
    "content",
    "qualification",
  ] as const;

  const defaultFormValues = useMemo(() => createEmptyFormValues(), []);

  const {
    data: jobDetail,
    isPending: isDetailPending,
    isError: isDetailError,
    error: detailError,
  } = useQuery<JobDetailData>({
    queryKey: ["job-detail", id],
    queryFn: () => fetchJobDetail(id ?? ""),
    enabled: isEditMode && Boolean(id),
  });

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: saveJob,
    onSuccess: async (detail) => {
      await queryClient.invalidateQueries({
        queryKey: ["job-detail", detail.id],
      });
      await queryClient.invalidateQueries({ queryKey: ["job-list"] });
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
          content: value.content.trim(),
          qualification: value.qualification.trim(),
          prefer: value.prefer.trim(),
          memo: value.memo.trim(),
        };

        jobInfoSchema.parse(trimmedValue);

        const qualificationValues = splitByLine(trimmedValue.qualification);
        const preferValues = splitByLine(trimmedValue.prefer);

        const payload: JobUpsertInput = {
          id: trimmedValue.id?.trim() ? trimmedValue.id : undefined,
          userId: jobDetail?.userId,
          url: trimmedValue.url?.trim() ? trimmedValue.url.trim() : undefined,
          title: trimmedValue.title,
          company: trimmedValue.company,
          content: trimmedValue.content,
          qualification: qualificationValues,
          prefer: preferValues.length > 0 ? preferValues : undefined,
          memo: trimmedValue.memo ? trimmedValue.memo : undefined,
        };

        console.log(
          isEditMode ? "Edit mode payload:" : "Create mode payload:",
          payload
        );
        await saveMutation.mutateAsync(payload);
        alert("채용공고가 저장되었습니다.");
      } catch (err) {
        if (err instanceof z.ZodError) {
          console.error("검증 오류:", err.issues);
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
      const mapped = mapDetailToFormValues(jobDetail);
      jobInfoForm.reset(mapped);
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
      detailError instanceof Error
        ? detailError.message
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
          <JobCard isMust>
            <JobCardRow
              value="* 표시는 필수 항목입니다. (채용 제목, 회사명, 내용 요약, 자격 요건)"
              widthType="full"
            />
          </JobCard>

          <JobCard title="기본 정보" isMust>
            <jobInfoForm.Field
              name="title"
              validators={{
                onChange: createMinLengthValidator(
                  MIN_TITLE_LENGTH,
                  `제목은 ${MIN_TITLE_LENGTH}글자 이상이어야 합니다.`
                ),
              }}
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
                      error={field.state.meta.errors.join(", ")}
                      placeholder="프론트엔드 개발자"
                      ref={titleRef}
                    />
                  }
                />
              )}
            </jobInfoForm.Field>

            <jobInfoForm.Field
              name="company"
              validators={{
                onChange: createMinLengthValidator(
                  MIN_COMPANY_LENGTH,
                  `회사명은 ${MIN_COMPANY_LENGTH}글자 이상이어야 합니다.`
                ),
              }}
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
                      error={field.state.meta.errors.join(", ")}
                      placeholder="네이버"
                      ref={companyRef}
                    />
                  }
                />
              )}
            </jobInfoForm.Field>

            <jobInfoForm.Field
              name="url"
              validators={{
                onBlur: optionalUrlValidator,
              }}
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
                      error={field.state.meta.errors.join(", ")}
                      placeholder="https://career.example.com/job/123456"
                    />
                  }
                />
              )}
            </jobInfoForm.Field>

            <jobInfoForm.Field
              name="qualification"
              validators={{
                onChange: createMinLengthValidator(
                  MIN_QUALIFICATION_LENGTH,
                  "자격 요건을 입력해주세요."
                ),
              }}
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
                      error={field.state.meta.errors.join(", ")}
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
                      error={field.state.meta.errors.join(", ")}
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
                      error={field.state.meta.errors.join(", ")}
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
