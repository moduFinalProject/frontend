import { Outlet, useMatch, useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { Button } from "@/components";

import {
  container,
  header,
  headerContent,
  headerAction,
} from "./index.css.ts";

const MODE_TEXT = {
  list: {
    title: "첨삭 이력",
    description: "공고별로 첨삭한 이력서 결과를 확인하세요",
    actionLabel: "새 이력서 첨삭" as const,
  },
  create: {
    title: "새 이력서 첨삭",
    description: "공고에 맞춘 맞춤 첨삭 정보를 입력하세요",
    actionLabel: null,
  },
} as const;

type Mode = keyof typeof MODE_TEXT;

export default function ResumeFeedbackLayout() {
  const navigate = useNavigate();
  const isCreate = useMatch("/resumeFeedback/new");

  const mode: Mode = useMemo(() => (isCreate ? "create" : "list"), [isCreate]);

  const handleNewResumeFeedback = () => {
    navigate("/resumeFeedback/new");
  };

  const currentText = MODE_TEXT[mode];

  return (
    <main className={container}>
      <header className={header}>
        <div className={headerContent}>
          <h1>{currentText.title}</h1>
          <p>{currentText.description}</p>
        </div>
        {currentText.actionLabel ? (
          <div className={headerAction}>
            <Button
              color="blue"
              widthStyle="fit"
              icon="PLUS"
              text={currentText.actionLabel}
              callback={handleNewResumeFeedback}
            />
          </div>
        ) : null}
      </header>
      <Outlet />
    </main>
  );
}
