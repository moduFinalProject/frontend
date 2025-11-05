import { Button } from "@/components/index.ts";
import { form } from "./ResumeForm.css.ts";

export default function ResumeForm() {
  return (
    <div className={form}>
      <input type="text" placeholder="이력서 이름 또는 설명으로 검색..." />
      <Button
        color="blue"
        icon="SEARCH"
        text="검색"
        callback={() => {}}
        widthStyle="fit"
      />
    </div>
  );
}
