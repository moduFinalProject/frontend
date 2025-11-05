import { Button } from "@/components/index.ts";
import {
  resumeItem,
  title,
  titleRow,
  desc,
  btns,
  dropdownStyle,
} from "./ResumeItem.css.ts";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type Resume = {
  id: number;
  url?: string;
};

interface ResumeItemProps {
  resume: Resume;
}

export default function ResumeItem({ resume }: ResumeItemProps) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  function handleDropdown() {
    setDropdown((prev) => !prev);
    console.log("클릭");
  }

  // 외부 클릭 감지
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // dropdownRef.current가 존재하고, 그 영역 안을 클릭한 게 아니라면 닫기
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    }

    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <li className={resumeItem}>
      <div className={title}>
        <div>
          <div
            className={titleRow}
            onClick={() => {
              navigate(`./${resume.id}`);
            }}
          >
            <h4>기본 이력서</h4>
            {resume.url && <span>공고맞춤</span>}
          </div>
          <p>포괄적인 기본 이력서</p>
        </div>
        <div ref={dropdownRef}>
          <Button
            text=""
            color="none"
            callback={() => {
              handleDropdown();
            }}
            widthStyle="fit"
            icon="MORE"
          />
          {dropdown && (
            <div className={dropdownStyle}>
              <Button
                color="none"
                text="수정"
                callback={() => {
                  navigate(`./${resume.id}/edit`);
                }}
                widthStyle="full"
              />
              <Button
                color="none"
                text="삭제"
                callback={() => {}}
                widthStyle="full"
              />
            </div>
          )}
        </div>
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
          callback={() => {
            navigate(`./${resume.id}/correction`);
          }}
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
