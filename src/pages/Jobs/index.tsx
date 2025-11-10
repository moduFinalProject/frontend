import { Outlet, useMatch, useParams } from "react-router-dom";
import { Suspense } from "react";

import { container, header } from "./index.css.ts";
import JobTitle from "./components/JobTitle.tsx";

export default function Jobs() {
  const { id } = useParams();

  const modeData = {
    list: {
      desc: "관심있는 채용공고를 저장하고 관리하세요",
    },
    view: {
      desc: "채용공고 상세 내용을 확인할 수 있습니다",
    },
    create: {
      desc: "새로운 채용공고를 등록하세요",
    },
    edit: {
      desc: "채용공고 정보를 수정하세요",
    },
  };

  const isCreate = useMatch("/jobs/new");
  const isEdit = useMatch("/jobs/:id/edit");
  const isView = useMatch("/jobs/:id");
  const mode: "view" | "edit" | "create" | "list" = isCreate
    ? "create"
    : isEdit
    ? "edit"
    : isView
    ? "view"
    : "list";

  return (
    <main className={container}>
      <header className={header}>
        <JobTitle
          mode={mode}
          title="채용공고"
          desc={modeData[mode].desc}
          jobId={id}
        />
      </header>

      <Suspense fallback={<p>로딩 중...</p>}>
        <Outlet />
      </Suspense>
    </main>
  );
}
