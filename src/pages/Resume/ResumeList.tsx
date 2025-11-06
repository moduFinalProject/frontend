import { useEffect, useState } from "react";
import { resumeList } from "./ResumeList.css.ts";
import ResumeItem from "./components/ResumeItem.tsx";

type Resume = {
  id: string;
  name: string;
  desc: string;
  date: string;
  url?: string;
};

export default function ResumeList() {
  const [resumes, setResumes] = useState<Resume[]>([]);

  useEffect(() => {
    setResumes([
      {
        id: "1",
        name: "기본 이력서",
        desc: "포괄적인 기본 이력서",
        date: "2025.10.28",
      },
      {
        id: "2",
        name: "네이버 이력서",
        desc: "기본 이력서 첨삭",
        date: "2025.10.28",
        url: "https://career.example.com/job/123456",
      },
      {
        id: "3",
        name: "쿠팡 이력서",
        desc: "기본 이력서 첨삭",
        date: "2025.10.28",
        url: "https://career.example.com/job/123456",
      },
      {
        id: "4",
        name: "카카오 이력서",
        desc: "기본 이력서 첨삭",
        date: "2025.10.30",
        url: "https://career.example.com/job/123456",
      },
      {
        id: "5",
        name: "라인 이력서",
        desc: "카카오 이력서 첨삭",
        date: "2025.10.30",
        url: "https://career.example.com/job/123456",
      },
      {
        id: "6",
        name: "배민 이력서",
        desc: "카카오 이력서 첨삭",
        date: "2025.10.31",
        url: "https://career.example.com/job/123456",
      },
    ]);
  }, []);

  return (
    <div>
      <h3 className="a11y-hidden">이력서 목록</h3>
      <ul className={resumeList}>
        {resumes.map((resume) => (
          <ResumeItem resume={resume} key={resume.id} />
        ))}
      </ul>
    </div>
  );
}
