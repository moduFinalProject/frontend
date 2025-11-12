import { useParams } from "react-router-dom";
import ResumeCard from "./components/card/ResumeCard";
import ResumeCardRow from "./components/card/ResumeCardRow";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { container, innerContainer } from "./index.css.ts";
import { fetchWithAuth } from "@/services/api.ts";

type ResumeData = {
  id: string;
  url?: string;
  imgUrl: string;
  image_url: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  military_service: string;
  education?: {
    organ: string;
    department: string;
    degree_level: string;
    start_date: string;
    end_date?: string;
    score: string;
  }[];
  self_introduction: string;
  experience?: {
    job_title: string;
    position: string;
    department: string;
    start_date: string;
    end_date?: string;
    job_description: string;
    employment_status: "Y" | "N";
  }[];
  project?: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
  }[];
  activity?: {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
  }[];
  technology_stack?: string[];
  qualifications?: {
    title: string;
    organ: string;
    acquisition_date: string;
    score?: string;
  }[];
};

async function getResume(resume_id: string | undefined) {
  if (resume_id === undefined) return;

  try {
    const response = await fetchWithAuth(`/resumes/${resume_id}`);

    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("로딩 중 에러:", error);
  }
}

export default function ResumeDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState({});

  // const resumeData: ResumeData = {
  //   id: "1",
  //   url: "https://career.example.com/job/123456",
  //   imgUrl:
  //     "https://i.pinimg.com/736x/95/f0/8a/95f08adb4d08c76eda72fd488700bd3a.jpg",
  //   photoUrl: "",
  //   title: "기본 이력서",
  //   name: "김취업",
  //   email: "email.email.com",
  //   phone: "010-0000-0000",
  //   gender: "남",
  //   address: "서울시 강남구",
  //   military_service: "현역",
  //   education: [
  //     {
  //       organ: "한국대학교",
  //       department: "컴퓨터공학",
  //       degree_level: "학사",
  //       start_date: "2020-06",
  //       end_date: "2022-02",
  //       score: "3.8 / 4.5",
  //     },
  //   ],
  //   self_introduction:
  //     "안녕하세요. 3년차 웹 개발자 김취업입니다.\n\n사용자 중심의 인터페이스 설계와 효율적인 코드 작성에 관심이 많으며, 항상 새로운 기술을 배우고 적용하는 것을 즐깁니다. 팀원들과의 원활한 소통을 통해 프로젝트를 성공적으로 이끌어 낸 경험이 있으며, 문제 해결 능력과 책임감을 바탕으로 맡은 업무를 완수하는 것을 목표로 하고 있습니다.\n\n지속적인 학습과 성장을 통해 더 나은 개발자가 되고자 노력하고 있습니다.",
  //   experience: [
  //     {
  //       job_title: "테크스타트업",
  //       position: "프론트엔드 개발자",
  //       start_date: "2022-03",
  //       end_date: "현재",
  //       job_description:
  //         "- React와 TypeScript를 활용한 웹 서비스 개발 및 유지보수\n- Redux를 이용한 상태 관리 구조 설계 및 구현\n- REST API 연동 및 데이터 처리 로직 개발\n- 반응형 웹 디자인 구현으로 모바일 사용자 경험 개선\n- Git을 활용한 버전 관리 및 코드 리뷰 참여\n- 웹 접근성 개선 작업으로 WCAG 2.1 AA 등급 달성",
  //       department: "개발팀",
  //       employment_status: "Y",
  //     },
  //     {
  //       job_title: "디지털솔루션",
  //       position: "주니어 웹 개발자",
  //       start_date: "2020-06",
  //       end_date: "2022-02",
  //       job_description:
  //         "- HTML, CSS, JavaScript를 활용한 웹 페이지 개발\n- jQuery를 이용한 동적 UI 구현\n- 크로스 브라우저 호환성 테스트 및 이슈 해결\n- 웹사이트 성능 최적화를 통한 로딩 속도 25% 개선\n- UI/UX 디자이너와 협업하여 사용자 경험 개선",
  //       department: "개발팀",
  //       employment_status: "N",
  //     },
  //   ],
  //   project: [
  //     {
  //       title: "전자상거래 플랫폼 구축",
  //       description:
  //         "- React와 Next.js를 활용한 SSR 기반 전자상거래 플랫폼 개발\n- 상품 검색, 장바구니, 결제 시스템 등 핵심 기능 구현\n- 5인 개발팀에서 프론트엔드 파트 리딩\n- 페이지 로딩 속도 최적화로 Lighthouse 성능 점수 85점 이상 달성",
  //       start_date: "2020-06",
  //       end_date: "2022-02",
  //     },
  //     {
  //       title: "사내 관리 시스템 개발",
  //       description:
  //         "- 사내 업무 효율화를 위한 관리 시스템 개발\n- 실시간 데이터 동기화를 위한 WebSocket 구현\n- Chart.js를 활용한 데이터 시각화 대시보드 개발\n- 사용자 권한 관리 시스템 구축",
  //       start_date: "2020-06",
  //       end_date: "2022-02",
  //     },
  //   ],
  //   activity: [
  //     {
  //       title: "오픈소스 프로젝트 기여",
  //       start_date: "2020-06",
  //       end_date: "2022-02",
  //       description:
  //         "- React 관련 오픈소스 라이브러리에 버그 수정 및 기능 개선 PR 제출\n- 총 15개의 PR이 메인 브랜치에 머지됨\n- 프로젝트 문서화 작업에 참여",
  //     },
  //     {
  //       title: "개발자 스터디 그룹 운영",
  //       start_date: "2020-06",
  //       end_date: "2022-02",
  //       description:
  //         "- 주 1회 웹 개발 관련 스터디 진행 (총 12명 참여)\n- React, TypeScript 등 최신 기술 스택 학습 및 토론\n- 토이 프로젝트 협업을 통한 실무 경험 공유",
  //     },
  //   ],
  //   technology_stack: [
  //     "React",
  //     "TypeScript",
  //     "JavaScript",
  //     "HTML/CSS",
  //     "Redux",
  //     "Next.js",
  //     "Git",
  //     "REST API",
  //     "Responsive Design",
  //   ],
  //   qualifications: [
  //     {
  //       title: "정보처리기사",
  //       organ: "한국산업인력공단",
  //       acquisition_date: "2020-08",
  //     },
  //     {
  //       title: "TOEIC",
  //       organ: "ETS",
  //       acquisition_date: "2024-05",
  //       score: "850점",
  //     },
  //   ],
  // };

  useEffect(() => {
    if (!id && isLoad) return;

    setIsLoading(false);

    const loadResumeData = async () => {
      const data = await getResume(id); // ⬅️ 데이터를 기다림

      if (data) {
        setResumeData(data); // ⬅️ 실제 데이터를 상태에 저장
      }
      setIsLoading(true); // ⬅️ 데이터 로딩 완료 상태로 변경
    };

    loadResumeData();
  }, [id]);

  if (!isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={`${container} ${innerContainer}`}>
      <ResumeCard title="증명사진">
        <ResumeCardRow
          imgUrl={resumeData.image_url}
          isPhoto={true}
          widthType="full"
        />
      </ResumeCard>
      {resumeData.url && (
        <ResumeCard title="공고 URL">
          <ResumeCardRow desc={resumeData.url} isUrl={true} widthType="full" />
        </ResumeCard>
      )}
      <ResumeCard title="기본 정보">
        <ResumeCardRow lavel="이름" value={resumeData.name} widthType="half" />
        <ResumeCardRow
          lavel="이메일"
          value={resumeData.email}
          widthType="half"
        />
        <ResumeCardRow
          lavel="연락처"
          value={resumeData.phone}
          widthType="half"
        />
        <ResumeCardRow
          lavel="성별"
          value={resumeData.gender}
          widthType="half"
        />
        <ResumeCardRow
          lavel="주소"
          value={resumeData.address}
          widthType="half"
        />
        <ResumeCardRow
          lavel="병역 구분"
          value={resumeData.military_service}
          widthType="half"
        />
      </ResumeCard>
      <ResumeCard title="학력">
        {resumeData.educations?.map((educationItem, idx) => {
          const date = `${educationItem.start_date} ~ ${educationItem.end_date}`;

          return (
            <Fragment key={idx}>
              {idx > 0 && <hr />}
              <ResumeCardRow
                key={idx}
                subTile={`${educationItem.department} · ${educationItem.degree_level}`}
                value={educationItem.organ}
                desc={educationItem.score}
                date={date}
                widthType="full"
              />
            </Fragment>
          );
        })}
      </ResumeCard>
      <ResumeCard title="자기소개">
        <ResumeCardRow desc={resumeData.self_introduction} widthType="full" />
      </ResumeCard>
      <ResumeCard title="경력">
        {resumeData.experiences?.map((experienceItem, idx) => {
          const date = `${experienceItem.start_date} ~ ${
            experienceItem.employment_status === "Y"
              ? "현재"
              : experienceItem.end_date
          }`;

          return (
            <Fragment key={idx}>
              {idx > 0 && <hr />}
              <ResumeCardRow
                key={idx}
                subTile={experienceItem.position}
                value={experienceItem.job_title}
                desc={experienceItem.job_description}
                date={date}
                widthType="full"
              />
            </Fragment>
          );
        })}
      </ResumeCard>
      <ResumeCard title="경험/활동">
        {resumeData.activities?.map((activityItem, idx) => {
          const date = `${activityItem.start_date} ~ ${
            activityItem.end_date === "" ? "현재" : activityItem.end_date
          }`;

          return (
            <Fragment key={idx}>
              {idx > 0 && <hr />}
              <ResumeCardRow
                key={idx}
                value={activityItem.title}
                desc={activityItem.description}
                date={date}
                widthType="full"
              />
            </Fragment>
          );
        })}
      </ResumeCard>
      <ResumeCard title="기술 스택">
        <ResumeCardRow
          keyword={resumeData.technology_stacks}
          widthType="full"
        />
      </ResumeCard>
      <ResumeCard title="자격증 및 어학">
        {resumeData.qualifications?.map((qualificationItem, idx) => {
          const subTile = `${qualificationItem.organ} · ${
            qualificationItem.acquisition_date
          }${
            qualificationItem.score === undefined
              ? ""
              : ` · ${qualificationItem.score}`
          }`;

          return (
            <Fragment key={idx}>
              {idx > 0 && <hr />}
              <ResumeCardRow
                key={idx}
                subTile={subTile}
                value={qualificationItem.title}
                widthType="full"
                isLisence={true}
                lisence={!qualificationItem.score}
              />
            </Fragment>
          );
        })}
      </ResumeCard>
    </div>
  );
}
