import {
  landingContainer,
  header,
  headerWrapper,
  headerContainer,
  logoContainer,
  logoImage,
  mainSection,
  mainContainer,
  bannerContainer,
  bannerContent,
  bannerHeader,
  bannerTag,
  bannerTitle,
  bannerDescription,
  bannerButtonContainer,
  bannerImageContainer,
  bannerImage,
  footer,
  footerText,
  headerButton,
  bannerButton,
} from "./Landing.css";

import Button from "@/components/Button/Button";

import logoImageSrc from "@/assets/logos/logo-GAECHWI.svg";
import mainBannerImageSrc from "@/assets/images/landing/sample.png";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const handleStartClick = () => {
    navigate("/login");
  };

  return (
    <div className={landingContainer}>
      <header className={header}>
        <div className={headerWrapper}>
          <nav className={headerContainer}>
            <img
              src={logoImageSrc}
              alt="개취 - AI 기반 취업 지원 플랫폼"
              className={logoImage}
            />

            <Button
              widthStyle="fit"
              color="blue"
              text="시작하기"
              callback={handleStartClick}
              className={headerButton}
            />
          </nav>
        </div>
      </header>

      <main className={mainSection}>
        <div className={mainContainer}>
          <div className={bannerContainer}>
            <div className={bannerContent}>
              <header className={bannerHeader}>
                <span className={bannerTag}>AI 기반 취업 지원 플랫폼</span>
                <h1 id="hero-title" className={bannerTitle}>
                  AI가 코치하는
                  <br />
                  나만의 취업 루트
                </h1>
              </header>
              <p className={bannerDescription}>
                채용 공고부터 이력서 첨삭, 모의 면접, 학습 가이드까지
                <br />
                지원 기업에 맞춰 자동으로 최적화합니다.
                <br />
                나만의 취업 루트를 설계하세요!
              </p>
              <div className={bannerButtonContainer}>
                <Button
                  widthStyle="full"
                  color="blue"
                  text="시작하기"
                  callback={handleStartClick}
                  className={bannerButton}
                />
              </div>
            </div>
            <div
              className={bannerImageContainer}
              aria-label="서비스 소개 이미지"
            >
              <img
                src={mainBannerImageSrc}
                alt="노트북을 사용하고 있는 사람의 모습과 이력서를 든 로봇"
                className={bannerImage}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className={footer}>
        <p className={footerText}>© 2025 개취. All rights reserved.</p>
      </footer>
    </div>
  );
}
