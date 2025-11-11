import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components";
import { headerText, subPage, btnsWrap, prevWrap } from "./ResumeTitle.css.ts";

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
  const { id } = useParams();
  const navigate = useNavigate();

  let titleText = title;
  if (mode === "view") titleText += "보기";
  else if (mode === "create") titleText += "생성";
  else if (mode === "edit") titleText += "수정";

  function handleSubmit() {
    if (mode === "create") {
      console.log("새 이력서 생성");
    } else {
      console.log("이력서 수정");
    }
  }

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
          {mode !== "list" && <p className="title">기본 이력서</p>}
          <p className="desc">{desc}</p>
        </div>
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
              callback={() => {
                alert("개발중입니다");
              }}
            />
            <Button
              text="저장하기"
              color="blue"
              widthStyle="fit"
              buttonType="submit"
              form="resumeForm"
              callback={() => {
                handleSubmit();
              }}
            />
          </>
        )}
        {mode === "view" && (
          <>
            <Button
              text="삭제"
              color="red"
              widthStyle="fit"
              callback={() => {
                if (confirm("삭제하시겠습니까?")) alert("삭제되었습니다");
              }}
            />
            <Button
              text="다운로드"
              color="white"
              widthStyle="fit"
              icon="DOWN"
              callback={() => {
                alert("다운로드 되었습니다");
              }}
            />
            <Button
              text="수정하기"
              color="blue"
              widthStyle="fit"
              callback={() => {
                navigate(`./${id}/edit`);
              }}
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
              callback={() => {
                alert("다운로드 되었습니다");
              }}
            />
            <Button
              text="저장"
              color="blue"
              widthStyle="fit"
              callback={() => {
                if (confirm("새 이력서로 생성하시겠습니까?"))
                  alert("생성되었습니다");
              }}
            />
          </>
        )}
      </div>
    </>
  );
}
