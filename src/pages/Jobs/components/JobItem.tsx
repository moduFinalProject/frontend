import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { Button, OptionsDropdown } from "@/components/index.ts";
import {
  jobItem,
  jobItemModal,
  title,
  titleRow,
  btns,
  btnsModal,
  dropdownTrigger,
} from "./JobItem.css.ts";
import { deleteJobPosting, type JobListItem } from "../api.ts";
import type { JobPosting } from "@/services/jobs";

interface JobItemProps {
  job: JobListItem;
  isModal?: boolean;
  onSelect?: (job: JobPosting) => void;
}

export default function JobItem({
  job,
  isModal = false,
  onSelect,
}: JobItemProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: mutateDelete } = useMutation({
    mutationFn: (postingId: number) => deleteJobPosting(postingId),
    onSuccess: async () => {
      toast.success("채용공고가 삭제되었습니다.");
      await queryClient.invalidateQueries({
        queryKey: ["job-list"],
      });
    },
    onError: (error) => {
      const message =
        error instanceof Error
          ? error.message
          : "채용공고 삭제에 실패했습니다.";
      toast.error(message);
    },
  });

  const handleDelete = useCallback(() => {
    mutateDelete(job.posting_id);
  }, [mutateDelete, job.posting_id]);

  const dropdownItems = useMemo(
    () => [
      {
        label: "삭제",
        onSelect: handleDelete,
      },
    ],
    [handleDelete]
  );

  const handleSelect = () => {
    if (isModal && onSelect) {
      onSelect(job);
    }
  };

  return (
    <li
      className={isModal ? jobItemModal : jobItem}
      onClick={isModal ? handleSelect : undefined}
    >
      <header className={title}>
        <div>
          <div
            className={titleRow}
            onClick={() => {
              if (!isModal) {
                navigate(`./${job.posting_id}`);
              }
            }}
          >
            <h4>{job.title}</h4>
          </div>
          <p>{job.company}</p>
        </div>
        {!isModal && (
          <OptionsDropdown
            ariaLabel={`${job.title} 옵션`}
            items={dropdownItems}
            itemWidthStyle="fit"
            triggerClassName={dropdownTrigger}
          />
        )}
      </header>

      <footer className={isModal ? btnsModal : btns}>
        {!isModal && (
          <Button
            text="상세보기"
            color="white"
            widthStyle="full"
            callback={() => {
              navigate(`./${job.posting_id}`);
            }}
          />
        )}

        {!isModal && job.url && (
          <Button
            text="지원하기"
            color="blue"
            icon="LINK_WHITE"
            widthStyle="full"
            callback={() => {
              window.open(job.url!, "_blank", "noopener,noreferrer");
            }}
          />
        )}
        {isModal && job.url && (
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Button
              text=""
              color="none"
              widthStyle="fit"
              icon="LINK_BLACK"
              callback={() => {
                window.open(job.url!, "_blank", "noopener,noreferrer");
              }}
            />
          </div>
        )}
      </footer>
    </li>
  );
}
