// API Base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://gaechwi.duckdns.org";

// Loading state management
let loadingStateCallback: ((isLoading: boolean) => void) | null = null;

export function setLoadingStateCallback(callback: (isLoading: boolean) => void) {
  loadingStateCallback = callback;
}

function setLoading(isLoading: boolean) {
  if (loadingStateCallback) {
    loadingStateCallback(isLoading);
  }
}

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

// Google OAuth Login
export interface GoogleLoginResponse {
  access_token: string;
  user: {
    id: string;
    name: string;
    email: string;
    provider: string;
    provider_id: string;
  };
  is_new_user: boolean;
}

export async function loginWithGoogle(
  code: string,
  isLocal: boolean = false
): Promise<GoogleLoginResponse> {
  setLoading(true);
  try {
    const googleLoginUrl = isLocal
      ? "https://gaechwi.duckdns.org/auth/google/localhost"
      : "https://gaechwi.duckdns.org/auth/google";

    const response = await fetch(googleLoginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Google 로그인에 실패했습니다.");
    }

    return data;
  } finally {
    setLoading(false);
  }
}

// 진행 중인 요청 개수를 추적
let activeRequests = 0;

// Get authenticated request helper
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  // 첫 요청 시작 시 로딩 상태 활성화
  activeRequests++;
  if (activeRequests === 1) {
    setLoading(true);
  }

  try {
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
  } finally {
    // 모든 요청이 끝나면 로딩 상태 비활성화
    activeRequests--;
    if (activeRequests === 0) {
      setLoading(false);
    }
  }
}
