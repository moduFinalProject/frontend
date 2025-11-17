import { Button, OptionsDropdown } from "@/components/index.ts";
import {
  resumeItem,
  title,
  titleRow,
  desc,
  btns,
  descTitle,
  dropdownTrigger,
  noDrag,
} from "./ResumeItem.css.ts";
import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { delResume } from "@/services/resumes.ts";
import { useResumeContext, type Resume } from "../ResumeContext.tsx";
import { toast } from "react-toastify";

interface ResumeItemProps {
  resume: Resume;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const { setResumes }: { setResumes: (arg0: Resume[]) => void } =
    useResumeContext();
  const navigate = useNavigate();

  const dropdownItems = useMemo(
    () => [
      {
        label: "수정",
        onSelect: () => {
          navigate(`./${resume.resume_id}/edit`);
        },
      },
      {
        label: "삭제",
        onSelect: async () => {
          // TODO: 삭제 기능 구현 필요
          if (confirm("삭제하시겠습니까?")) {
            await delResume(resume.resume_id);

            toast.success("삭제되었습니다.", {
              className: "custom-success-toast",
            });

            setResumes((prev) =>
              prev.filter((item) => item.resume_id !== resume.resume_id)
            );
          }
        },
      },
    ],
    [navigate, resume.resume_id]
  );

  const date = resume.created_at?.slice(0, 10);

  return (
    <li className={resumeItem}>
      <div className={title}>
        <div>
          <div className={titleRow}>
            <Link to={`./${resume.resume_id}`}>
              <h4>{resume.title}</h4>
            </Link>
            {resume.resume_type === 2 && (
              <span className={noDrag}>공고맞춤</span>
            )}
          </div>
          <p>{resume.resume_type_detail}</p>
        </div>
        <OptionsDropdown
          ariaLabel={`${resume.title} 옵션`}
          items={dropdownItems}
          triggerClassName={dropdownTrigger}
          itemWidthStyle="fit"
        />
      </div>
      <div className={desc}>
        <div>
          <p className={descTitle}>작성일</p>
          <p>{date}</p>
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
            navigate(`./${resume.resume_id}/correction`);
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
