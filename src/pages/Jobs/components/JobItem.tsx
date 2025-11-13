import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

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
import type { JobPosting } from "@/pages/Jobs/api.ts";

interface JobItemProps {
  job: JobPosting;
  isModal?: boolean;
  onSelect?: (job: JobPosting) => void;
}

export default function JobItem({ job, isModal = false, onSelect }: JobItemProps) {
  const navigate = useNavigate();

  const dropdownItems = useMemo(
    () => [
      {
        label: "삭제",
        onSelect: () => {
          console.log("삭제하기");
          // TODO: 삭제 로직 연결
        },
      },
    ],
    []
  );

  const handleSelect = () => {
    if (isModal && onSelect) {
      onSelect(job);
    }
  };

  return (
    <li className={isModal? jobItemModal:jobItem} onClick={isModal ? handleSelect : undefined}>
      <header className={title}>
        <div>
          <div
            className={titleRow}
            onClick={() => {
              navigate(`./${job.posting_id}`);
            }}
          >
            <h4>{job.title}</h4>
            {!isModal && job.url && (
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
        {!isModal && <OptionsDropdown
          ariaLabel={`${job.title} 옵션`}
          items={dropdownItems}
          itemWidthStyle="fit"
          triggerClassName={dropdownTrigger}
        />}
      </header>

      <footer className={isModal ? btnsModal:btns}>
        {!isModal && <Button
          text="상세보기"
          color="white"
          widthStyle="full"
          callback={() => {
            navigate(`./${job.posting_id}`);
          }}
        />}

        {!isModal && job.url && (
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
