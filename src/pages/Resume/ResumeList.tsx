import { resumeList, a11yHidden } from "./ResumeList.css.ts";
import ResumeItem from "./ResumeItem.tsx";

export default function ResumeList() {
  return (
    <div>
      <h3 className={a11yHidden}>이력서 목록</h3>
      <ul className={resumeList}>
        <ResumeItem resume={{ url: "" }} />
        <ResumeItem resume={{ url: "123" }} />
        <ResumeItem resume={{ url: "123" }} />
        <ResumeItem resume={{ url: "123" }} />
        <ResumeItem resume={{ url: "123" }} />
      </ul>
    </div>
  );
}
