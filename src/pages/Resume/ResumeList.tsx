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
    const response = await fetchWithAuth("/resumes/");

    if (!response.ok) {
      // 400, 500 등 다른 오류 발생 시
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    console.log("사용자 데이터:", data);
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
    // UI에 에러 메시지를 표시하거나 다른 처리를 할 수 있습니다.
  }
}

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    const listData = getResumeList();
    setResumes(listData);

    // setResumes([
    //   {
    //     resume_id: "1",
    //     name: "기본 이력서",
    //     desc: "포괄적인 기본 이력서",
    //     date: "2025.10.28",
    //   },
    //   {
    //     resume_id: "2",
    //     name: "네이버 이력서",
    //     desc: "기본 이력서 첨삭",
    //     date: "2025.10.28",
    //     url: "https://career.example.com/job/123456",
    //     end_date: "2025.11.31",
    //   },
    // ]);
  }, []);

  return (
    <>
      <Search />
      <div>
        <h3 className="a11y-hidden">이력서 목록</h3>
        <ul className={resumeList}>
          {resumes.length > 0 ? (
            resumes.map((resume) => (
              <ResumeItem resume={resume} key={resume.resume_id} />
            ))
          ) : (
            <li>이력서가 없습니다</li>
          )}
        </ul>
      </div>
    </>
  );
}
