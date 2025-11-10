import { topbar, topbarRight, userInfo, userDetails, userName, userEmail } from "./Topbar.css";
import { Button } from "@/components/Button";

export default function Topbar() {
  const user = {
    name: "김취업",
    email: "kim@example.com",
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
          <div className={userDetails}>
            <p className={userName}>{user.name}</p>
            <p className={userEmail}>{user.email}</p>
          </div>
        </div>
      </section>

    </aside>
  );
}
