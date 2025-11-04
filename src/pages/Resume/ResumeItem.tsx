import { Button } from "@/components/index.ts";
import { resumeItem, title, titleRow, desc, btns } from "./ResumeItem.css.ts";

type Resume = {
  url?: string;
};

interface ResumeItemProps {
  resume: Resume;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  return (
    <li className={resumeItem}>
      <div className={title}>
        <div>
          <div className={titleRow}>
            <h4>기본 이력서</h4>
            <span>공고맞춤</span>
          </div>
          <p>포괄적인 기본 이력서</p>
        </div>
        <Button
          text=""
          color="none"
          callback={() => {}}
          widthStyle="fit"
          icon="MORE"
        />
      </div>
      <div className={desc}>
        <div>
          <p>최근 수정</p>
          <p>2025.11.12</p>
        </div>
        {resume.url && (
          <div>
            <p>맞춤 공고</p>
            <span>1개</span>
          </div>
        )}
      </div>
      <div className={btns}>
        <Button
          text="첨삭"
          color="white"
          callback={() => {}}
          widthStyle="full"
        />
        {resume.url && (
          <Button
            text="채용공고"
            color="blue"
            icon="LINK_WHITE"
            callback={() => {}}
            widthStyle="full"
          />
        )}
      </div>
    </li>
  );
}
