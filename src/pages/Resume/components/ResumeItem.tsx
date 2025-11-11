import { Button, OptionsDropdown } from "@/components/index.ts";
import {
  resumeItem,
  title,
  titleRow,
  desc,
  btns,
  descTitle,
  dropdownTrigger,
} from "./ResumeItem.css.ts";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

type Resume = {
  id: string;
  name: string;
  desc: string;
  date: string;
  url?: string;
  end_date?: string;
};

interface ResumeItemProps {
  resume: Resume;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const navigate = useNavigate();

  const dropdownItems = useMemo(
    () => [
      {
        label: "수정",
        onSelect: () => {
          navigate(`./${resume.id}/edit`);
        },
      },
      {
        label: "삭제",
        onSelect: () => {
          // TODO: 삭제 기능 구현 필요
        },
      },
    ],
    [navigate, resume.id]
  );

  return (
    <li className={resumeItem}>
      <div className={title}>
        <div>
          <div className={titleRow}>
            <Link to={`./${resume.id}`}>
              <h4>{resume.name}</h4>
            </Link>
            {resume.url && <span>공고맞춤</span>}
          </div>
          <p>{resume.desc}</p>
        </div>
        <OptionsDropdown
          ariaLabel={`${resume.name} 옵션`}
          items={dropdownItems}
          triggerClassName={dropdownTrigger}
          itemWidthStyle="fit"
        />
      </div>
      <div className={desc}>
        <div>
          <p className={descTitle}>최근 수정</p>
          <p>{resume.date}</p>
        </div>
        {resume.url && (
          <>
            <div>
              <p className={descTitle}>맞춤 공고</p>
              <span>1개</span>
            </div>
            <div>
              <p className={descTitle}>마감일</p>
              <p>~ {resume.end_date}</p>
            </div>
          </>
        )}
      </div>
      <div className={btns}>
        <Button
          text="첨삭"
          color="white"
          callback={() => {
            navigate(`./${resume.id}/correction`);
          }}
          widthStyle="full"
        />

        {resume.url && (
          <Button
            text="채용공고"
            color="blue"
            icon="LINK_WHITE"
            callback={() => {
              window.open(resume.url, "_blank", "noopener,noreferrer");
            }}
            widthStyle="full"
          />
        )}
      </div>
    </li>
  );
}
