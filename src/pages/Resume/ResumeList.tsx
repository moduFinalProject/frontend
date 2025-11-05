import { resumeList } from "./ResumeList.css.ts";
import ResumeItem from "./components/ResumeItem.tsx";

export default function ResumeList() {
  return (
    <div>
      <h3 className="a11y-hidden">이력서 목록</h3>
      <ul className={resumeList}>
        <ResumeItem resume={{ id: 1, url: "" }} />
        <ResumeItem resume={{ id: 2, url: "123" }} />
        <ResumeItem resume={{ id: 3, url: "123" }} />
        <ResumeItem resume={{ id: 4, url: "123" }} />
        <ResumeItem resume={{ id: 5, url: "123" }} />
      </ul>
    </div>
  );
}
