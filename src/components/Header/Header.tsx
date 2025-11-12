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
} from "./Header.css";
import logo from "@/assets/logo/logo.svg";
import { ICONS } from "@/constants/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuth } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";

interface MenuItem {
  id: string;
  menuName: string;
  menuIcon: keyof typeof ICONS;
  menuURL: string;
}

function MenuItemComponent({ item }: { item: MenuItem }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoginToken } = useAuth();
  const isActive = location.pathname === item.menuURL;
  const isLogout = item.id === "logout";

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    clearAuth();
    setLoginToken(false);
    // 랜딩 페이지로 이동
    navigate("/landing", { replace: true });
  };

  return (
    <li className={`${menuItem}`}>
      <Link
        to={item.menuURL}
        onClick={isLogout ? handleLogout : undefined}
        className={`${menuLink} ${isLogout ? logoutLink : ""} ${
          isActive ? menuItemActive : ""
        }`}
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
  const menuListTop: MenuItem[] = [
    {
      id: "dashboard",
      menuName: "대시보드",
      menuIcon: "DASHBOARD",
      menuURL: "/",
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
    {
      id: "interview",
      menuName: "AI 모의면접",
      menuIcon: "CHAT",
      menuURL: "/interview",
    },
    {
      id: "studyGuide",
      menuName: "학습 가이드",
      menuIcon: "STUDY",
      menuURL: "/studyGuide",
    },
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

  return (
    <>
      <nav className={header}>
        <img
          src={logo}
          alt="개취 로고"
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
    </>
  );
}
