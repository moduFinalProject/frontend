import { useQuery } from "@tanstack/react-query";
import { jobList, jobListModal, listSection } from "./JobList.css.ts";
import JobItem from "./components/JobItem.tsx";
import Search from "./components/form/Search.tsx";
import { getAllJobPostings, type JobPosting } from "@/services/jobs.ts";

interface JobListProps {
  isModal?: boolean;
  onSelect?: (job: JobPosting) => void;
}

export default function JobList({
  isModal = false,
  onSelect,
}: JobListProps = {}) {
  const {
    data: jobs = [],
    isPending,
    isError,
  } = useQuery<JobPosting[]>({
    queryKey: ["job-list"],
    queryFn: getAllJobPostings,
  });

  const renderContent = () => {
    if (isPending) {
      return <div>채용공고를 불러오는 중입니다...</div>;
    }

    if (isError) {
      return <div>채용공고를 불러오지 못했습니다.</div>;
    }

    if (jobs.length === 0) {
      return <div>등록된 채용공고가 없습니다.</div>;
    }

    return (
      <ul className={isModal ? jobListModal : jobList}>
        {jobs.map((job) => (
          <JobItem
            job={job}
            key={job.posting_id}
            isModal={isModal}
            onSelect={onSelect}
          />
        ))}
      </ul>
    );
  };

  return (
    <section className={listSection} aria-labelledby="job-list-heading">
      <header>
        <Search isModal={isModal} />
      </header>

      <h2 id="job-list-heading" className="a11y-hidden">
        채용공고 목록
      </h2>
      {renderContent()}
    </section>
  );
}
