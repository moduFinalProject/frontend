// API Base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://gaechwi.duckdns.org';

// API Response Types
export interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface SignUpResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Login with email and password
export async function loginWithEmail(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
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
}): Promise<SignUpResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Sign up failed');
  }

  return data;
}

// Get authenticated request helper
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem('access_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (accessToken) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  // If unauthorized, clear token and redirect to login
  if (response.status === 401) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  return response;
}
