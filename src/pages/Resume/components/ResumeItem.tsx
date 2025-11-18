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
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { delResume } from "@/services/resumes.ts";
import { useResumeListContext, type Resume } from "../ResumeListContext.tsx";
import { toast } from "react-toastify";
import { fetchWithAuth } from "@/services/api";

interface ResumeItemProps {
  resume: Resume;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const { setResumes }: { setResumes: (arg0: Resume[]) => void } =
    useResumeListContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
            {resume.resume_type === "2" && (
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
        {resume.resume_type === "2" && (
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
          callback={async () => {
            try {

              if(!confirm("이력서를 첨삭하시겠습니까?")) return;
              
              setIsLoading(true);

              // API 호출: POST /resume_feedbacks/stantard/{resume_id}
              const response = await fetchWithAuth(
                `/resume_feedbacks/stantard/${resume.resume_id}`,
                {
                  method: "POST",
                }
              );

              if (!response.ok) {
                const data = await response.json();
                throw new Error(data.detail || "첨삭 신청에 실패했습니다.");
              }

              const feedback = await response.json();

              // ResumeCorrection 페이지로 이동 (데이터와 함께 전달)
              navigate(`/resume/${resume.resume_id}/correction`, {
                state: { feedbackData: feedback }
              });
            } catch (error) {
              const errorMessage = error instanceof Error ? error.message : "첨삭 신청 중 오류가 발생했습니다.";
              console.error("Feedback submission error:", error);
              alert(errorMessage);
            } finally {
              setIsLoading(false);
            }
          }}
          widthStyle="full"
        />

        {resume.resume_type === "2" && (
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
