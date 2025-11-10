import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { loginContainer, formWrapper, formContent, logoSection, titleSection, formSection, linkSection, linkSignup, linkForgot, dividerSection, dividerText, socialSection, heading, subHeading, fieldsetStyle } from "./Login.css";
import Button from "@/components/Button/Button";
import Text from "@/components/FormElem/text/Text";
import logo from "@/assets/logo/logo.svg";
import { loginWithEmail } from "@/services/api";

// Zod 스키마 정의
const loginSchema = z.object({
  email: z.string()
    .min(1, "이메일을 입력해주세요")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식을 입력해주세요"),
  password: z.string()
    .min(1, "비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

type LoginForm = z.infer<typeof loginSchema>;

async function loginProcess(formData: LoginForm, navigate: ReturnType<typeof useNavigate>, setError: (error: string | null) => void, setLoading: (loading: boolean) => void): Promise<void> {
  try {
    setError(null);
    setLoading(true);

    const response = await loginWithEmail(formData.email, formData.password);

    // 로그인 성공 시 토큰 저장
    localStorage.setItem("access_token", response.accessToken);
    localStorage.setItem("user", JSON.stringify(response.user));

    // 대시보드로 이동
    navigate("/");
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "로그인에 실패했습니다";
    setError(errorMessage);
    console.error("Login error:", err);
  } finally {
    setLoading(false);
  }
}

// Google OAuth 2.0 설정
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '62731178017-jjj8blkivn8agl7gi99981km5ro2jpbp.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI || window.location.origin + '/frontend/googleCallback';

// 랜덤 state 값 생성 (CSRF 공격 방지)
function generateCryptoRandomState(): string {
  const randomValues = new Uint32Array(2);
  window.crypto.getRandomValues(randomValues);

  const utf8Encoder = new TextEncoder();
  const utf8Array = utf8Encoder.encode(
    String.fromCharCode.apply(null, Array.from(randomValues))
  );

  return btoa(String.fromCharCode.apply(null, Array.from(utf8Array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function socialLogin(social: string): void {
  switch (social) {
    case "google":
      googleOAuth2SignIn();
      break;
    default:
      break;
  }
}

function googleOAuth2SignIn(): void {
  // state 값 생성 및 로컬 스토리지에 저장
  const state = generateCryptoRandomState();
  localStorage.setItem('oauth2-state', state);

  // Google OAuth 2.0 엔드포인트
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // OAuth 2.0 파라미터
  const params = {
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email',
    state: state,
    include_granted_scopes: 'true',
    prompt: 'consent',
  };

  // URL 파라미터 생성
  const queryString = Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  // OAuth 2.0 서버로 리다이렉트
  window.location.href = `${oauth2Endpoint}?${queryString}`;
}

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    } as LoginForm,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      loginProcess(value, navigate, setError, setLoading);
    },
  });

  return (
    <div className={loginContainer}>
      <div className={formWrapper}>
        <div className={logoSection}>
          <img src={logo} alt="개취 로고" />
        </div>

        <div className={formContent}>
          <hgroup className={titleSection}>
            <h1 className={heading}>로그인</h1>
            <p className={subHeading}>AI 기반 취업 지원 플랫폼에 오신 것을 환영합니다</p>
          </hgroup>

          <section className={formSection}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <fieldset className={fieldsetStyle}>
                <form.Field
                  name="email"
                  children={(field) => (
                    <Text
                      label="이메일"
                      type="email"
                      placeholder="your@email.com"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(', ')}
                    />
                  )}
                />

                <form.Field
                  name="password"
                  children={(field) => (
                    <Text
                      label="비밀번호"
                      type="password"
                      placeholder="••••••••"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(', ')}
                    />
                  )}
                />
              </fieldset>

              {error && (
                <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              <Button
                widthStyle="full"
                color="blue"
                text={loading ? "로그인 중..." : "로그인"}
                callback={() => {}}
                buttonType="submit"
                disabled={!form.state.isValid || loading}
              />
            </form>
          </section>

          <div className={linkSection}>
            <Link to="/signup" className={linkSignup}>이메일로 회원가입</Link>
            <span>|</span>
            <Link to="/find-password" className={linkForgot}>비밀번호 찾기</Link>
          </div>

          <div className={dividerSection}>
            <h2 className={dividerText}>간편 로그인</h2>
          </div>

          <section className={socialSection}>
            <Button
              widthStyle="full"
              color="white"
              text="Google으로 계속하기"
              callback={() => {socialLogin("google")}}
              icon="GOOGLE"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
