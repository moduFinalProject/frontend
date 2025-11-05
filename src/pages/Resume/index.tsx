import { Outlet, useMatch, useParams } from "react-router-dom";
import { Suspense } from "react";

import { container, header } from "./index.css.ts";
import ResumeTitle from "./components/ResumeTitle.tsx";

export default function Resume() {
  const { id } = useParams();

  const modeData = {
    list: {
      desc: "저장된 이력서를 관리하고 새로운 이력서를 작성하세요",
    },
    view: {
      desc: "이력서 내용을 확인하고 수정할 수 있습니다",
    },
    create: {
      desc: "정보를 입력하여 이력서를 작성하세요",
    },
    edit: {
      desc: "정보를 입력하여 이력서를 작성하세요",
    },
    correction: {
      desc: "최근 수정: ",
    },
  };

  const isCreate = useMatch("/resume/new");
  const isEdit = useMatch("/resume/:id/edit");
  const isCorrection = useMatch("/resume/:id/correction");
  const isView = useMatch("/resume/:id");
  const mode: "view" | "edit" | "create" | "list" | "correction" = isCreate
    ? "create"
    : isEdit
    ? "edit"
    : isView
    ? "view"
    : isCorrection
    ? "correction"
    : "list";

  console.log("mode", mode);
  console.log("id", id);

  return (
    <div className={container}>
      <div className={header}>
        <ResumeTitle
          mode={mode}
          title="내 이력서"
          desc={modeData[mode].desc}
          resumeId={id}
        />
      </div>

      <Suspense fallback={<p>로딩 중...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
