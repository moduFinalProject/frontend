import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeCard from "@/pages/Resume/components/card/ResumeCard";
import { fetchWithAuth } from "@/services/api";
import {
  container,
  resumeCardWrapper,
  resultWrapperWrapper,
  flex1,
  recorrection,
  resultWrap,
  resultList,
  resultPart,
  resultPartCommon,
  topLine,
  resume,
  infoLabel,
  desc,
  arrayList,
  arrayItem,
  userInfo,
  skillList,
  keywordMatching,
  progressWrap,
  progressValue,
  progressBg,
  progressText,
  progressTitle,
  btnWrap,
} from "@/components/Feedback/index.css";
import { Button } from "../Button";

// Feedback division 상수
const FEEDBACK_DIVISIONS = {
  GOOD: "1",
  ESSENTIAL: "2",
  IMPROVE: "3",
  RECOMMEND: "4",
} as const;

const DIVISION_ORDER = [
  FEEDBACK_DIVISIONS.GOOD,
  FEEDBACK_DIVISIONS.ESSENTIAL,
  FEEDBACK_DIVISIONS.IMPROVE,
  FEEDBACK_DIVISIONS.RECOMMEND,
] as const;

interface FeedbackContent {
  feedback_devision: string;
  feedback_result: string;
  feedback_devision_detail: string;
}

interface FeedbackData {
  feedback_id: number;
  parent_content: string;
  matching_rate: number;
  feedback_contents: FeedbackContent[];
}

type FeedbackProps = {
  type: string;
  isRecorrection: boolean;
  data?: FeedbackData;
};

// 같은 feedback_devision끼리 그룹화하는 함수
const groupFeedbackByDivision = (feedbackContents: FeedbackContent[]) => {
  const grouped = new Map<string, FeedbackContent[]>();

  feedbackContents.forEach((feedback) => {
    const key = feedback.feedback_devision;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(feedback);
  });

  return grouped;
};

// Division별 스타일 매핑 함수
const getDivisionClass = (division: string): string => {
  switch (division) {
    case FEEDBACK_DIVISIONS.GOOD:
      return resultPart.good;
    case FEEDBACK_DIVISIONS.ESSENTIAL:
      return resultPart.essential;
    case FEEDBACK_DIVISIONS.IMPROVE:
      return resultPart.improve;
    case FEEDBACK_DIVISIONS.RECOMMEND:
      return resultPart.recommend;
    default:
      return resultPart.good;
  }
};

// parent_content를 섹션별로 파싱하는 함수
// 형식: ## 섹션명\n- 항목1\n- 항목2\n...
const parseResumeContent = (content: string) => {
  const sections: Record<string, string[]> = {};
  const lines = content.split("\n");
  let currentSection = "";

  lines.forEach((line) => {
    if (line.startsWith("## ")) {
      currentSection = line.replace("## ", "").trim();
      sections[currentSection] = [];
    } else if (currentSection && line.trim()) {
      // "- " 제거하고 ** 마크다운 제거해서 저장
      const cleanedLine = line.replace(/^-\s*/, "").replace(/\*\*/g, "").trim();
      if (cleanedLine) {
        sections[currentSection].push(cleanedLine);
      }
    }
  });

  return sections;
};

