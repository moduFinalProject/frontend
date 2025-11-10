import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        // URL parameter code and state extraction
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const errorParam = searchParams.get("error");
        
        // Error handling
        if (errorParam) {
          console.error("Google OAuth error:", errorParam);
          navigate("/login");
          return;
        }

        // code not received
        if (!code) {
          console.error("Failed to receive authentication code");
          navigate("/login");
          return;
        }

        // CSRF attack prevention: state value validation
        const savedState = localStorage.getItem("oauth2-state");
        if (state !== savedState) {
          console.error("State value mismatch (CSRF attack detected)");
          localStorage.removeItem("oauth2-state");
          navigate("/login");
          return;
        }

        // 서버에 토큰 인증 및 로그인 요청
        const response = await fetch("https://gaechwi.duckdns.org/auth/google", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "An error occurred during login processing");
        }

        // 최초 사용자는 추가정보 입력 페이지 이동
        if(data.is_new_user) {
            navigate("/socialSignIn");
        }

        // 로그인 성공 시 토큰 저장
        localStorage.setItem("access_token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.removeItem("oauth2-state"); 
        
        // 기존 사용자면 대시보드 이동
        navigate("/");
      } catch (err) {
        console.error("Error processing Google callback:", err);
        // 에러 발생 시 알림 후 로그인 페이지로 이동
        alert("로그인 처리 중 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.\n문제가 계속되면 고객 지원팀에 문의해주시기 바랍니다.");
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate]);

  return <div style={{ padding: "20px", textAlign: "center" }}>로그인 처리 중...</div>;
}
