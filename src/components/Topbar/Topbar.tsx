import { topbar, topbarRight, userInfo, userAvatar, userDetails, userName, userEmail } from "./Topbar.css";
import { Button } from "@/components/Button";

export default function Topbar() {
  const user = {
    name: "김취업",
    email: "kim@example.com",
    initials: "김"
  };

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
        <div className={userInfo}>
          <div className={userAvatar}>
            {user.initials}
          </div>
          <div className={userDetails}>
            <p className={userName}>{user.name}</p>
            <p className={userEmail}>{user.email}</p>
          </div>
        </div>
      </section>

    </aside>
  );
}
