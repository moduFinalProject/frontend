import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { saveAuthToken, saveUserInfo, removeOAuthState, getOAuthState } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";
import { loginWithGoogle, recoverDeletedUser } from "@/services/api";
import { Modal, Button } from "@/components";
import { modalDescription, modalTitle, modalSubtext, modalBenefits, buttonGroup, loadingText } from "./GoogleCallback.css";

interface DeletedUserData {
  is_active: boolean;
  is_new_user: boolean;
  access_token: string;
  user: any;
}

export default function GoogleCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setLoginToken } = useAuth();
  const [deletedUserData, setDeletedUserData] = useState<DeletedUserData | null>(null);
  const [isRecovering, setIsRecovering] = useState(false);

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

        // 탈퇴한 사용자 체크
        if (data["is_active"] === false && !data["is_new_user"]) {
          setDeletedUserData({
            is_active: data.is_active,
            is_new_user: data.is_new_user,
            access_token: data.access_token,
            user: data.user,
          });
          removeOAuthState();
          return;
        }

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
        toast.error("로그인 처리 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [searchParams, navigate, setLoginToken]);

  const handleRecoverUser = async () => {
    if (!deletedUserData) return;

    try {
      setIsRecovering(true);
      const result = await recoverDeletedUser(String(deletedUserData.user.user_id));

      // 복구 성공
      saveAuthToken(result.access_token, result.user);
      setLoginToken(true);
      toast.success("회원 정보가 복구되었습니다. 환영합니다!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("User recovery error:", err);
      toast.error("회원 정보 복구에 실패했습니다. 다시 시도해주시기 바랍니다.");
      navigate("/login");
    } finally {
      setIsRecovering(false);
    }
  };

  const handleCancelRecover = () => {
    setDeletedUserData(null);
    navigate("/login");
  };

  // 탈퇴 회원 복구 모달 렌더링
  return (
    <>
      <Modal
        isOpen={!!deletedUserData}
        onClose={handleCancelRecover}
        title="계정 복구"
        width={420}
        height={380}
      >
        <div className={modalDescription}>
          <p className={modalTitle}>
            탈퇴한 계정입니다
          </p>
          <p className={modalSubtext}>
            이전 정보를 복구하여 다시 서비스를 이용할 수 있습니다.
          </p>
          <div className={modalBenefits}>
            이전 이력서와 데이터 모두 복구됩니다
          </div>
        </div>
        <div className={buttonGroup}>
          <Button
            text={isRecovering ? "복구 중..." : "계정 복구하기"}
            color="blue"
            widthStyle="fit"
            callback={handleRecoverUser}
            disabled={isRecovering}
          />
          <Button
            text="지금은 안 할게요"
            color="gray"
            widthStyle="fit"
            callback={handleCancelRecover}
            disabled={isRecovering}
          />
        </div>
      </Modal>

      {!deletedUserData && <div className={loadingText}>로그인 처리 중...</div>}
    </>
  );
}
