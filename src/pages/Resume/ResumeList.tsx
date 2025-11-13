import { useEffect, useState } from "react";
import { resumeList } from "./ResumeList.css.ts";
import ResumeItem from "./components/ResumeItem.tsx";
import Search from "./components/form/Search.tsx";
import { fetchWithAuth } from "@/services/api.ts";

type Resume = {
  resume_id: string;
  name: string;
  desc: string;
  date: string;
  url?: string;
  end_date?: string;
};

async function getResumeList() {
  try {
    const response = await fetchWithAuth(`/resumes/?page=${1}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // 400, 500 등 다른 오류 발생 시
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("사용자 데이터:", data);
    console.log(data.length);
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
    // UI에 에러 메시지를 표시하거나 다른 처리를 할 수 있습니다.
  }
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    const loadResumesData = async () => {
      const data = await getResumeList();

      if (isMounted) {
        // ⭐️ 컴포넌트가 마운트된 상태에서만 상태 업데이트
        if (data) {
          // 데이터가 도착하면 상태를 업데이트
          setResumes(data);
        }
        // 데이터 유무와 관계없이 로딩 종료
        setIsLoading(false);
      }
    };

    loadResumesData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div>이력서 목록 로딩 중...</div>;
  }

  if (resumes.length === 0) {
    return <div>등록된 이력서가 없습니다.</div>;
  }

  return (
    <>
      <Search />
      <div>
        <h3 className="a11y-hidden">이력서 목록</h3>
        <ul className={resumeList}>
          {resumes.length > 0 ? (
            resumes.map((resumeItem) => {
              console.log(resumeItem);

              return (
                <ResumeItem resume={resumeItem} key={resumeItem.resume_id} />
              );
            })
          ) : (
            <li>이력서가 없습니다</li>
          )}
        </ul>
      </div>
    </>
  );
}
