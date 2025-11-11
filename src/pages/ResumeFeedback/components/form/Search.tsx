import { useForm } from "@tanstack/react-form";
import { z } from "zod";

import { Button } from "@/components/index.ts";
import { form } from "./Search.css.ts";
import { useEffect } from "react";
import Text from "@/components/FormElem/text/Text.tsx";

const searchSchema = z.object({
  value: "",
});

export default function Search() {
  const searchForm = useForm({
    defaultValues: {
      value: "",
    },
    onSubmit: async ({ value }) => {
      try {
        searchSchema.parse(value);
        console.log("검색:", value);
        // if (value !== "") {
        //   console.log("검색 진행");
        // } else {
        //   console.log("검색 리셋");
        // }
        // TODO: API 호출
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
      role="search"
    >
      <div className={form}>
        <searchForm.Field name="value">
          {(field) => (
            <>
              <label className="a11y-hidden" htmlFor="resume-feedback-search">
                기업명 또는 직무 검색
              </label>
              <Text
                id="resume-feedback-search"
                name="resume-feedback-search"
                type="search"
                value={field.state.value}
                onChange={field.handleChange}
                onBlur={field.handleBlur}
                error={field.state.meta.errors.join(", ")}
                placeholder="기업명 또는 직무로 검색..."
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
