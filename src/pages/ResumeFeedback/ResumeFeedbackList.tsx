import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { OptionsDropdown } from "@/components";
import Search from "./components/form/Search.tsx";

import matchingHighIcon from "@/assets/icons/Icon-high.svg";
import matchingMidIcon from "@/assets/icons/Icon-meddle.svg";
import matchingLowIcon from "@/assets/icons/Icon-row.svg";

import {
  controls,
  filterGroup,
  filterButton,
  filterButtonActive,
  listSection,
  jobList,
  card,
  cardVariant,
  cardTop,
  companyBlock,
  companyRow,
  jobBadge,
  detailList,
  detailItem,
  optionsButton,
  optionsButtonContainer,
  cardFooter,
  matchingGroup,
  matchingBadgeBase,
  matchingBadge,
  matchingLabel,
  dateText,
  emptyState,
} from "./ResumeFeedbackList.css.ts";
import { Link } from "react-router-dom";

type SortOrder = "latest" | "matching";
type MatchingLevel = "warning" | "info" | "success";

type JobFeedback = {
  id: string;
  company: string;
  jobTitle: string;
  resumeName: string;
  improvementCount: number;
  matchingRate: number;
  matchingLevel: MatchingLevel;
  updatedAt: string; // ISO 8601
  isHighlighted?: boolean;
};

const matchingIcons: Record<MatchingLevel, string> = {
  warning: matchingLowIcon,
  info: matchingMidIcon,
  success: matchingHighIcon,
};

const MOCK_FEEDBACK_LIST: JobFeedback[] = [
  {
    id: "job-1",
    company: "네이버",
    jobTitle: "프론트엔드 개발자",
    resumeName: "기본 이력서",
    improvementCount: 5,
    matchingRate: 68,
    matchingLevel: "warning",
    updatedAt: "2025-10-28",
    isHighlighted: true,
  },
  {
    id: "job-2",
    company: "네이버",
    jobTitle: "프론트엔드 개발자",
    resumeName: "네이버 지원용",
    improvementCount: 5,
    matchingRate: 78,
    matchingLevel: "info",
    updatedAt: "2025-10-27",
  },
  {
    id: "job-3",
    company: "라인",
    jobTitle: "프론트엔드 개발자",
    resumeName: "라인 지원용",
    improvementCount: 5,
    matchingRate: 85,
    matchingLevel: "success",
    updatedAt: "2025-10-26",
  },
];

function formatDisplayDate(date: string) {
  return date.replace(/-/g, ".");
}

export default function ResumeFeedback() {
  const [searchValue, setSearchValue] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("latest");

  const filteredJobs = useMemo(() => {
    const normalized = searchValue.trim().toLowerCase();

    const filtered = MOCK_FEEDBACK_LIST.filter((job) => {
      if (!normalized) return true;
      return (
        job.company.toLowerCase().includes(normalized) ||
        job.jobTitle.toLowerCase().includes(normalized)
      );
    });

    return [...filtered].sort((a, b) => {
      if (a.isHighlighted && !b.isHighlighted) return -1;
      if (!a.isHighlighted && b.isHighlighted) return 1;

      if (sortOrder === "matching") {
        return b.matchingRate - a.matchingRate;
      }

      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [searchValue, sortOrder]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <section
        className={controls}
        aria-labelledby="resume-feedback-controls-heading"
      >
        <h2 id="resume-feedback-controls-heading" className="a11y-hidden">
          첨삭 이력 검색 및 정렬
        </h2>

        <Search />

        <fieldset className={filterGroup} aria-label="정렬 기준">
          <legend className="a11y-hidden">정렬 기준</legend>
          <button
            type="button"
            className={`${filterButton} ${
              sortOrder === "latest" ? filterButtonActive : ""
            }`}
            onClick={() => setSortOrder("latest")}
            aria-pressed={sortOrder === "latest"}
          >
            최신순
          </button>
          <button
            type="button"
            className={`${filterButton} ${
              sortOrder === "matching" ? filterButtonActive : ""
            }`}
            onClick={() => setSortOrder("matching")}
            aria-pressed={sortOrder === "matching"}
          >
            매칭률순
          </button>
        </fieldset>
      </section>

      <section
        className={listSection}
        aria-labelledby="resume-feedback-list-heading"
      >
        <h2 id="resume-feedback-list-heading" className="a11y-hidden">
          공고별 첨삭 이력 목록
        </h2>

        {filteredJobs.length === 0 ? (
          <p
            className={emptyState}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            아직 등록된 첨삭 이력이 없습니다.
          </p>
        ) : (
          <ul className={jobList} aria-live="polite" aria-atomic="false">
            {filteredJobs.map((job) => {
              return (
                <li key={job.id}>
                  <article
                    className={`${card} ${cardVariant.default}`}
                    aria-labelledby={`resume-feedback-${job.id}-title`}
                  >
                    <header className={cardTop}>
                      <div className={companyBlock}>
                        <div className={companyRow}>
                          <Link to={`./${job.id}`}>
                            <h3 id={`resume-feedback-${job.id}-title`}>
                              {job.company}
                            </h3>
                          </Link>
                          <span className={jobBadge}>{job.jobTitle}</span>
                        </div>
                        <dl className={detailList}>
                          <div className={detailItem}>
                            <dt>기준 이력서:</dt>
                            <dd>{job.resumeName}</dd>
                          </div>
                          <div className={detailItem}>
                            <dt>개선사항</dt>
                            <dd>{job.improvementCount}개</dd>
                          </div>
                        </dl>
                      </div>

                      <OptionsDropdown
                        ariaLabel={`${job.company} 옵션 보기`}
                        triggerClassName={optionsButton}
                        itemWidthStyle="fit"
                        containerClassName={optionsButtonContainer}
                        items={[
                          {
                            label: "삭제",
                            onSelect: () => {
                              // TODO: 첨삭 이력 삭제 기능 연동
                            },
                          },
                        ]}
                      />
                    </header>

                    <footer className={cardFooter}>
                      <div className={matchingGroup}>
                        <span
                          className={`${matchingBadgeBase} ${
                            matchingBadge[job.matchingLevel]
                          }`}
                          aria-label={`매칭률 ${job.matchingRate}%`}
                        >
                          <img
                            src={matchingIcons[job.matchingLevel]}
                            alt=""
                            aria-hidden="true"
                          />
                          {job.matchingRate}%
                        </span>
                        <span className={matchingLabel} aria-hidden="true">
                          매칭률
                        </span>
                      </div>

                      <time
                        className={dateText}
                        dateTime={job.updatedAt}
                        aria-label={`업데이트 날짜 ${formatDisplayDate(
                          job.updatedAt
                        )}`}
                      >
                        {formatDisplayDate(job.updatedAt)}
                      </time>
                    </footer>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}
