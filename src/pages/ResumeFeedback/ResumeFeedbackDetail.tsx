import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Feedback from "@/components/Feedback";
import { fetchWithAuth } from "@/services/api";

interface FeedbackData {
  feedback_id: number;
  parent_content: string;
  matching_rate: number;
  feedback_contents: Array<{
    feedback_devision: string;
    feedback_result: string;
    feedback_devision_detail: string;
  }>;
}

export default function ResumeFeedbackDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [feedbackData, setFeedbackData] = useState<FeedbackData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeedbackData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        setError(null);

        // 라우터 state에서 전달받은 데이터가 있으면 사용
        const locationState = location.state as { feedbackData?: FeedbackData } | null;
        if (locationState?.feedbackData) {
          setFeedbackData(locationState.feedbackData);
          setIsLoading(false);
          return;
        }

        // state가 없으면 API로 데이터 조회
        const response = await fetchWithAuth(`/resumeFeedback/${id}`);

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "첨삭 데이터 조회에 실패했습니다.");
        }

        const data = await response.json();
        setFeedbackData(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "데이터 조회 중 오류가 발생했습니다.";
        setError(errorMessage);
        console.error("Feedback data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedbackData();
  }, [id, location]);

  if (isLoading) {
    return <div style={{ padding: "20px", textAlign: "center" }}>로딩 중...</div>;
  }

  if (error) {
    return <div style={{ padding: "20px", color: "red" }}>에러: {error}</div>;
  }

  if (!feedbackData) {
    return <div style={{ padding: "20px" }}>첨삭 데이터가 없습니다.</div>;
  }

  return <Feedback type="feedback" isRecorrection={false} data={feedbackData} />;
}
