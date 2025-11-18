import { Outlet, useMatch, useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";

import { container, header } from "./index.css.ts";
import FeedbackTitle from "./components/FeedbackTitle.tsx";

const MODE_TEXT = {
  list: {
    title: "첨삭 이력",
    description: "공고별로 첨삭한 이력서 결과를 확인하세요",
    actionLabel: "공고별 첨삭" as const,
  },
  create: {
    title: "새 이력서 첨삭",
    description: "공고에 맞춘 맞춤 첨삭 정보를 입력하세요",
    actionLabel: null,
  },
  view: {
    title: "새 이력서 첨삭",
    description: "공고에 맞춘 맞춤 첨삭 정보를 입력하세요",
    actionLabel: null,
  },
} as const;

type Mode = keyof typeof MODE_TEXT;

export default function ResumeFeedbackLayout() {
  const { id } = useParams();
  const isCreate = useMatch("/resumeFeedback/new");
  const isView = useMatch("/resumeFeedback/:id");

  const mode: Mode = useMemo(
    () => (isCreate ? "create" : isView ? "view" : "list"),
    [isCreate, isView]
  );

  const currentText = MODE_TEXT[mode];

  return (
    <div className={container}>
      <header className={header}>
        <FeedbackTitle
          mode={mode}
          title="공고별 첨삭"
          desc={currentText.description}
          feedbackId={id}
        />
      </header>
      <Outlet />
    </div>
  );
}
