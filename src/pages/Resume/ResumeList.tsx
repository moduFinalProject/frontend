import { useEffect, useState } from "react";
import { resumeList } from "./ResumeList.css.ts";
import ResumeItem from "./components/ResumeItem.tsx";
import Search from "./components/form/Search.tsx";
import { getResumeList } from "@/services/resumes.ts";
import { useResumeContext } from "./ResumeContext.tsx";

export default function ResumeList() {
  const { resumes, setResumes, isLoading, setIsLoading, page, setPage } =
    useResumeContext();

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    const loadResumesData = async () => {
      const data = await getResumeList(page);

      if (isMounted) {
        // 컴포넌트가 마운트된 상태에서만 상태 업데이트
        if (data) {
          setResumes(data);
        }
        setIsLoading(false);
        setPage((prev) => prev++);
      }
    };

    loadResumesData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Search />

      <div>
        <h3 className="a11y-hidden">이력서 목록</h3>
        <ul className={resumeList}>
          {isLoading ? (
            <div>이력서 목록 로딩 중...</div>
          ) : resumes.length > 0 ? (
            resumes.map((resumeItem) => {
              console.log(resumeItem);

              return (
                <ResumeItem resume={resumeItem} key={resumeItem.resume_id} />
              );
            })
          ) : (
            <li>등록된 이력서가 없습니다.</li>
          )}
        </ul>
      </div>
    </>
  );
}
