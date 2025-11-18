import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  header,
  headerLogo,
  menuContainer,
  menuUi,
  menuBottom,
  menuItem,
  menuItemActive,
  menuLink,
  logoutLink,
  mobileMenuOverlay,
  headerMobile,
  mobileMenuPanel,
  mobileMenuPanelClosing,
  mobileMenuOverlayClosing,
} from "./Header.css";
import logo from "@/assets/logo/logo.svg";
import { ICONS } from "@/constants/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuth } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button/Button";

// 모바일 메뉴 애니메이션 시간 (700ms)
const ANIMATION_DURATION_MS = 700;

interface MenuItem {
  id: string;
  menuName: string;
  menuIcon: keyof typeof ICONS;
  menuURL: string;
}

interface MenuItemComponentProps {
  item: MenuItem;
  onNavigate?: () => void;
}

function MenuItemComponent({ item, onNavigate }: MenuItemComponentProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoginToken } = useAuth();
  const isActive = location.pathname === item.menuURL;
  const isLogout = item.id === "logout";

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    clearAuth();
    setLoginToken(false);
    toast.success("로그아웃되었습니다.");
    // 랜딩 페이지로 이동
    navigate("/landing", { replace: true });
    onNavigate?.();
  };

  const handleNavigation = () => {
    onNavigate?.();
  };

  return (
    <li className={`${menuItem}`}>
      <Link
        to={item.menuURL}
        onClick={isLogout ? handleLogout : handleNavigation}
        className={`${menuLink} ${isLogout ? logoutLink : ""} ${
          isActive ? menuItemActive : ""
        }`}
        aria-current={isActive ? "page" : undefined}
      >
        {item.menuIcon && (
          <img src={ICONS[item.menuIcon]} alt={item.menuName} />
        )}
        {item.menuName}
      </Link>
    </li>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const menuListTop: MenuItem[] = [
    {
      id: "dashboard",
      menuName: "대시보드",
      menuIcon: "DASHBOARD",
      menuURL: "/dashboard",
    },
    {
      id: "resume",
      menuName: "내 이력서",
      menuIcon: "RESUME",
      menuURL: "/resume",
    },
    {
      id: "jobs",
      menuName: "채용공고",
      menuIcon: "JOB",
      menuURL: "/jobs",
    },
    {
      id: "resumeFeedback",
      menuName: "공고별 첨삭 이력",
      menuIcon: "CHECK",
      menuURL: "/resumeFeedback",
    },
    // {
    //   id: "interview",
    //   menuName: "AI 모의면접",
    //   menuIcon: "CHAT",
    //   menuURL: "/interview",
    // },
    // {
    //   id: "studyGuide",
    //   menuName: "학습 가이드",
    //   menuIcon: "STUDY",
    //   menuURL: "/studyGuide",
    // },
  ];

  const menuListBottom: MenuItem[] = [
    {
      id: "profile",
      menuName: "프로필",
      menuIcon: "PROFILE",
      menuURL: "/profile",
    },
    {
      id: "logout",
      menuName: "로그아웃",
      menuIcon: "LOGOUT",
      menuURL: "/logout",
    },
  ];

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsClosing(true);
    // 애니메이션 완료 후 메뉴 닫기
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, ANIMATION_DURATION_MS);
  };

  // Escape 키로 모바일 메뉴 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen && !isClosing) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [isMobileMenuOpen, isClosing]);

  return (
    <>
      {/* 데스크톱 헤더 */}
      <nav className={header}>
        <img
          src={logo}
          alt="개취 - 취업 준비 플랫폼 홈"
          className={headerLogo}
          onClick={handleLogoClick}
        />
        <div className={menuContainer}>
          <ul className={menuUi}>
            {menuListTop.map((item) => (
              <MenuItemComponent key={item.id} item={item} />
            ))}
          </ul>
          <ul className={`${menuUi} ${menuBottom}`}>
            {menuListBottom.map((item) => (
              <MenuItemComponent key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      {/* 모바일 헤더 */}
      <div className={headerMobile}>
        {!isMobileMenuOpen && !isClosing && (
          <Button
            widthStyle="fit"
            color="none"
            text=""
            callback={toggleMobileMenu}
            icon="HAMBURGER"
            ariaLabel="메뉴 토글"
          />
        )}
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {(isMobileMenuOpen || isClosing) && (
        <div
          className={isClosing ? mobileMenuOverlayClosing : mobileMenuOverlay}
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* 모바일 메뉴 */}
      {(isMobileMenuOpen || isClosing) && (
        <nav className={isClosing ? mobileMenuPanelClosing : mobileMenuPanel}>
          <img
            src={logo}
            alt="개취 - 취업 준비 플랫폼 홈"
            className={headerLogo}
            onClick={() => {
              handleLogoClick();
              closeMobileMenu();
            }}
          />
          <div className={menuContainer}>
            <ul className={menuUi}>
              {menuListTop.map((item) => (
                <MenuItemComponent key={item.id} item={item} onNavigate={closeMobileMenu} />
              ))}
            </ul>
            <ul className={`${menuUi} ${menuBottom}`}>
              {menuListBottom.map((item) => (
                <MenuItemComponent key={item.id} item={item} onNavigate={closeMobileMenu} />
              ))}
            </ul>
          </div>
        </nav>
      )}
    </>
  );
}
