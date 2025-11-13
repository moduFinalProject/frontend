import { fetchWithAuth } from "./api";

export interface JobPosting {
  url: string | null;
  title: string;
  company: string;
  qualification: string;
  prefer: string | null;
  memo: string | null;
  end_date: string | null;
  posting_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateJobPostingData {
  url: string;
  title: string;
  company: string;
  end_date: string;
  qualification: string;
  prefer: string;
  memo: string;
}

const JSON_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
} as const;

export async function getAllJobPostings(): Promise<JobPosting[]> {
  const response = await fetchWithAuth("/job-postings/", {
    method: "GET",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(
      data.message || "채용 공고 목록을 불러오는데 실패했습니다."
    );
  }

  return response.json();
}

export async function getJobPostingById(
  postingId: number
): Promise<JobPosting> {
  const response = await fetchWithAuth(`/job-postings/${postingId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "채용 공고를 불러오는데 실패했습니다.");
  }

  return response.json();
}

export async function createJobPosting(
  jobPostingData: CreateJobPostingData
): Promise<JobPosting> {
  const response = await fetchWithAuth(`/job-postings/`, {
    method: "POST",
    headers: JSON_HEADERS,
    body: JSON.stringify(jobPostingData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data.detail?.[0]?.msg || data.message || "채용 공고 생성에 실패했습니다.";
    throw new Error(errorMessage);
  }

  return data;
}

export async function updateJobPosting(
  postingId: number,
  jobPostingData: CreateJobPostingData
): Promise<JobPosting> {
  const response = await fetchWithAuth(`/job-postings/${postingId}`, {
    method: "PUT",
    headers: JSON_HEADERS,
    body: JSON.stringify(jobPostingData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data.detail?.[0]?.msg || data.message || "채용 공고 수정에 실패했습니다.";
    throw new Error(errorMessage);
  }

  return data;
}

export async function deleteJobPosting(postingId: number): Promise<void> {
  const response = await fetchWithAuth(`/job-postings/${postingId}`, {
    method: "PATCH",
  });

  if (response.status === 204) {
    return;
  }

  if (!response.ok) {
    const data = await response.json();
    const errorMessage =
      data.detail?.[0]?.msg || data.message || "채용 공고 삭제에 실패했습니다.";
    throw new Error(errorMessage);
  }
}
