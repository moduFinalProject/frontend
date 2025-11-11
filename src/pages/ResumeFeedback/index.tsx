import { Outlet, useMatch, useParams } from "react-router-dom";
import { Suspense } from "react";

import { container, header } from "./index.css.ts";
import FeedbackTitle from "./components/FeedbackTitle.tsx";

export default function ResumeFeedbackList() {
  const { id } = useParams();

  const modeData = {
    list: {
      desc: "관심있는 채용공고를 저장하고 관리하세요",
    },
    view: {
      desc: "최근 수정: ",
    },
    create: {
      desc: "새로운 채용공고를 등록하세요",
    },
  };

  const isCreate = useMatch("/resumeFeedbackHis/new");
  const isView = useMatch("/resumeFeedbackHis/:id");
  const mode: "view" | "create" | "list" = isCreate
    ? "create"
    : isView
    ? "view"
    : "list";

  return (
    <div className={container}>
      <header className={header}>
        <FeedbackTitle
          mode={mode}
          title="채용공고"
          desc={modeData[mode].desc}
          feedbackId={id}
        />
      </header>

      <Suspense fallback={<p>로딩 중...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
