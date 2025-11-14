import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
import { headerText, subPage, btnsWrap, prevWrap } from "./ResumeTitle.css.ts";
import { delResume } from "@/services/resumes.ts";
import { useResumeContext } from "../ResumeContext.tsx";

export default function ResumeTitle({ title }: { title: string }) {
  const { setResumes, resumeData, id, mode } = useResumeContext();
  const navigate = useNavigate();

  const modeData = {
    list: {
      title: title,
      desc: "저장된 이력서를 관리하고 새로운 이력서를 작성하세요",
    },
    view: {
      title: `${title} 보기`,
      desc: "이력서 내용을 확인하고 수정할 수 있습니다",
    },
    create: {
      title: `${title} 생성`,
      desc: "정보를 입력하여 이력서를 작성하세요",
    },
    edit: {
      title: `${title} 수정`,
      desc: "정보를 입력하여 이력서를 작성하세요",
    },
    correction: {
      title: resumeData?.title,
      desc: `최근 수정: ${resumeData?.updated_at}`,
    },
  };

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
              if (mode === "edit") navigate(-1);
              else navigate("/resume");
            }}
          />
        )}
        <div className={`${headerText} ${mode !== "list" && subPage}`}>
          <h2
            className={!["list", "create"].includes(mode) ? "a11y-hidden" : ""}
          >
            {modeData[mode].title}
          </h2>
          {!["list", "create"].includes(mode) && (
            <p className="title">{resumeData?.resume_type_detail}</p>
          )}
          <p className="desc">{modeData[mode].desc}</p>
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
              callback={async () => {
                if (confirm("삭제하시겠습니까?")) {
                  const result = await delResume(id);
                  console.log(result);

                  alert("삭제되었습니다");
                  navigate("/resume");

                  // 새 배열로 상태 업데이트 (불변성 유지)
                  setResumes((prev) =>
                    prev.filter((item) => item.resume_id !== id)
                  );
                }
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
