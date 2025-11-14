import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "@/components/index.ts";
import { form } from "./Search.css.ts";
import { useEffect } from "react";
import Text from "@/components/FormElem/text/Text.tsx";
import { useResumeContext, type Resume } from "../../ResumeContext.tsx";
import { getResumeList } from "@/services/resumes.ts";

export default function Search() {
  const {
    setResumes,
    setPage,
    search,
    setSearch,
  }: {
    setResumes: (arg0: Resume[]) => void;
    setPage: (arg0: number) => void;
    search: string;
    setSearch: (arg0: string) => void;
  } = useResumeContext();

  const searchForm = useForm({
    defaultValues: {
      search: search,
    },
    onSubmit: async ({ value }) => {
      try {
        const data = await getResumeList({ page: 1, search: value.search });

        setResumes(data);
        setSearch(value.search);
        setPage(2);
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("검증 오류:", error.issues);
        }
      }
    },
  });

  useEffect(() => {
    // 검색 로직
  }, []);

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
        <searchForm.Field name="search">
          {(field) => (
            <>
              <Text
                // label="이력서 제목"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={field.state.meta.errors.join(", ")}
                placeholder="이력서 이름으로 검색..."
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
