import { useQuery } from "@tanstack/react-query";
import { jobList, jobListModal, listSection } from "./JobList.css.ts";
import JobItem from "./components/JobItem.tsx";
import Search from "./components/form/Search.tsx";

import { getAllJobPostings, type JobPosting } from "@/services/api.ts";

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
          {jobs.map((job) => (
            <JobItem job={job} key={job.posting_id} isModal={isModal} onSelect={onSelect} />
          ))}
        </ul>
      </div>
    </section>
  );
}