export default function Feedback({ type, isRecorrection, data }: FeedbackProps) {
  const navigate = useNavigate();
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyFeedback = async () => {
    if (!data?.feedback_id) {
      alert("피드백 정보가 없습니다.");
      return;
    }

    try {
      setIsApplying(true);

      const response = await fetchWithAuth(
        `/resume_feedbacks/posting_resume/${data.feedback_id}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "수정사항 적용에 실패했습니다.");
      }

      const result = await response.json();
      alert("이력서가 생성되었습니다!");
      // 생성된 이력서 페이지로 이동
      navigate(`/resume/${result.resume_id}`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "수정사항 적용 중 오류가 발생했습니다.";
      console.error("Apply feedback error:", error);
      alert(errorMessage);
    } finally {
      setIsApplying(false);
    }
  };

  // parent_content 파싱
  const resumeSections = data?.parent_content
    ? parseResumeContent(data.parent_content)
    : {};

  // 섹션 렌더링 헬퍼 함수
  const renderSection = (sectionName: string, items: string[], isFirst: boolean) => {
    // 섹션이 비어있거나 "없음"으로 표시된 경우
    if (items.length === 0 || items.some(item => item.includes("없음"))) {
      return (
        <div key={sectionName} className={`${resume} ${!isFirst ? topLine : ""}`}>
          <h4>{sectionName}</h4>
          <p className={desc}>정보가 없습니다.</p>
        </div>
      );
    }

    // 섹션별 렌더링 로직
    if (sectionName === "개인 정보") {
      return (
        <div key={sectionName} className={resume}>
          <h4>{sectionName}</h4>
          <ul className={userInfo}>
            {items.map((item, idx) => {
              const [label, ...valueParts] = item.split(":").map(p => p.trim());
              const value = valueParts.join(":").trim();
              return (
                <li key={idx}>
                  <span className={infoLabel}>{label}: </span>
                  {value}
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    if (sectionName === "기술 스택") {
      return (
        <div key={sectionName} className={`${resume} ${!isFirst ? topLine : ""}`}>
          <h4>{sectionName}</h4>
          <ul className={skillList}>
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      );
    }

    // 자기소개 (텍스트로 표시)
    if (sectionName === "자기소개") {
      return (
        <div key={sectionName} className={`${resume} ${!isFirst ? topLine : ""}`}>
          <h4>{sectionName}</h4>
          <p>{items.join("\n")}</p>
        </div>
      );
    }

    // 기타 섹션 (경력, 학력, 프로젝트, 활동 등) - arrayList 형식
    return (
      <div key={sectionName} className={`${resume} ${!isFirst ? topLine : ""}`}>
        <h4>{sectionName}</h4>
        <ul className={arrayList}>
          {items.map((item, idx) => (
            <li key={idx} className={arrayItem}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className={container}>
      <div className={resumeCardWrapper}>
        <ResumeCard title="이력서 내용">
        {Object.entries(resumeSections).length > 0 ? (
          Object.entries(resumeSections).map(([sectionName, items], index) =>
            renderSection(sectionName, items, index === 0)
          )
        ) : (
          <>
            <div className={resume}>
              <h4>개인 정보</h4>
              <p className={desc}>정보가 없습니다.</p>
            </div>
            <div className={`${resume} ${topLine}`}>
              <h4>자기소개</h4>
              <p className={desc}>정보가 없습니다.</p>
            </div>
            <div className={`${resume} ${topLine}`}>
              <h4>학력</h4>
              <p className={desc}>정보가 없습니다.</p>
            </div>
            <div className={`${resume} ${topLine}`}>
              <h4>경력</h4>
              <p className={desc}>정보가 없습니다.</p>
            </div>
            <div className={`${resume} ${topLine}`}>
              <h4>프로젝트</h4>
              <p className={desc}>정보가 없습니다.</p>
            </div>
            <div className={`${resume} ${topLine}`}>
              <h4>기술 스택</h4>
              <p className={desc}>정보가 없습니다.</p>
            </div>
          </>
        )}
      </ResumeCard>
      </div>
      <div className={resultWrapperWrapper}>
        <section className={resultWrap}>
        {isRecorrection && (
          <section className={`${recorrection} ${flex1}`}>
            <div>
              <h3>AI 기본 첨삭</h3>
              <p className={desc}>
                일반적인 이력서 작성 기준에 따라 개선사항을 제안합니다
              </p>
            </div>
            <Button
              callback={() => {}}
              color="blue"
              text="기본 첨삭 받기"
              widthStyle="full"
            />
          </section>
        )}
        <ResumeCard title={`${type === "feedback" && "공고 맞춤 "}첨삭 결과`}>
          {type === "feedback" && data && (
            <div className={keywordMatching}>
              <p className={progressTitle}>키워드 매칭률</p>
              <div className={progressWrap}>
                <div className={progressBg}>
                  <span
                    className={progressValue}
                    style={{ "--progress-width": `${data.matching_rate}%` } as React.CSSProperties}
                  ></span>
                </div>
                <p className={progressText}>
                  <data value={String(data.matching_rate)}>{data.matching_rate}</data>%
                </p>
              </div>
            </div>
          )}
          <ul className={resultList}>
            {data && data.feedback_contents && data.feedback_contents.length > 0 ? (
              (() => {
                const grouped = groupFeedbackByDivision(data.feedback_contents);
                const items = [];

                for (const division of DIVISION_ORDER) {
                  const feedbacks = grouped.get(division);
                  if (!feedbacks) continue;

                  const resultClass = getDivisionClass(division);

                  // 같은 division의 모든 피드백을 합치기
                  const combinedResults = feedbacks.map((f) => f.feedback_result).join("\n\n");
                  // 라벨은 첫 번째 항목의 feedback_devision_detail 사용
                  const label = feedbacks[0].feedback_devision_detail;

                  items.push(
                    <li key={division} className={`${resultPartCommon} ${resultClass}`}>
                      <p>{label}</p>
                      <p className={desc}>{combinedResults}</p>
                    </li>
                  );
                }

                return items;
              })()
            ) : (
              <li className={`${resultPartCommon}`}>
                <p>분석된 첨삭이 없습니다.</p>
                <p className={desc}>
                  첨삭을 신청하면 AI가 분석한 결과를 여기에 표시됩니다.
                </p>
              </li>
            )}
          </ul>
          {type === "feedback" && (
            <div className={btnWrap}>
              <Button
                callback={handleApplyFeedback}
                color="blue"
                text={isApplying ? "생성 중..." : "수정사항 적용하기"}
                widthStyle="full"
                disabled={isApplying}
              />
            </div>
          )}
        </ResumeCard>
      </section>
      </div>
    </div>
  );
}
