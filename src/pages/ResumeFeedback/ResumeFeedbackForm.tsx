import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "@/components/FormElem/text/Select";
import Button from "@/components/Button/Button";
import { Modal } from "@/components/Modal";
import JobList from "@/pages/Jobs/JobList";
import FeedbackTitle from "./components/FeedbackTitle";
import { type JobPosting } from "@/services/jobs";
import { getResumeList } from "@/services/resumes";
import { fetchWithAuth } from "@/services/api";
import {
  container,
  headerWrapper,
  formSection,
  formGroup,
  helperText,
  stepSection,
  stepSectionTitle,
  stepSectionDesc,
  stepItem,
  stepNumber,
  stepContent,
  stepContentTitle,
  stepContentDesc,
  selectedJobCard,
  selectedJobCardHeader,
  selectedJobTitle,
  selectedJobCompany,
  formLabel,
  errorMessage,
  stepItemsContainer,
} from "./ResumeFeedbackForm.css";

interface Resume {
  resume_id: string;
  title: string;
}

interface FormData {
  jobId: string;
  resumeId: string;
}

interface ResumeOption {
  value: string;
  label: string;
}

export default function ResumeFeedbackForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    jobId: "",
    resumeId: "",
  });
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeOptions, setResumeOptions] = useState<ResumeOption[]>([]);
  const [resumeLoadError, setResumeLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadResumeOptions = async () => {
      try {
        setResumeLoadError(null);
        const data = await getResumeList({ page: 1 });

        if (isMounted && data && Array.isArray(data)) {
          const options = data.map((resume: Resume) => ({
            value: resume.resume_id,
            label: resume.title,
          }));
          setResumeOptions(options);
        }
      } catch (error) {
        console.error("이력서 목록 로드 중 에러:", error);
        if (isMounted) {
          setResumeOptions([]);
          setResumeLoadError(
            "이력서를 불러올 수 없습니다. 잠시 후 다시 시도해주세요."
          );
        }
      }
    };

    loadResumeOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleJobSelect = (job: JobPosting) => {
    setSelectedJob(job);
    setFormData({ ...formData, jobId: job.posting_id.toString() });
    if (errors.jobId) {
      setErrors({ ...errors, jobId: undefined });
    }
    setIsModalOpen(false);
  };

  const handleDeleteJob = () => {
    setSelectedJob(null);
    setFormData({ ...formData, jobId: "" });
    setErrors({ ...errors, jobId: "공고를 선택해주세요" });
  };

  const handleResumeChange = (value: string) => {
    setFormData({ ...formData, resumeId: value });
    if (errors.resumeId) {
      setErrors({ ...errors, resumeId: undefined });
    }
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.jobId) {
      newErrors.jobId = "공고를 선택해주세요";
    }

    if (!formData.resumeId) {
      newErrors.resumeId = "이력서를 선택해주세요";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);

      // API 호출: POST /resumeFeedback/posting/{resume_id}/{posting_id}
      const response = await fetchWithAuth(
        `/resume_feedbacks/posting/${formData.resumeId}/${formData.jobId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "첨삭 신청에 실패했습니다.");
      }

      const feedback = await response.json();

      // 첨삭 상세 페이지로 이동 (데이터와 함께 전달)
      navigate(`/resumeFeedback/${feedback.feedback_id}`, {
        state: { feedbackData: feedback },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "첨삭 신청 중 오류가 발생했습니다.";
      console.error("Feedback submission error:", error);
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="feedbackForm">
        <section className={formSection}>
          <h2>첨삭 정보 입력</h2>

          <div className={formGroup}>
            <label className={formLabel}>채용공고 *</label>
            {selectedJob ? (
              <article className={selectedJobCard}>
                <div className={selectedJobCardHeader}>
                  <p className={selectedJobTitle}>{selectedJob.title}</p>
                  <p className={selectedJobCompany}>{selectedJob.company}</p>
                </div>
                <Button
                  text="삭제"
                  color="white"
                  widthStyle="fit"
                  callback={handleDeleteJob}
                />
              </article>
            ) : (
              <Button
                text="공고 선택"
                color="white"
                widthStyle="full"
                callback={() => setIsModalOpen(true)}
              />
            )}
            {errors.jobId && (
              <p className={errorMessage} role="alert" aria-live="polite">
                {errors.jobId}
              </p>
            )}
            <p className={helperText}>
              채용공고를 선택하세요. 선택한 채용공고의 정보를 바탕으로 이력서를
              첨삭합니다.
            </p>
          </div>

          <div className={formGroup}>
            <Select
              label="기준 이력서"
              name="resumeId"
              placeholder="이력서를 선택하세요"
              value={formData.resumeId}
              onChange={handleResumeChange}
              error={errors.resumeId}
              isMust
              options={resumeOptions}
              disabled={resumeOptions.length === 0 || resumeLoadError !== null}
            />
            {resumeLoadError && (
              <p className={errorMessage} role="alert" aria-live="polite">
                {resumeLoadError}
              </p>
            )}
            {resumeOptions.length === 0 && !resumeLoadError && (
              <p className={errorMessage} role="alert" aria-live="polite">
                등록된 이력서가 없습니다.
              </p>
            )}
            <p className={helperText}>
              분석 기준이 될 이력서를 선택하세요. 선택한 이력서와 채용공고를
              비교하여 맞춤형 피드백을 받을 수 있습니다.
            </p>
          </div>

          <Button
            text={isLoading ? "첨삭 신청 중..." : "첨삭 신청하기"}
            color="blue"
            widthStyle="full"
            buttonType="submit"
            form="feedbackForm"
            callback={() => {}}
            disabled={isLoading}
          />
        </section>
      </form>

      <section className={stepSection}>
        <h2 className={stepSectionTitle}>이력서 첨삭 시작하기</h2>
        <p className={stepSectionDesc}>
          채용공고와 이력서를 선택하여 첨삭을 신청하면, AI가 해당 공고에서
          요구하는 핵심 키워드와 경력을 분석하여 맞춤형 첨삭 결과를 제공합니다.
        </p>

        <div className={stepItemsContainer}>
          <div
            className={stepItem}
            aria-label="1단계: 채용공고 선택, 등록된 공고에서 선택하기"
          >
            <div className={stepNumber} aria-hidden="true">
              1
            </div>
            <div className={stepContent}>
              <strong className={stepContentTitle}>채용공고 선택</strong>
              <p className={stepContentDesc}>등록된 공고에서 선택하기</p>
            </div>
          </div>

          <div
            className={stepItem}
            aria-label="2단계: 이력서 선택, 첨삭할 이력서 선택하기"
          >
            <div className={stepNumber} aria-hidden="true">
              2
            </div>
            <div className={stepContent}>
              <strong className={stepContentTitle}>이력서 선택</strong>
              <p className={stepContentDesc}>첨삭할 이력서 선택하기</p>
            </div>
          </div>

          <div
            className={stepItem}
            aria-label="3단계: AI 첨삭, 개선사항과 추천사항을 받아보세요"
          >
            <div className={stepNumber} aria-hidden="true">
              3
            </div>
            <div className={stepContent}>
              <strong className={stepContentTitle}>AI 첨삭</strong>
              <p className={stepContentDesc}>
                개선사항과 추천사항을 받아보세요
              </p>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="등록된 채용공고 선택"
        subtitle="관리하고 있는 채용공고 중 하나를 선택하세요."
        width={800}
        height={600}
      >
        <JobList isModal={true} onSelect={handleJobSelect} />
      </Modal>
    </>
  );
}
