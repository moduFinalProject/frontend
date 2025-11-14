import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  const [searchValue, setSearchValue] = useState("");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const PAGE_SIZE = 6;

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["job-list", searchValue],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAllJobPostings(pageParam, PAGE_SIZE, searchValue),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) {
        return undefined;
      }

      return allPages.length + 1;
    },
  });

  const jobs = useMemo(
    () => (data?.pages ? data.pages.flatMap((page) => page) : []),
    [data]
  );

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, searchValue]);

  const renderContent = () => {
    if (status === "pending") {
      return <div>채용공고를 불러오는 중입니다...</div>;
    }

    if (status === "error") {
      const message =
        error instanceof Error
          ? error.message
          : "채용공고를 불러오지 못했습니다.";
      return <div>{message}</div>;
    }

    if (jobs.length === 0) {
      return <div>등록된 채용공고가 없습니다.</div>;
    }

    return (
      <>
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
        <div ref={loadMoreRef} aria-hidden="true" />
        {isFetchingNextPage && <div>추가 공고를 불러오는 중입니다...</div>}
        {!hasNextPage && jobs.length > 0 && (
          <div>마지막 채용공고까지 모두 확인하셨습니다.</div>
        )}
      </>
    );
  };

  return (
    <section className={listSection} aria-labelledby="job-list-heading">
      <header>
        <Search
          isModal={isModal}
          onSearch={(keyword) => {
            setSearchValue(keyword);
          }}
        />
      </header>

      <h2 id="job-list-heading" className="a11y-hidden">
        채용공고 목록
      </h2>
      {renderContent()}
    </section>
  );
}
