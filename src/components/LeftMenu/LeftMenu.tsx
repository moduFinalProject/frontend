import { leftMenu, menuContainer, menuBottom, menuItem, menuItemActive, menuLink } from "./LeftMenu.css";
import { Button } from "@/components/Button";
import { ICONS } from "@/constants/icons";
import { Link, useLocation  } from "react-router-dom";

interface MenuItem {
  id: string;
  menuName: string;
  menuIcon: keyof typeof ICONS;
  menuURL: string;
}

function MenuItemComponent({ item }: { item: MenuItem }) {
  const location = useLocation();
  const isActive = location.pathname === item.menuURL;

  return (
    <li className={`${menuItem} ${isActive ? menuItemActive:""}`}>    
      {item.menuIcon && <img src={ICONS[item.menuIcon]} alt={item.menuName} />}
      <Link to={item.menuURL} className={menuLink}>{item.menuName}</Link>
    </li>
  );
}

export default function LeftMenu() {
  const menuListTop: MenuItem[] = [
    {
      id: "dashboard",
      menuName: "대시보드",
      menuIcon: "DASHBOARD",
      menuURL: "/frontend/"
    },
    {
      id: "resume",
      menuName: "내 이력서",
      menuIcon: "RESUME",
      menuURL: "/frontend/resume"
    },
    {
      id: "jobPost",
      menuName: "채용공고 관리",
      menuIcon: "JOB",
      menuURL: "/frontend/jobPost"
    },
    {
      id: "resumeFeedbackHis",
      menuName: "공고별 첨삭 이력",
      menuIcon: "CHECK",
      menuURL: "/frontend/resumeFeedbackHis"
    },
    {
      id: "interview",
      menuName: "AI 모의면접",
      menuIcon: "CHAT",
      menuURL: "/frontend/interview"
    },
    {
      id: "studyGuide",
      menuName: "학습 가이드",
      menuIcon: "STUDY",
      menuURL: "/frontend/studyGuide"
    }
  ]

  const menuListBottom: MenuItem[] = [    
    {
      id: "profile",
      menuName: "프로필",
      menuIcon: "PROFILE",
      menuURL: "/frontend/profile"
    },
    {
      id: "logout",
      menuName: "로그아웃",
      menuIcon: "LOGOUT",
      menuURL: "/logout"
    }
  ]

  return (
    <nav className={leftMenu}>
      <ul className={menuContainer}>
        {menuListTop.map(item => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </ul>
      <ul className={`${menuContainer} ${menuBottom}`}>
        {menuListBottom.map(item => (
          <MenuItemComponent key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
