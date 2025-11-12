/**
 * 인증 관련 로컬스토리지 작업을 담당하는 파일
 */

export function saveAuthToken(accessToken: string, user: any): void {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("user", JSON.stringify(user));
}

export function saveUserInfo(user: any, provider: string, providerId: string, userType: string): void {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("oauth_provider", provider);
  localStorage.setItem("oauth_provider_id", providerId);
  localStorage.setItem("oauth_user_type", userType);
}

export function clearAuth(): void {
  localStorage.clear();
}

export function getAccessToken(): string | null {
  return localStorage.getItem("access_token");
}

export function isLoggedIn(): boolean {
  return !!getAccessToken();
}

export function removeOAuthState(): void {
  localStorage.removeItem("oauth2-state");
}

export function saveOAuthState(state: string): void {
  localStorage.setItem("oauth2-state", state);
}

export function getOAuthState(): string | null {
  return localStorage.getItem("oauth2-state");
}
