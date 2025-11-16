import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { saveAuthToken, saveUserInfo, removeOAuthState, getOAuthState } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";
import { loginWithGoogle } from "@/services/api";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLoginToken } = useAuth();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // URL parameter code and state extraction
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const errorParam = searchParams.get("error");
        const savedState = getOAuthState();

        // Error handling
        if (errorParam) {
          throw new Error(errorParam);
        }
        if (!code) {
          throw new Error("Failed to receive authentication code");
        }
        if (state !== savedState) {
          removeOAuthState();
          throw new Error("State value mismatch (CSRF attack detected)");
        }

        const isLocal =
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1";

        // Google 로그인 API 호출 (로딩은 api.ts에서 자동 처리)
        const data = await loginWithGoogle(code, isLocal);

        // 최초 사용자는 OAuth 정보를 localStorage에 저장
        if (data["is_new_user"]) {
          saveUserInfo(
            data.user,
            data.user.provider || "google",
            data.user.provider_id || "",
            "1"
          );
          removeOAuthState();
          navigate("/socialSignUp");
          return;
        }

        // 기존 사용자 로그인 성공 시 토큰 저장
        saveAuthToken(data.access_token, data.user);
        setLoginToken(true);
        removeOAuthState();
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Error processing Google callback:", err);
        // 에러 발생 시 알림 후 로그인 페이지로 이동
        alert(
          "로그인 처리 중 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.\n문제가 계속되면 고객 지원팀에 문의해주시기 바랍니다."
        );
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, setLoginToken]);

  return <div style={{ padding: "20px", textAlign: "center" }}>로그인 처리 중...</div>;
}
