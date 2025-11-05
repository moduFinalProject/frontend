import { container, header, headerText } from "./index.css.ts";
import ResumeForm from "./ResumeForm.tsx";
import ResumeList from "./ResumeList.tsx";
import { Button } from "@/components/index.ts";

export default function Resume() {
  return (
    <div className={container}>
      <div className={header}>
        <div className={headerText}>
          <h2>내 이력서</h2>
          <p>저장된 이력서를 관리하고 새로운 이력서를 작성하세요</p>
        </div>
        <Button
          text="새 이력서 작성"
          color="blue"
          widthStyle="fit"
          icon="PLUS"
          callback={() => {}}
        />
      </div>

      <ResumeForm />

      <ResumeList />
    </div>
  );
}
