import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components";
import {
  headerText,
  subPage,
  btnsWrap,
  prevWrap,
} from "./FeedbackTitle.css.ts";
// import { fetchFeedbackDetail } from "../api";

interface FeedbackProps {
  mode: "list" | "view" | "create" | "edit";
  title: string;
  desc: string;
  feedbackId?: string;
}

export default function FeedbackTitle({
  mode,
  title,
  desc,
  feedbackId,
}: FeedbackProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobUrl, setFeedbackUrl] = useState<string | null>(null);
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const currentFeedbackId = feedbackId ?? id ?? "";

  let titleText = (title += " 이력");
  if (mode === "view") titleText += " 상세";
  else if (mode === "create") titleText += " 등록";
  else if (mode === "edit") titleText += " 수정";

  function handleSubmit() {
    if (mode === "create") {
      console.log("새 채용 공고별 첨삭 등록");
    }
  }

  useEffect(() => {
    if (mode !== "view" || !currentFeedbackId) {
      setFeedbackUrl(null);
      return;
    }

    setIsFetchingUrl(true);
    // fetchFeedbackDetail(currentFeedbackId)
    //   .then((detail) => {
    //     setFeedbackUrl(detail.url ?? null);
    //   })
    //   .catch(() => {
    //     setFeedbackUrl(null);
    //   })
    //   .finally(() => {
    //     setIsFetchingUrl(false);
    //   });
  }, [currentFeedbackId, mode]);

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
              navigate(-1);
            }}
          />
        )}
        <div className={`${headerText} ${mode !== "list" && subPage}`}>
          <h2 className={mode !== "list" ? "a11y-hidden" : ""}>{titleText}</h2>
          {mode !== "list" && <p className="title">기준 이력서</p>}
          <p className="desc">{desc}</p>
        </div>
      </div>

      <div className={btnsWrap}>
        {mode === "list" && (
          <Button
            text="새 채용 공고별 첨삭 생성"
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
                if (mode === "edit" && currentFeedbackId) {
                  navigate(`/jobs/${currentFeedbackId}`);
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
              text="저장"
              color="white"
              widthStyle="fit"
              callback={() => {}}
            />
            <Button
              text="다운로드"
              color="white"
              widthStyle="fit"
              icon="DOWN"
              callback={() => {}}
            />
          </>
        )}
      </div>
    </>
  );
}
