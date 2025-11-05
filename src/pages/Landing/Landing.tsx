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
} from "./Landing.css";

import Button from "@/components/Button/Button";

import logoImageSrc from "@/assets/logos/logo-GAECHWI.svg";
import mainBannerImageSrc from "@/assets/images/landing/sample.png";

export default function Landing() {
  const handleStartClick = () => {
    // 시작하기 버튼 클릭 핸들러
    console.log("시작하기 클릭");
  };

  return (
    <div className={landingContainer}>
      <header className={header}>
        <div className={headerWrapper}>
          <nav
            className={headerContainer}
            role="navigation"
            aria-label="메인 네비게이션"
          >
            <div className={logoContainer}>
              <img
                src={logoImageSrc}
                alt="개취 - AI 기반 취업 지원 플랫폼"
                className={logoImage}
              />
            </div>
            <Button
              widthStyle="fit"
              color="blue"
              text="시작하기"
              callback={handleStartClick}
            />
          </nav>
        </div>
      </header>

      <main className={mainSection}>
        <div className={mainContainer}>
          <section className={bannerContainer} aria-labelledby="hero-title">
            <article className={bannerContent}>
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
                />
              </div>
            </article>
            <aside
              className={bannerImageContainer}
              aria-label="서비스 소개 이미지"
            >
              <img
                src={mainBannerImageSrc}
                alt="개취 서비스 화면 - AI 기반 취업 지원 도구들"
                className={bannerImage}
              />
            </aside>
          </section>
        </div>
      </main>

      <footer className={footer}>
        <p className={footerText}>© 2025 개취. All rights reserved.</p>
      </footer>
    </div>
  );
}
