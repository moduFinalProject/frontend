import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
import { headerText, subPage, btnsWrap, prevWrap } from "./ResumeTitle.css.ts";
import { delResume } from "@/services/resumes.ts";
import { useResumeContext, type ResumeData } from "../ResumeContext.tsx";
import { useResumeListContext, type Resume } from "../ResumeListContext.tsx";
import { toast } from "react-toastify";

export default function ResumeTitle({ title }: { title: string }) {
  const {
    setResumes,
  }: {
    setResumes: (arg0: Resume[]) => void;
  } = useResumeListContext();
  const {
    resumeData,
    id,
    mode,
  }: {
    resumeData: ResumeData;
    id: string;
    mode: "list" | "view" | "create" | "edit" | "correction";
  } = useResumeContext();
  const navigate = useNavigate();

  type titleData = { title: string; desc: string };
  const modeData: {
    list: titleData;
    view: titleData;
    create: titleData;
    edit: titleData;
    correction: titleData;
  } = {
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
      title: `${title} 첨삭 보기`,
      desc: `첨삭 내용을 확인해보세요`,
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
          <h2 className={mode !== "list" ? "a11y-hidden" : ""}>
            {modeData[mode].title}
          </h2>
          {mode !== "list" && <p className="title">{modeData[mode].title}</p>}
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
          <Button
            text="저장하기"
            color="blue"
            widthStyle="fit"
            buttonType="submit"
            form="resumeForm"
            callback={() => {}}
          />
        )}
        {mode === "view" && (
          <>
            <Button
              text="삭제"
              color="red"
              widthStyle="fit"
              callback={async () => {
                if (confirm("삭제하시겠습니까?")) {
                  await delResume(id);

                  toast.success("삭제되었습니다.", {
                    className: "custom-success-toast",
                  });
                  navigate("/resume");

                  // 새 배열로 상태 업데이트 (불변성 유지)
                  setResumes((prev) =>
                    prev.filter((item) => item.resume_id !== id)
                  );
                }
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
      </div>
    </>
  );
}
