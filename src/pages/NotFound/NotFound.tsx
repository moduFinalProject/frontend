import {
  notFoundContainer,
  notFoundContent,
  notFoundImage,
  notFoundTitle,
  notFoundDescription,
  notFoundButtonContainer,
} from "./NotFound.css";

import Button from "@/components/Button/Button";

import { useNavigate } from "react-router-dom";

import notFoundImageSrc from "@/assets/images/404/404.svg";

export default function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    const canGoBack = window.history.length > 1;
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={notFoundContainer}>
      <main
        className={notFoundContent}
        role="main"
        aria-labelledby="error-title"
      >
        <img
          src={notFoundImageSrc}
          alt="404 에러 - 페이지를 찾을 수 없습니다"
          className={notFoundImage}
          role="img"
        />
        <h1 id="error-title" className={notFoundTitle}>
          페이지를 찾을 수 없습니다
        </h1>
        <p className={notFoundDescription}>
          앗, 이 페이지는 없는 것 같아요. 주소를 다시 확인하거나 메인 페이지로
          돌아가주세요.
        </p>
        <nav className={notFoundButtonContainer} aria-label="페이지 이동 옵션">
          <Button
            widthStyle="fit"
            color="blue"
            text="메인으로"
            callback={handleGoHome}
          />
          <Button
            widthStyle="fit"
            color="white"
            text="이전 페이지"
            callback={handleGoBack}
          />
        </nav>
      </main>
    </div>
  );
}
