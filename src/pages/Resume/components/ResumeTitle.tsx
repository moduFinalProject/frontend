import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
import { headerText, subPage, btnsWrap } from "./ResumeTitle.css.ts";

interface ResumeProps {
  mode: "list" | "view" | "create" | "edit" | "correction";
  title: string;
  desc: string;
  resumeId?: string;
}

export default function ResumeTitle({
  mode,
  title,
  desc,
  resumeId,
}: ResumeProps) {
  const navigate = useNavigate();

  let titleText = title;
  if (mode === "view") titleText += "보기";
  else if (mode === "create") titleText += "생성";
  else if (mode === "edit") titleText += "수정";

  return (
    <>
      {mode !== "list" && (
        <Button
          text=""
          color="none"
          widthStyle="fit"
          icon="PREV"
          callback={() => {
            navigate("./../resume/");
          }}
        />
      )}
      <div className={`${headerText} ${mode !== "list" && subPage}`}>
        <h2 className={mode !== "list" ? "a11y-hidden" : ""}>{titleText}</h2>
        {mode !== "list" && <p className="title">기본 이력서</p>}
        <p className="desc">{desc}</p>
      </div>
      <div className={btnsWrap}>
        {mode === "list" && (
          <Button
            text="새 이력서 작성"
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
              text="AI 자동완성"
              color="white"
              widthStyle="fit"
              callback={() => {}}
            />
            <Button
              text="저장하기"
              color="blue"
              widthStyle="fit"
              callback={() => {}}
            />
          </>
        )}
        {mode === "view" && (
          <>
            <Button
              text="삭제"
              color="red"
              widthStyle="fit"
              callback={() => {}}
            />
            <Button
              text="다운로드"
              color="white"
              widthStyle="fit"
              icon="DOWN"
              callback={() => {
                console.log(resumeId);
              }}
            />
            <Button
              text="수정하기"
              color="blue"
              widthStyle="fit"
              callback={() => {}}
            />
          </>
        )}
        {mode === "correction" && (
          <>
            <Button
              text="다운로드"
              color="white"
              widthStyle="fit"
              icon="DOWN"
              callback={() => {}}
            />
            <Button
              text="저장"
              color="blue"
              widthStyle="fit"
              callback={() => {}}
            />
          </>
        )}
      </div>
    </>
  );
}
