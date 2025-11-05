import { header, headerLogo, headerRight } from "./Header.css";
import { Button } from "@/components/Button";
import logo from "@/assets/logo/logo.svg";

export default function Header() {return (
    <header className={header}>
      <img src={logo} alt="개취 로고" className={headerLogo}/>      
      <section className={headerRight}>
        <Button
          widthStyle="fit"
          color="none"
          text=""
          callback={()=>{alert("클릭")}}
          icon="ALAM"
        ></Button>
        <p>사용자</p>
      </section>
      
    </header>
  );
}
