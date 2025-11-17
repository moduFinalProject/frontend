import { useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { fetchWithAuth } from "@/services/api";
import {
  dashboardContainer,
  headerSection,
  headerTitle,
  headerSubtitle,
  statsSection,
  statCard,
  statValue,
  statLabel,
  statHeader,
  statBadge,
  contentGrid,
  resumeContainer,
  sectionHeader,
  sectionTitle,
  resumeList as resumeListStyle,
  resumeItem,
  resumeItemTitle,
  resumeItemDate,
  featuredSection,
  featuredGrid,
  featuredItem,
  featuredCategory,
  featuredTitle,
  featuredTime,
  emptyState,
  emptyStateMessage,
} from "./Dashboard.css";
import Button from "@/components/Button/Button";

interface Resume {
  resume_id: string;
  title: string;
  updated_at: string;
}

interface Activity {
  action_type: string;
  description: string;
  created_at: string;
}

interface DashboardData {
  total_resumes: number;
  this_week_resumes: number;
  this_week_ai_feedback: number;
  total_job_postings: number;
  this_week_job_postings: number;
  recent_resumes: Resume[];
  recent_activities: Activity[];
}

interface User {
  name: string;
  email: string;
  [key: string]: any;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const user = useMemo(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
    return null;
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetchWithAuth("/dashboard");

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "대시보드 데이터 조회에 실패했습니다.");
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "데이터 조회 중 오류가 발생했습니다.";
        setError(errorMessage);
        console.error("Dashboard data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return `최근 수정 : ${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    } catch {
      return "날짜 정보 없음";
    }
  };

  // Format time helper
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "방금 전";
      if (diffMins < 60) return `${diffMins}분 전`;
      if (diffHours < 24) return `${diffHours}시간 전`;
      if (diffDays < 7) return `${diffDays}일 전`;
      return date.toLocaleDateString("ko-KR");
    } catch {
      return "시간 정보 없음";
    }
  };

  const handleResumeClick = (id: string) => {
    navigate(`/resume/${id}`);
  };

  const handleCreateResume = () => {
    navigate("/resume/new");
  };

  const handleFeaturedClick = (id: string) => {
    // Handle featured item navigation
    console.log("Featured item clicked:", id);
  };

  return (
    <div className={dashboardContainer}>
      {/* Header Section */}
      <header className={headerSection}>
        <h1 className={headerTitle}>안녕하세요, {user?.name || "사용자"} 개발자님!</h1>
        <p className={headerSubtitle}>오늘도 취업 준비 화이팅입니다!</p>
      </header>

      {/* Stats Section */}
      <section className={statsSection}>
        <div className={statCard} aria-label="저장된 이력서 통계">
          <div className={statHeader}>
            <p className={statLabel}>저장된 이력서</p>
            <span className={statBadge}>+{dashboardData?.this_week_resumes || 0}</span>
          </div>
          <p className={statValue}>{dashboardData?.total_resumes || 0}개</p>
        </div>
        <div className={statCard} aria-label="AI 첨삭 이용 통계">
          <div className={statHeader}>
            <p className={statLabel}>AI 첨삭 이용</p>
            <span className={statBadge}>이번 주</span>
          </div>
          <p className={statValue}>{dashboardData?.this_week_ai_feedback || 0}개</p>
        </div>
        <div className={statCard} aria-label="저장된 채용공고 통계">
          <div className={statHeader}>
            <p className={statLabel}>저장된 채용공고</p>
            <span className={statBadge}>+{dashboardData?.this_week_job_postings || 0}</span>
          </div>
          <p className={statValue}>{dashboardData?.total_job_postings || 0}개</p>
        </div>
      </section>

      {/* Content Grid */}
      <div className={contentGrid}>
        {/* Resume Section */}
        <section className={resumeContainer}>
          <div className={sectionHeader}>
            <h2 className={sectionTitle} aria-label="내 이력서 목록">내 이력서</h2>
            <Button
              widthStyle="fit"
              color="white"
              text="전체보기"
              callback={() => navigate("/resume")}
            />
          </div>
          {dashboardData?.recent_resumes && dashboardData.recent_resumes.length > 0 ? (
            <>
              <div className={resumeListStyle}>
                {dashboardData.recent_resumes.map((resume) => (
                  <div
                    key={resume.resume_id}
                    className={resumeItem}
                    onClick={() => handleResumeClick(resume.resume_id)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleResumeClick(resume.resume_id);
                      }
                    }}
                  >
                    <h3 className={resumeItemTitle}>{resume.title}</h3>
                    <p className={resumeItemDate}>{formatDate(resume.updated_at)}</p>
                  </div>
                ))}
              </div>
              <Button
                widthStyle="full"
                color="blue"
                text="새 이력서 작성하기"
                callback={handleCreateResume}
              />
            </>
          ) : (
            <div className={emptyState}>
              <p className={emptyStateMessage}>작성된 이력서가 없습니다.</p>
              <Button
                widthStyle="full"
                color="blue"
                text="새 이력서 작성하기"
                callback={handleCreateResume}
              />
            </div>
          )}
        </section>

        {/* Featured Section */}
        <section className={featuredSection}>
          <div className={sectionHeader}>
            <h2 className={sectionTitle} aria-label="최근 활동 목록">최근 활동</h2>
          </div>
          {dashboardData?.recent_activities && dashboardData.recent_activities.length > 0 ? (
            <div className={featuredGrid}>
              {dashboardData.recent_activities.map((activity, index) => (
                <div
                  key={index}
                  className={featuredItem}
                  onClick={() => handleFeaturedClick(String(index))}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleFeaturedClick(String(index));
                    }
                  }}
                >
                  <div className={featuredCategory}>{activity.action_type}</div>
                  <div>
                    <h3 className={featuredTitle}>{activity.description}</h3>
                    <p className={featuredTime}>{formatTime(activity.created_at)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={emptyState}>
              <p className={emptyStateMessage}>최근 활동이 없습니다.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
