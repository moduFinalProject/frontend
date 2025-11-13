import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "@/components/index.ts";
import { form } from "./Search.css.ts";
import { useEffect } from "react";
import Text from "@/components/FormElem/text/Text.tsx";
import { useResumeContext } from "../../ResumeContext.tsx";

const searchSchema = z.object({
  value: "",
});

export default function Search() {
  const { resumes, setResumes, setPage, search, setSearch } =
    useResumeContext();
  const searchForm = useForm({
    defaultValues: {
      value: "",
    },
    onSubmit: async ({ value }) => {
      try {
        searchSchema.parse(value);
        console.log("검색:", value);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("검증 오류:", error.issues);
        }
      }
    },
  });

  useEffect(() => {
    // 검색 로직
  }, [searchForm]);

  return (
    <form
      id="searchForm"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        searchForm.handleSubmit();
      }}
    >
      <div className={form}>
        <searchForm.Field name="value">
          {(field) => (
            <>
              <Text
                // label="이력서 제목"
                name="search"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={field.state.meta.errors.join(", ")}
                placeholder="이력서 이름 또는 설명으로 검색..."
              />
              <Button
                color="blue"
                icon="SEARCH"
                text="검색"
                buttonType="submit"
                form="searchForm"
                callback={() => {}}
                widthStyle="fit"
              />
            </>
          )}
        </searchForm.Field>
      </div>
    </form>
  );
}
