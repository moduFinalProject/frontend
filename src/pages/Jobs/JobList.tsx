import { useQuery } from "@tanstack/react-query";
import { jobList, listSection } from "./JobList.css.ts";
import JobItem from "./components/JobItem.tsx";
import Search from "./components/form/Search.tsx";
import { fetchJobList, type JobListItem } from "./api.ts";

export default function JobList() {
  const {
    data: jobs = [],
    isPending,
    isError,
    error,
  } = useQuery<JobListItem[]>({
    queryKey: ["job-list"],
    queryFn: fetchJobList,
  });

  if (isPending) {
    return (
      <>
        <Search />
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
        <Search />
        <div>{message}</div>
      </>
    );
  }

  return (
    <section className={listSection} aria-labelledby="job-list-heading">
      <header>
        <Search />
      </header>

      <div>
        <h2 id="job-list-heading" className="a11y-hidden">
          채용공고 목록
        </h2>
        <ul className={jobList}>
          {jobs.map((job) => (
            <JobItem job={job} key={job.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
