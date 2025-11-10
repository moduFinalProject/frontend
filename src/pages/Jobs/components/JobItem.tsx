import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/index.ts";
import {
  jobItem,
  title,
  titleRow,
  btns,
  dropdownStyle,
} from "./JobItem.css.ts";

interface JobItemProps {
  job: JobListItem;
}

export default function JobItem({ job }: JobItemProps) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  function toggleDropdown() {
    setDropdown((prev) => !prev);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <li className={jobItem}>
      <header className={title}>
        <div>
          <div
            className={titleRow}
            onClick={() => {
              navigate(`./${job.id}`);
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
        <div ref={dropdownRef}>
          <Button
            text=""
            color="none"
            widthStyle="fit"
            icon="MORE"
            callback={() => {
              toggleDropdown();
            }}
          />
          {dropdown && (
            <div className={dropdownStyle}>
              <Button
                color="none"
                text="삭제"
                widthStyle="full"
                callback={() => {
                  console.log("삭제하기");
                  setDropdown(false);
                }}
              />
            </div>
          )}
        </div>
      </header>

      <footer className={btns}>
        <Button
          text="상세보기"
          color="white"
          widthStyle="full"
          callback={() => {
            navigate(`./${job.id}`);
          }}
        />

        {job.url && (
          <Button
            text="지원하기"
            color="blue"
            icon="LINK_BLACK"
            widthStyle="full"
            callback={() => {
              window.open(job.url, "_blank", "noopener,noreferrer");
            }}
          />
        )}
      </footer>
    </li>
  );
}
