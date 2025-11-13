import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button, OptionsDropdown } from "@/components/index.ts";
import {
  jobItem,
  title,
  titleRow,
  btns,
  dropdownTrigger,
} from "./JobItem.css.ts";
import { deleteJobPosting, type JobListItem } from "../api.ts";

interface JobItemProps {
  job: JobListItem;
}

export default function JobItem({ job }: JobItemProps) {
  const navigate = useNavigate();

  const dropdownItems = useMemo(
    () => [
      {
        label: "삭제",
        onSelect: () => {
          deleteJobPosting(job.posting_id);
        },
      },
    ],
    []
  );

  return (
    <li className={jobItem}>
      <header className={title}>
        <div>
          <div
            className={titleRow}
            onClick={() => {
              navigate(`./${job.posting_id}`);
            }}
          >
            <h4>{job.title}</h4>
            {job.url && (
              <div
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Button
                  text="공고 보기"
                  color="white"
                  widthStyle="fit"
                  icon="LINK_BLACK"
                  callback={() => {
                    window.open(job.url!, "_blank", "noopener,noreferrer");
                  }}
                />
              </div>
            )}
          </div>
          <p>{job.company}</p>
        </div>
        <OptionsDropdown
          ariaLabel={`${job.title} 옵션`}
          items={dropdownItems}
          itemWidthStyle="fit"
          triggerClassName={dropdownTrigger}
        />
      </header>

      <footer className={btns}>
        <Button
          text="상세보기"
          color="white"
          widthStyle="full"
          callback={() => {
            navigate(`./${job.posting_id}`);
          }}
        />

        {job.url && (
          <Button
            text="지원하기"
            color="blue"
            icon="LINK_BLACK"
            widthStyle="full"
            callback={() => {
              window.open(job.url!, "_blank", "noopener,noreferrer");
            }}
          />
        )}
      </footer>
    </li>
  );
}
