import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components";
import { headerText, subPage, btnsWrap, prevWrap } from "./JobTitle.css.ts";
import { fetchJobDetail } from "../api";

interface JobProps {
  mode: "list" | "view" | "create" | "edit";
  title: string;
  desc: string;
  jobId?: string;
}

export default function JobTitle({ mode, title, desc, jobId }: JobProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobUrl, setJobUrl] = useState<string | null>(null);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const currentJobId = jobId ?? id ?? "";

  let titleText = title;
  if (mode === "view") titleText += " 상세";
  else if (mode === "create") titleText += " 등록";
  else if (mode === "edit") titleText += " 수정";

  function handleSubmit() {
    if (mode === "create") {
      console.log("새 채용공고 등록");
    } else {
      console.log("채용공고 수정");
    }
  }

  useEffect(() => {
    if (mode !== "view" || !currentJobId) {
      setJobUrl(null);
      return;
    }

    setIsFetchingUrl(true);
    fetchJobDetail(currentJobId)
      .then((detail) => {
        setJobUrl(detail.url ?? null);
      })
      .catch(() => {
        setJobUrl(null);
      })
      .finally(() => {
        setIsFetchingUrl(false);
      });
  }, [currentJobId, mode]);

  return (
    <>
      <div className={prevWrap}>
        {mode !== "list" && (
          <Button
            text=""
            color="gray"
            widthStyle="fit"
            icon="PREV"
            callback={() => {
              navigate("/jobs");
            }}
          />
        )}
        <div className={`${headerText} ${mode !== "list" && subPage}`}>
          <h2 className={mode !== "list" ? "a11y-hidden" : ""}>{titleText}</h2>
          {mode !== "list" && <p className="title">프론트엔드 개발자</p>}
          <p className="desc">{desc}</p>
        </div>
      </div>

      <div className={btnsWrap}>
        {mode === "list" && (
          <Button
            text="새 채용공고 등록"
            color="blue"
            widthStyle="fit"
            icon="PLUS"
            callback={() => {
              navigate("./new");
            }}
          />
        )}
        {(mode === "create" || mode === "edit") && (
          <>
            <Button
              text="취소"
              color="white"
              widthStyle="fit"
              callback={() => {
                if (mode === "edit" && currentJobId) {
                  navigate(`/jobs/${currentJobId}`);
                  return;
                }
                navigate("/jobs");
              }}
            />
            <Button
              text="저장하기"
              color="blue"
              widthStyle="fit"
              buttonType="submit"
              form="jobForm"
              callback={() => {
                handleSubmit();
              }}
            />
          </>
        )}
        {mode === "view" && (
          <>
            <Button
              text="공고보기"
              color="white"
              widthStyle="fit"
              callback={() => {
                if (jobUrl) {
                  window.open(jobUrl, "_blank", "noopener,noreferrer");
                } else if (!isFetchingUrl) {
                  alert("공고 URL을 확인할 수 없습니다.");
                }
              }}
            />
            <Button
              text="수정하기"
              color="blue"
              widthStyle="fit"
              callback={() => {
                if (!currentJobId) return;
                navigate(`/jobs/${currentJobId}/edit`);
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
