import { useEffect, useMemo, useRef } from "react";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { OptionsDropdown } from "@/components";
import {
  getResumeFeedbackList,
  deleteResumeFeedback,
  type ResumeFeedback,
  getMatchingLevel,
  type MatchingLevel,
} from "@/services/resumeFeedback.ts";

import matchingHighIcon from "@/assets/icons/Icon-high.svg";
import matchingMidIcon from "@/assets/icons/Icon-meddle.svg";
import matchingLowIcon from "@/assets/icons/Icon-row.svg";

import {
  controls,
  listSection,
  jobList,
  card,
  cardVariant,
  cardTop,
  companyBlock,
  companyRow,
  detailList,
  detailItem,
  optionsButton,
  optionsButtonContainer,
  cardFooter,
  matchingGroup,
  matchingBadgeBase,
  matchingBadge,
  matchingLabel,
  emptyState,
} from "./ResumeFeedbackList.css.ts";

const matchingIcons: Record<MatchingLevel, string> = {
  warning: matchingLowIcon,
  info: matchingMidIcon,
  success: matchingHighIcon,
};

export default function ResumeFeedbackList() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    queryKey: ["resume-feedback-list"],
    initialPageParam: 1,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      getResumeFeedbackList(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  const feedbackList = useMemo(
    () =>
      data?.pages ? data.pages.flatMap((page: ResumeFeedback[]) => page) : [],
    [data]
  );

  const deleteMutation = useMutation({
    mutationFn: deleteResumeFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume-feedback-list"] });
      toast.success("삭제되었습니다.", {
        className: "custom-success-toast",
      });
    },
    onError: (error) => {
      const message =
        error instanceof Error ? error.message : "삭제에 실패했습니다.";
      toast.error(message, {
        className: "custom-error-toast",
      });
    },
  });

  const handleDelete = (feedbackId: number) => {
    if (confirm("삭제하시겠습니까?")) {
      deleteMutation.mutate(feedbackId);
    }
  };

  const handleCardClick = (feedbackId: number) => {
    navigate(`/resumeFeedback/${feedbackId}`);
  };

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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const renderContent = () => {
    if (status === "pending") {
      return (
        <p
          className={emptyState}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          첨삭 이력을 불러오는 중입니다...
        </p>
      );
    }

    if (status === "error") {
      const message =
        error instanceof Error
          ? error.message
          : "첨삭 이력을 불러오지 못했습니다.";
      return (
        <p
          className={emptyState}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          {message}
        </p>
      );
    }

    if (feedbackList.length === 0) {
      return (
        <p
          className={emptyState}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          아직 등록된 첨삭 이력이 없습니다.
        </p>
      );
    }

    return (
      <>
        <ul className={jobList} aria-live="polite" aria-atomic="false">
          {feedbackList.map((job: ResumeFeedback) => {
            const matchingLevel = getMatchingLevel(job.matching_rate);

            return (
              <li key={job.feedback_id}>
                <article
                  className={`${card} ${cardVariant.default}`}
                  onClick={() => handleCardClick(job.feedback_id)}
                  style={{ cursor: "pointer" }}
                >
                  <header className={cardTop}>
                    <div className={companyBlock}>
                      <div className={companyRow}>
                        <h3 id={`resume-feedback-${job.feedback_id}-title`}>
                          {job.company}
                        </h3>
                      </div>
                      <dl className={detailList}>
                        <div className={detailItem}>
                          <dt>기준 이력서:</dt>
                          <dd>{job.resume_title}</dd>
                        </div>
                        <div className={detailItem}>
                          <dt>개선사항</dt>
                          <dd>{job.content_count}개</dd>
                        </div>
                      </dl>
                    </div>

                    <div onClick={(e) => e.stopPropagation()}>
                      <OptionsDropdown
                        ariaLabel={`${job.company} 옵션 보기`}
                        triggerClassName={optionsButton}
                        itemWidthStyle="fit"
                        containerClassName={optionsButtonContainer}
                        items={[
                          {
                            label: "삭제",
                            onSelect: () => {
                              handleDelete(job.feedback_id);
                            },
                          },
                        ]}
                      />
                    </div>
                  </header>

                  <footer className={cardFooter}>
                    <div className={matchingGroup}>
                      <span
                        className={`${matchingBadgeBase} ${matchingBadge[matchingLevel]}`}
                        aria-label={`매칭률 ${job.matching_rate}%`}
                      >
                        <img
                          src={matchingIcons[matchingLevel]}
                          alt=""
                          aria-hidden="true"
                        />
                        {job.matching_rate}%
                      </span>
                      <span className={matchingLabel} aria-hidden="true">
                        매칭률
                      </span>
                    </div>
                  </footer>
                </article>
              </li>
            );
          })}
        </ul>
        <div
          ref={loadMoreRef}
          aria-live="polite"
          aria-atomic="true"
          style={{ height: "1px" }}
        />
        {isFetchingNextPage && (
          <p
            className={emptyState}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            추가 첨삭 이력을 불러오는 중입니다...
          </p>
        )}
        {!hasNextPage && feedbackList.length >= PAGE_SIZE && (
          <p
            className={emptyState}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            마지막 첨삭 이력까지 모두 확인하셨습니다.
          </p>
        )}
      </>
    );
  };

  return (
    <>
      <section
        className={controls}
        aria-labelledby="resume-feedback-controls-heading"
      >
        <h2 id="resume-feedback-controls-heading" className="a11y-hidden">
          첨삭 이력
        </h2>
      </section>

      <section
        className={listSection}
        aria-labelledby="resume-feedback-list-heading"
      >
        <h2 id="resume-feedback-list-heading" className="a11y-hidden">
          공고별 첨삭 이력 목록
        </h2>

        {renderContent()}
      </section>
    </>
  );
}
