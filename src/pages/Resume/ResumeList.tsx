import { useCallback, useEffect, useState } from "react";
import { resumeList } from "./ResumeList.css.ts";
import ResumeItem from "./components/ResumeItem.tsx";
import Search from "./components/form/Search.tsx";
import { getResumeList } from "@/services/resumes.ts";
import { useResumeContext, type Resume } from "./ResumeContext.tsx";
import { Button } from "@/components/index.ts";

export default function ResumeList() {
  const {
    resumes,
    setResumes,
    isLoading,
    setIsLoading,
    page,
    setPage,
    search,
  }: {
    resumes: Resume[];
    setResumes: (arg0: Resume[] | ((prev: Resume[]) => Resume[])) => void;
    isLoading: boolean;
    setIsLoading: (arg0: boolean) => void;
    page: number;
    setPage: (arg0: number) => void;
    search: string;
  } = useResumeContext();
  const [hasMore, setHasMore] = useState(true);

  const loadResumesData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const data = await getResumeList({ page, limit: 6, search });

      if (data && data.length > 0) {
        setResumes((prev) => [...prev, ...data]);
        setPage(page + 1);

        if (data.length < 6) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("이력서 목록 로딩 오류:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, search, hasMore, setResumes, setIsLoading, isLoading]);

  useEffect(() => {
    if (page === 1) {
      loadResumesData();
    }
  }, [loadResumesData]);

  return (
    <>
      <Search />

      <div>
        <h3 className="a11y-hidden">이력서 목록</h3>
        <ul className={resumeList}>
          {resumes.map((resumeItem) => (
            <ResumeItem
              resume={resumeItem}
              key={`${resumeItem.resume_id}-${resumeItem.title}`}
            />
          ))}
        </ul>
        {isLoading && <div>불러오는 중...</div>}

        {!isLoading && resumes.length === 0 && (
          <div>등록된 이력서가 없습니다.</div>
        )}
        {hasMore ? (
          <div style={{ marginTop: "1rem" }}>
            <Button
              text="더보기"
              color="blue"
              widthStyle="full"
              callback={() => {
                loadResumesData();
              }}
            />
          </div>
        ) : (
          resumes.length > 0 && (
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              더 이상 불러올 이력서가 없습니다.
            </div>
          )
        )}
      </div>
    </>
  );
}
