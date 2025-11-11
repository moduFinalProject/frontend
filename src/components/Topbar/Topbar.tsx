import { topbar, topbarRight, userInfo, userDetails, userName, userEmail } from "./Topbar.css";
import { Button } from "@/components/Button";
import { useMemo } from "react";

export default function Topbar() {
  const user = useMemo(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error("Failed to parse user from localStorage:", e);
      }
    }
    return null;
  }, []);

  return (
    <aside className={topbar}>
      <section className={topbarRight}>
        <Button
          widthStyle="fit"
          color="none"
          text=""
          callback={()=>{alert("클릭")}}
          icon="ALAM"
        ></Button>
        {user && (
          <div className={userInfo}>
            <div className={userDetails}>
              <p className={userName}>{user.name}</p>
              <p className={userEmail}>{user.email}</p>
            </div>
          </div>
        )}
      </section>
    </aside>
  );
}
