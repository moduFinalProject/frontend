import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";
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
  id: string;
  title: string;
  date: string;
}

interface FeaturedItem {
  id: string;
  category: string;
  title: string;
  time: string;
}

interface User {
  name: string;
  email: string;
  [key: string]: any;
}

export default function Dashboard() {
  const navigate = useNavigate();

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

  // Mock data
  const resumes: Resume[] = [
    {
      id: "1",
      title: "포트폴리오 이력서",
      date: "최근 수정 : 2024.11.10",
    },
    {
      id: "2",
      title: "신입 개발자 이력서",
      date: "최근 수정 : 2024.10.15",
    },
    {
      id: "3",
      title: "경력직 이력서",
      date: "최근 수정 : 2024.10.28",
    },
  ];

  const featuredItems: FeaturedItem[] = [
    {
      id: "1",
      category: "이력서 첨삭",
      title: "네이버 프론트엔드 개발자 지원용",
      time: "2시간 전",
    },
    {
      id: "2",
      category: "이력서 첨삭",
      title: "네이버 프론트엔드 개발자 지원용",
      time: "2시간 전",
    },
    {
      id: "3",
      category: "이력서 첨삭",
      title: "네이버 프론트엔드 개발자 지원용",
      time: "2시간 전",
    },
  ];

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
      <Helmet>
        <title>대시보드 - 개취 | AI 기반 취업 지원 플랫폼</title>
        <meta name="description" content="개취 대시보드에서 이력서, 채용공고, AI 첨삭 현황을 한눈에 확인하세요." />
      </Helmet>
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
            <span className={statBadge}>+2</span>
          </div>
          <p className={statValue}>3개</p>
        </div>
        <div className={statCard} aria-label="AI 첨삭 이용 통계">
          <div className={statHeader}>
            <p className={statLabel}>AI 첨삭 이용</p>
            <span className={statBadge}>이번 주</span>
          </div>
          <p className={statValue}>12개</p>
        </div>
        <div className={statCard} aria-label="저장된 채용공고 통계">
          <div className={statHeader}>
            <p className={statLabel}>저장된 채용공고</p>
            <span className={statBadge}>+2</span>
          </div>
          <p className={statValue}>4개</p>
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
          {resumes.length > 0 ? (
            <>
              <div className={resumeListStyle}>
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    className={resumeItem}
                    onClick={() => handleResumeClick(resume.id)}
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleResumeClick(resume.id);
                      }
                    }}
                  >
                    <h3 className={resumeItemTitle}>{resume.title}</h3>
                    <p className={resumeItemDate}>{resume.date}</p>
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
          {featuredItems.length > 0 ? (
            <div className={featuredGrid}>
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  className={featuredItem}
                  onClick={() => handleFeaturedClick(item.id)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleFeaturedClick(item.id);
                    }
                  }}
                >
                  <div className={featuredCategory}>{item.category}</div>
                  <div>
                    <h3 className={featuredTitle}>{item.title}</h3>
                    <p className={featuredTime}>{item.time}</p>
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
