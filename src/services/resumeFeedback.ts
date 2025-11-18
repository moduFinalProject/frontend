import { fetchWithAuth } from "./api";

export interface ResumeFeedback {
  feedback_id: number;
  company: string;
  resume_title: string;
  content_count: number;
  matching_rate: number;
}

export type MatchingLevel = "warning" | "info" | "success";

export function getMatchingLevel(matchingRate: number): MatchingLevel {
  if (matchingRate >= 80) return "success";
  if (matchingRate >= 60) return "info";
  return "warning";
}

export const getResumeFeedbackList = async (
  page: number
): Promise<ResumeFeedback[]> => {
  const response = await fetchWithAuth(
    `/resume_feedbacks/?page=${page}&page_size=6`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch resume feedback list");
  }

  return response.json();
};

export const getResumeFeedback = async (feedback_id: number) => {
  const response = await fetchWithAuth(
    `/resume_feedbacks/content/${feedback_id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch resume feedback");
  }

  return response.json();
};

export const deleteResumeFeedback = async (feedback_id: number) => {
  const response = await fetchWithAuth(`/resume_feedbacks/${feedback_id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete resume feedback");
  }

  return response.json();
};
