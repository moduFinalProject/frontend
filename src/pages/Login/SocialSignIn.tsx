// import { Link } from "react-router-dom";
// import { useForm } from "@tanstack/react-form";
import {  } from "./SocialSignIn.css";
// import Button from "@/components/Button/Button";
// import logo from "@/assets/logo/logo.svg";

// interface UserDetailForm {
  
// }

// function loginProcess(formData: UserDetailForm): void {
//   // 로그인 로직
//   console.log("로그인 시도:", formData);
// }


export default function SocialSignIn() {
//   const form = useForm({
//     defaultValues: {
      
//     } as UserDetailForm,
//     onSubmit: async ({ value }) => {
//       // 백엔드 api 요청
//     },
//   });

  return (
    <>

    </>
    // <div className={loginContainer}>
    //   <div className={formWrapper}>
    //     <div className={logoSection}>
    //       <img src={logo} alt="개취 로고" />
    //     </div>

    //     <div className={formContent}>
    //       <hgroup className={titleSection}>
    //         <h1 className={heading}>로그인</h1>
    //         <p className={subHeading}>AI 기반 취업 지원 플랫폼에 오신 것을 환영합니다</p>
    //       </hgroup>

    //       <section className={formSection}>
    //         <form
    //           onSubmit={(e) => {
    //             e.preventDefault();
    //             e.stopPropagation();
    //             form.handleSubmit();
    //           }}
    //         >
    //           <fieldset className={fieldsetStyle}>
    //             <form.Field
    //               name="email"
    //               validators={{
    //                 onChange: ({ value }) => {
    //                   if (!value) {
    //                     return '이메일을 입력해주세요';
    //                   }
    //                   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    //                     return '올바른 이메일 형식을 입력해주세요';
    //                   }
    //                   return undefined;
    //                 },
    //               }}
    //               children={(field) => (
    //                 <div className={formGroup}>
    //                   <label htmlFor="email" className={formLabel}>이메일</label>
    //                   <input
    //                     id="email"
    //                     name={field.name}
    //                     type="email"
    //                     placeholder="your@email.com"
    //                     className={formInput}
    //                     value={field.state.value}
    //                     onChange={(e) => field.handleChange(e.target.value)}
    //                     onBlur={field.handleBlur}
    //                   />
    //                   {field.state.meta.errors && (
    //                     <div style={{ color: '#D4183D', fontSize: '12px', marginTop: '4px' }}>
    //                       {field.state.meta.errors.join(', ')}
    //                     </div>
    //                   )}
    //                 </div>
    //               )}
    //             />

    //             <form.Field
    //               name="password"
    //               validators={{
    //                 onChange: ({ value }) => {
    //                   if (!value) {
    //                     return '비밀번호를 입력해주세요';
    //                   }
    //                   if (value.length < 6) {
    //                     return '비밀번호는 최소 6자 이상이어야 합니다';
    //                   }
    //                   return undefined;
    //                 },
    //               }}
    //               children={(field) => (
    //                 <div className={formGroup}>
    //                   <label htmlFor="password" className={formLabel}>비밀번호</label>
    //                   <input
    //                     id="password"
    //                     name={field.name}
    //                     type="password"
    //                     placeholder="••••••••"
    //                     className={formInput}
    //                     value={field.state.value}
    //                     onChange={(e) => field.handleChange(e.target.value)}
    //                     onBlur={field.handleBlur}
    //                   />
    //                   {field.state.meta.errors && (
    //                     <div style={{ color: '#D4183D', fontSize: '12px', marginTop: '4px' }}>
    //                       {field.state.meta.errors.join(', ')}
    //                     </div>
    //                   )}
    //                 </div>
    //               )}
    //             />
    //           </fieldset>

    //           <Button
    //             widthStyle="full"
    //             color="blue"
    //             text="로그인"
    //             callback={() => {}}
    //             buttonType="submit"
    //             disabled={!form.state.isValid}
    //           />
    //         </form>
    //       </section>

    //       <div className={linkSection}>
    //         <Link to="/signup" className={linkSignup}>이메일로 회원가입</Link>
    //         <span>|</span>
    //         <Link to="/find-password" className={linkForgot}>비밀번호 찾기</Link>
    //       </div>

    //       <div className={dividerSection}>
    //         <h2 className={dividerText}>간편 로그인</h2>
    //       </div>

    //       <section className={socialSection}>
    //         <Button
    //           widthStyle="full"
    //           color="white"
    //           text="Google으로 계속하기"
    //           callback={() => {socialLogin("google")}}
    //           icon="GOOGLE"
    //         />
    //       </section>
    //     </div>
    //   </div>
    // </div>
  );
}
