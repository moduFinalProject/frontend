import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import JobCard from "./components/card/JobCard";
import JobCardRow from "./components/card/JobCardRow";
import { cardSectionList } from "./JobDetail.css.ts";
import { container, innerContainer } from "./index.css.ts";
import { fetchJobDetail, type JobDetailData } from "./api.ts";

const EMPTY_MESSAGE = "등록된 내용이 없습니다.";

export default function JobDetail() {
  const { id } = useParams();
  const {
    data: jobData,
    isPending,
    isError,
    error,
  } = useQuery<JobDetailData>({
    queryKey: ["job-detail", id],
    queryFn: () => fetchJobDetail(id!),
    enabled: Boolean(id),
  });

  if (isPending) {
    return (
      <main className={`${container} ${cardSectionList}`} aria-busy="true">
        <p>채용공고를 불러오는 중입니다...</p>
      </main>
    );
  }

  if (!id) {
    return (
      <main className={`${container} ${cardSectionList}`}>
        <p>채용공고 ID가 올바르지 않습니다.</p>
      </main>
    );
  }

  if (isError || !jobData) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "채용공고 정보를 확인할 수 없습니다.";

    return (
      <main className={`${container} ${cardSectionList}`}>
        <p>{errorMessage}</p>
      </main>
    );
  }

  return (
    <main className={`${container} ${innerContainer} ${cardSectionList}`}>
      <JobCard title="기본 정보">
        <JobCardRow
          label="채용 제목"
          value={jobData.title || EMPTY_MESSAGE}
          widthType="half"
        />
        <JobCardRow
          label="회사명"
          value={jobData.company || EMPTY_MESSAGE}
          widthType="half"
        />
      </JobCard>

      <JobCard title="내용 요약">
        <JobCardRow desc={jobData.content || EMPTY_MESSAGE} widthType="full" />
      </JobCard>

      <JobCard title="자격 요건">
        {jobData.qualification ? (
          <JobCardRow desc={jobData.qualification} widthType="full" isPreWrap />
        ) : (
          <JobCardRow value={EMPTY_MESSAGE} widthType="full" />
        )}
      </JobCard>

      <JobCard title="우대 사항">
        {jobData.prefer ? (
          <JobCardRow desc={jobData.prefer} widthType="full" isPreWrap />
        ) : (
          <JobCardRow value={EMPTY_MESSAGE} widthType="full" />
        )}
      </JobCard>

      <JobCard title="메모">
        <JobCardRow desc={jobData.memo || EMPTY_MESSAGE} widthType="full" />
      </JobCard>
    </main>
  );
}
