import { useParams } from "react-router-dom";
import ResumeCard from "./components/card/ResumeCard";
import ResumeCardRow from "./components/card/ResumeCardRow";
import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { container, innerContainer } from "./index.css.ts";
import { getResume } from "@/services/resumes.ts";

type ResumeData = {
  resume_id: string;
  resume_type?: string;
  resume_type_detail?: string;
  created_at?: string;
  updated_at?: string;
  url?: string;
  image_url: string;
  portfolio_url?: string;
  title: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  gender_detail: string;
  address: string;
  military_service: string;
  military_service_detail?: string;
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
  technology_stacks?: { title: string }[];
  qualifications?: {
    title: string;
    organ: string;
    acquisition_date: string;
    score?: string;
  }[];
};

export default function ResumeDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);

  useEffect(() => {
    if (!id && isLoading) return;

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
      <ResumeCard title="이력서 이름">
        <ResumeCardRow desc={resumeData.title} widthType="full" />
      </ResumeCard>
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
          lavel="생일"
          value={resumeData.birth_date}
          widthType="half"
        />
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
          value={resumeData.gender_detail}
          widthType="half"
        />
        <ResumeCardRow
          lavel="병역 구분"
          value={resumeData.military_service}
          widthType="half"
        />
        <ResumeCardRow
          lavel="주소"
          value={resumeData.address}
          widthType="full"
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
        {resumeData.experiences.length <= 0 && (
          <ResumeCardRow value="등록된 항목이 없습니다." widthType="full" />
        )}
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
        {resumeData.activities.length <= 0 && (
          <ResumeCardRow value="등록된 항목이 없습니다." widthType="full" />
        )}
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
        {resumeData.technology_stacks.length <= 0 ? (
          <ResumeCardRow
            value="작성한 기술 스텍이 없습니다."
            widthType="full"
          />
        ) : (
          <ResumeCardRow
            keyword={resumeData.technology_stacks}
            widthType="full"
          />
        )}
      </ResumeCard>
      <ResumeCard title="자격증 및 어학">
        {resumeData.qualifications.length <= 0 && (
          <ResumeCardRow value="등록된 항목이 없습니다." widthType="full" />
        )}
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
