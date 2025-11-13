import { useQuery } from "@tanstack/react-query";
import { jobList, jobListModal, listSection } from "./JobList.css.ts";
import JobItem from "./components/JobItem.tsx";
import Search from "./components/form/Search.tsx";

import { getAllJobPostings, type JobPosting } from "@/services/api.ts";

const MOCK_JOBS: JobPosting[] = [
  {
    posting_id: 1,
    title: "React 개발자",
    company: "테크 스타트업 A",
    content: "React와 TypeScript를 사용한 웹 개발",
    qualification: "3년 이상 경력",
    prefer: "TypeScript, React Query 경험자",
    url: "https://example.com/job1",
    memo: "야근 적음",
    end_date: "2025-12-31",
    user_id: 1,
    created_at: "2025-11-01T10:00:00Z",
    updated_at: "2025-11-01T10:00:00Z",
  },
  {
    posting_id: 2,
    title: "백엔드 엔지니어",
    company: "웹 서비스 회사 B",
    content: "Node.js와 MongoDB를 사용한 API 개발",
    qualification: "2년 이상 경력",
    prefer: "Express.js, REST API 경험자",
    url: "https://example.com/job2",
    memo: null,
    end_date: "2025-11-30",
    user_id: 2,
    created_at: "2025-11-02T14:30:00Z",
    updated_at: "2025-11-02T14:30:00Z",
  },
  {
    posting_id: 3,
    title: "풀스택 개발자",
    company: "핀테크 회사 C",
    content: "React와 Spring Boot를 사용한 금융 서비스 개발",
    qualification: "4년 이상 경력",
    prefer: "보안 관심, 금융 도메인 경험",
    url: "https://example.com/job3",
    memo: "연봉 상향",
    end_date: "2025-12-15",
    user_id: 3,
    created_at: "2025-11-03T09:15:00Z",
    updated_at: "2025-11-03T09:15:00Z",
  },
];

interface JobListProps {
  isModal?: boolean;
  onSelect?: (job: JobPosting) => void;
}

export default function JobList({ isModal = false, onSelect }: JobListProps = {}) {
  
  const {
    data: jobs = [],
    isPending,
    isError,
    error,
  } = useQuery<JobPosting[]>({
    queryKey: ["job-list"],
    queryFn: getAllJobPostings,
    enabled: false,
  });

  if (isPending) {
    return (
      <>
        <Search isModal={isModal} />
        <div>채용공고를 불러오는 중입니다...</div>
      </>
    );
  }

  if (isError) {
    const message =
      error instanceof Error
        ? error.message
        : "채용공고를 불러오지 못했습니다.";
    return (
      <>
        <Search isModal={isModal} />
        <div>{message}</div>
      </>
    );
  }

  return (
    <section className={listSection} aria-labelledby="job-list-heading">
      <header>
        <Search isModal={isModal} />
      </header>

      <div>
        <h2 id="job-list-heading" className="a11y-hidden">
          채용공고 목록
        </h2>
        <ul className={isModal ? jobListModal : jobList}>
          {/* {jobs.map((job) => ( */}
          {MOCK_JOBS.map((job) => (
            <JobItem job={job} key={job.posting_id} isModal={isModal} onSelect={onSelect} />
          ))}
        </ul>
      </div>
    </section>
  );
}
