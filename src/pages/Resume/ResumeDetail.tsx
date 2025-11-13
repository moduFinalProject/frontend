import ResumeCard from "./components/card/ResumeCard";
import ResumeCardRow from "./components/card/ResumeCardRow";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { container, innerContainer } from "./index.css.ts";
import { getResume } from "@/services/resumes.ts";
import { useResumeContext } from "./ResumeContext.tsx";

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
  experiences?: {
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
  const { resumeData, setResume, isLoading, setIsLoading, id } =
    useResumeContext();

  useEffect(() => {
    if (!id && isLoading) return;

    setIsLoading(false);

    const loadResumeData = async () => {
      const data = await getResume(id);

      if (data) {
        setResume(data);
      }
      setIsLoading(true);
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
        <ResumeCardRow
          lavel="이름"
          value={resumeData.user_info.name}
          widthType="half"
        />
        <ResumeCardRow
          lavel="생일"
          value={resumeData.user_info.birth_date}
          widthType="half"
        />
        <ResumeCardRow
          lavel="이메일"
          value={resumeData.user_info.email}
          widthType="half"
        />
        <ResumeCardRow
          lavel="연락처"
          value={resumeData.user_info.phone}
          widthType="half"
        />
        <ResumeCardRow
          lavel="성별"
          value={resumeData.user_info.gender_detail}
          widthType="half"
        />
        <ResumeCardRow
          lavel="병역 구분"
          value={resumeData.user_info.military_service_detail}
          widthType="half"
        />
        <ResumeCardRow
          lavel="주소"
          value={resumeData.user_info.address}
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
                subTile={`${educationItem.department} · ${educationItem.degree_level_detail}`}
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
            experienceItem.employment_status ? "현재" : experienceItem.end_date
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
            qualificationItem.score === ""
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
