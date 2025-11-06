import { Link } from "react-router-dom";
import { loginContainer, formWrapper, formContent, logoSection, titleSection, formSection, formGroup, linkSection, linkSignup, linkForgot, dividerSection, dividerText, socialSection, heading, subHeading, formLabel, formInput, fieldsetStyle } from "./Login.css";
import Button from "@/components/Button/Button";
import logo from "@/assets/logo/logo.svg";

interface LoginForm {
  email: string;
  password: string;
}

function loginProcess(formData: LoginForm): void {
  // 로그인 로직
  console.log("로그인 시도:", formData);
}

export default function Login() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    loginProcess({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return (
    <div className={loginContainer}>
      <div className={formWrapper}>
        <div className={logoSection}>
          <img src={logo} alt="개취 로고" />
        </div>

        <div className={formContent}>
          <hgroup className={titleSection}>
            <h1 className={heading}>로그인</h1>
            <p className={subHeading}>AI 기반 취업 지원 플랫폼에 오신 것을 환영합니다</p>
          </hgroup>

          <section className={formSection}>
            <form onSubmit={handleSubmit}>
              <fieldset className={fieldsetStyle}>
                <div className={formGroup}>
                  <label htmlFor="email" className={formLabel}>이메일</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className={formInput}
                    required
                  />
                </div>

                <div className={formGroup}>
                  <label htmlFor="password" className={formLabel}>비밀번호</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className={formInput}
                    required
                  />
                </div>
              </fieldset>

              <Button
                widthStyle="full"
                color="blue"
                text="로그인"
                callback={() => {}}
                buttonType="submit"
              />
            </form>
          </section>

          <div className={linkSection}>
            <Link to="/signup" className={linkSignup}>이메일로 회원가입</Link>
            <span>|</span>
            <Link to="/find-password" className={linkForgot}>비밀번호 찾기</Link>
          </div>

          <div className={dividerSection}>
            <h2 className={dividerText}>간편 로그인</h2>
          </div>

          <section className={socialSection}>            
            <Button
              widthStyle="full"
              color="white"
              text="Google으로 계속하기"
              callback={() => {}}
              icon="GOOGLE"
            />
          </section>
        </div>
      </div>
    </div>
  );
}
