import { ReactNode } from "react";
import { layoutContainer, layoutContent, layoutMain } from "./Layout.css";
import Header from "@/components/Header/Header";
import Topbar from "@/components/Topbar/Topbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={layoutContainer}>
      <Header />
      <div className={layoutContent}>
        <Topbar />
        <main className={layoutMain}>
          {children}
        </main>
      </div>
    </div>
  );
}
