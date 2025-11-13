// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://gaechwi.duckdns.org";

// API Response Types
export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface SignUpResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

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
  url?: string | null;
  title: string;
  company: string;
  end_date: string;
  qualification: string;
  prefer?: string | null;
  memo?: string | null;
}

// Login with email and password
export async function loginWithEmail(
  email: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "로그인에 실패했습니다.");
  }

  return data;
}

// Sign up with user information (after OAuth)
export async function signUpWithUserInfo(userInfo: {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  military_service: string;
  birth_date: string;
}): Promise<SignUpResponse> {
  // localStorage에 저장된 user 객체에서 OAuth 정보 가져오기
  const userStr = localStorage.getItem("user");
  const oauthUser = userStr ? JSON.parse(userStr) : {};

  const provider = oauthUser.provider;
  const provider_id = oauthUser.provider_id;
  const user_type = "1";

  const signUpData = {
    ...userInfo,
    user_type,
    provider,
    provider_id,
    birth_date: userInfo.birth_date,
  };

  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signUpData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "회원가입에 실패하였습니다.");
  }

  return data;
}

// Get authenticated request helper
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const access_token = localStorage.getItem("access_token");

  const headers = { ...options.headers } as Record<string, string>;

  if (access_token) {
    headers["Authorization"] = `Bearer ${access_token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // If unauthorized, clear token and redirect to login
  if (response.status === 401) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return response;
}

// Create a new job posting
export async function createJobPosting(
  jobPostingData: CreateJobPostingData
): Promise<JobPosting> {
  const response = await fetchWithAuth(`/job-postings/`, {
    method: "POST",
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

// Get all job postings
export async function getAllJobPostings(): Promise<JobPosting[]> {
  const response = await fetchWithAuth("/job-postings/", {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "채용 공고 목록을 불러오는데 실패했습니다."
    );
  }

  return data;
}

// Get a single job posting by ID
export async function getJobPostingById(
  postingId: number
): Promise<JobPosting> {
  const response = await fetchWithAuth(`/job-postings/${postingId}`, {
    method: "GET",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "채용 공고를 불러오는데 실패했습니다.");
  }

  return data;
}

// Update a job posting by ID
export async function updateJobPosting(
  postingId: number,
  jobPostingData: CreateJobPostingData
): Promise<JobPosting> {
  const response = await fetchWithAuth(`/job-postings/${postingId}`, {
    method: "PUT",
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

// Delete a job posting by ID
export async function deleteJobPosting(postingId: number): Promise<void> {
  const response = await fetchWithAuth(`/job-postings/${postingId}`, {
    method: "DELETE",
  });

  // 204 No Content는 성공이지만, 본문이 없으므로 .json()을 호출하면 안 됩니다.
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
