import ResumeCard from "@/pages/Resume/components/card/ResumeCard";
import {
  container,
  flex1,
  recorrection,
  resultWrap,
  resultList,
  resultPart,
  resultPartCommon,
  topLine,
  resume,
  infoLabel,
  dateValue,
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
} from "@/components/Feedback/index.css";
import { Button } from "../Button";

type FeedbackProps = {
  type: string;
  isRecorrection: boolean;
};

export default function Feedback({ type, isRecorrection }: FeedbackProps) {
  return (
    <div className={container}>
      <ResumeCard title="이력서 내용">
        <div className={resume}>
          <h4>기본 정보</h4>
          <ul className={userInfo}>
            <li>
              <span className={infoLabel}>이름: </span>김취업
            </li>
            <li>
              <span className={infoLabel}>이메일: </span>kim@example.com{" "}
            </li>
            <li>
              <span className={infoLabel}>연락처: </span>010-1234-5678
            </li>
            <li>
              <span className={infoLabel}>성별: </span>남
            </li>
            <li>
              <span className={infoLabel}>주소: </span>서울시 강남구
            </li>
            <li>
              <span className={infoLabel}>병역구분: </span>현역
            </li>
          </ul>
        </div>
        <div className={`${resume} ${topLine}`}>
          <h4>학력</h4>
          <ul className={arrayList}>
            <li className={arrayItem}>
              <p>한국대학교</p>
              <span className={dateValue}>2016-03 ~ 2020-02</span>
              <div>
                <p>컴퓨터공학 · 학사</p>
                <p>학점: 3.8 / 4.5</p>
              </div>
            </li>
          </ul>
        </div>
        <div className={`${resume} ${topLine}`}>
          <h4>자기소개</h4>
          <p>
            3년차 프론트엔드 개발자로, React와 TypeScript를 활용한 웹
            애플리케이션 개발에 열정을 가지고 있습니다.
          </p>
        </div>
        <div className={`${resume} ${topLine}`}>
          <h4>경력</h4>
          <ul className={arrayList}>
            <li className={arrayItem}>
              <p>스타트업 A - 프론트엔드 개발자</p>
              <span className={dateValue}>2022.03 - 현재</span>
              <p>
                - React 기반 SaaS 제품 개발\n - TypeScript, Redux를 활용한
                상태관리\n - 성능 최적화로 로딩 속도 40% 개선
              </p>
            </li>
            <li className={arrayItem}>
              <p>스타트업 B - 주니어 개발자</p>
              <span className={dateValue}>2021.01 - 2022.02</span>
              <p>
                - Vue.js 기반 관리자 ��이지 개발\n- RESTful API 연동\n- 반응형
                웹 디자인 구현
              </p>
            </li>
          </ul>
        </div>
        <div className={`${resume} ${topLine}`}>
          <h4>프로젝트</h4>
          <ul className={arrayList}>
            <li className={arrayItem}>
              <p>전자상거래 플랫폼 구축</p>
              <span className={dateValue}>2023.06 ~ 2024.01</span>
              <p>
                - React와 Next.js를 활용한 SSR 기반 전자상거래 플랫폼 개발 -
                상품 검색, 장바구니, 결제 시스템 등 핵심 기능 구현 - 5인
                개발팀에서 프론트엔드 파트 리딩 - 페이지 로딩 속도 최적화로
                Lighthouse 성능 점수 85점 이상 달성
              </p>
            </li>
          </ul>
        </div>
        <div className={`${resume} ${topLine}`}>
          <h4>경험/활동</h4>
          <ul className={arrayList}>
            <li className={arrayItem}>
              <p>오픈소스 프로젝트 기여</p>
              <span className={dateValue}>2023.01 ~ 현재</span>
              <p>
                - React 관련 오픈소스 라이브러리에 버그 수정 및 기능 개선 PR
                제출 - 총 15개의 PR이 메인 브랜치에 머지됨 - 프로젝트 문서화
                작업에 참여
              </p>
            </li>
          </ul>
        </div>
        <div className={`${resume} ${topLine}`}>
          <h4>기술 스택</h4>
          <ul className={skillList}>
            <li>React</li>
            <li>TypeScript</li>
            <li>JavaScript</li>
            <li>HTML/CSS</li>
            <li>Redux</li>
            <li>Next.js</li>
            <li>Git</li>
            <li>REST API</li>
            <li>Responsive Design</li>
          </ul>
        </div>
        <div className={`${resume} ${topLine}`}>
          <h4>자격증/어학</h4>
          <ul className={arrayList}>
            <li className={arrayItem}>
              <p>[자격증] 정보처리기사</p>
              <span className={dateValue}>한국산업인력공단 · 2020-08</span>
            </li>
            <li className={arrayItem}>
              <p>[어학] TOEIC</p>
              <span className={dateValue}>ETS · 2024-05 · 850점</span>
            </li>
          </ul>
        </div>
      </ResumeCard>
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
          {type === "feedback" && (
            <div className={keywordMatching}>
              <p className={progressTitle}>키워드 매칭률</p>
              <div className={progressWrap}>
                <div className={progressBg}>
                  <span className={progressValue}></span>
                </div>
                <p className={progressText}>
                  <data value="78">78</data>%
                </p>
              </div>
            </div>
          )}
          <ul className={resultList}>
            <li className={`${resultPartCommon} ${resultPart.good}`}>
              <p>잘된 부분</p>
              <p className={desc}>
                기술 스택이 명확하게 정리되어 있고, 경력 기술에 구체적인 성과가
                포함되어 있습니다.
              </p>
            </li>
            <li className={`${resultPartCommon} ${resultPart.improve}`}>
              <p>개선 제안</p>
              <p className={desc}>
                요약 부분에 핵심 강점을 더 부각시키면 좋습니다.
                <span>
                  "3년차 프론트엔드 개발자로, React 생태계에 정통하며 성능
                  최적화를 통해 실질적인 비즈니스 가치를 창출한 경험이
                  있습니다."
                </span>
              </p>
            </li>
            <li className={`${resultPartCommon} ${resultPart.recommend}`}>
              <p>추가 권장사항</p>
              <p className={desc}>
                • 프로젝트 규모와 팀 구성을 명시하면 좋습니다\n • 사용한 도구와
                라이브러리를 구체적으로 작성하세요\n • 성과는 가능한 정량적으로
                표현하세요
              </p>
            </li>
          </ul>
          {type === "feedback" && (
            <Button
              callback={() => {}}
              color="blue"
              text="수정사항 적용하기"
              widthStyle="full"
            />
          )}
        </ResumeCard>
      </section>
    </div>
  );
}
