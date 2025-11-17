import { useForm } from "@tanstack/react-form";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ResumeCard from "@/pages/Resume/components/card/ResumeCard";
import ResumeCardRow from "@/pages/Resume/components/card/ResumeCardRow";
import Text from "@/components/FormElem/text/Text";
import Select from "@/components/FormElem/text/Select";
import Button from "@/components/Button/Button";
import { signUpWithUserInfo } from "@/services/api";
import { saveAuthToken } from "@/services/auth";
import { useAuth } from "@/contexts/AuthContext";
import AgreementSection from "./components/AgreementSection";
import { TERMS_CONTENT, PRIVACY_CONTENT } from "./components/agreementTexts";

import {
  profileContainer,
  profileContent,
  profileHeader,
  headerText,
  headerTitle,
  headerSubtitle,
  agreementSection,
  errorAlert,
} from "./SocialSignUp.css";

// Zod 스키마 정의
const basicInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요").min(2, "이름은 2글자 이상이어야 합니다."),
  birth_date: z.string()
    .min(1, "생일을 입력해주세요")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "올바른 날짜 형식이 아닙니다. (형식: yyyy-MM-dd)")
    .refine((date) => {
      const [year, month, day] = date.split('-').map(Number);
      const currentYear = new Date().getFullYear();

      // 연도 검증: 1900 ~ 올해
      if (year < 1900 || year > currentYear) {
        return false;
      }

      // 월 검증: 01 ~ 12
      if (month < 1 || month > 12) {
        return false;
      }

      // 일 검증: 01 ~ 31
      if (day < 1 || day > 31) {
        return false;
      }

      // 해당 월의 마지막 날짜 검증
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) {
        return false;
      }

      return true;
    }, "올바른 날짜를 입력해주세요."),
  email: z.string()
    .min(1, "이메일을 입력해주세요")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다."),
  phone: z
    .string()
    .min(1, "연락처를 입력해주세요")
    .regex(
      /^010-\d{4}-\d{4}$/,
      "올바른 연락처 형식이 아닙니다. (예: 010-1234-5678)"
    ),
  gender: z.string().min(1, "성별을 선택해주세요"),
  address: z.string().min(1, "주소를 입력해주세요"),
  military_service: z.string().min(1, "병역을 선택해주세요"),
});

type ProfileData = z.infer<typeof basicInfoSchema>;

// 레이블 정의
const USER_INFO_LABELS: Record<string, string> = {
  name: "이름",
  birth_date: "생일",
  email: "이메일",
  phone: "연락처",
  gender: "성별",
  address: "주소",
  military_service: "병역",
};

export default function SocialSignIn() {
  const navigate = useNavigate();
  const { setLoginToken } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  // localStorage에서 user 정보 가져오기
  const userStr = localStorage.getItem('user');
  const oauthUser = userStr ? JSON.parse(userStr) : {};

  // 폼 생성
  const form = useForm({
    defaultValues: {
      name: oauthUser.name || "",
      birth_date: oauthUser.birth_date || "",
      email: oauthUser.email || "",
      phone: oauthUser.phone || "",
      gender: oauthUser.gender || "",
      address: oauthUser.address || "",
      military_service: oauthUser.military_service || "",
      user_type: oauthUser.user_type || "",
      provider: oauthUser.provider || "",
      provider_id: oauthUser.provider_id || "",
    } as ProfileData,
    validators: {
      onSubmit: basicInfoSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null);
        setLoading(true);

        const response = await signUpWithUserInfo(value);

        // 회원가입 성공 시 토큰 저장
        saveAuthToken(response.access_token, response.user);
        setLoginToken(true);

        // 대시보드로 이동
        navigate("/");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "회원가입에 실패했습니다";
        setError(errorMessage);
        console.error("Sign up error:", err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className={profileContainer}>
      <Helmet>
        <title>회원정보 설정 - 개취 | AI 기반 취업 지원 플랫폼</title>
        <meta name="description" content="소셜 로그인으로 개취에 가입하고 회원 기본정보를 설정하세요." />
      </Helmet>
      <div className={profileContent}>
        {/* 헤더 */}
        <div className={profileHeader}>
          <div className={headerText}>
            <h1 className={headerTitle}>회원정보 설정</h1>
            <p className={headerSubtitle}>회원 기본 정보를 설정해주세요</p>
          </div>
        </div>

        {/* 기본 정보 폼 */}
        <form
          id="socialSignInForm"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <ResumeCard title="기본 정보">
            {/* 이름 */}
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  const result = basicInfoSchema.shape.name.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Text
                    isMust
                    name="name"
                    label={USER_INFO_LABELS.name}
                    type="text"
                    placeholder="이름을 입력해주세요"
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                  />
                } />
              )}
            />

            {/* 생일 */}
            <form.Field
              name="birth_date"
              validators={{
                onChange: ({ value }) => {
                  const result = basicInfoSchema.shape.birth_date.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Text
                    isMust
                    name="birth_date"
                    label={USER_INFO_LABELS.birth_date}
                    type="date"
                    placeholder="생일을 입력해주세요"
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                  />
                } />
              )}
            />

            {/* 이메일 */}
            <form.Field
              name="email"
              validators={{
                onChange: ({ value }) => {
                  const result = basicInfoSchema.shape.email.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Text
                    isMust
                    name="email"
                    label={USER_INFO_LABELS.email}
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                  />
                } />
              )}
            />

            {/* 연락처 */}
            <form.Field
              name="phone"
              validators={{
                onChange: ({ value }) => {
                  const result = basicInfoSchema.shape.phone.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Text
                    isMust
                    name="phone"
                    label={USER_INFO_LABELS.phone}
                    type="tel"
                    placeholder="010-0000-0000"
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                  />
                } />
              )}
            />

            {/* 성별 */}
            <form.Field
              name="gender"
              validators={{
                onChange: ({ value }) => {
                  const result = basicInfoSchema.shape.gender.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Select
                    isMust
                    name="gender"
                    label={USER_INFO_LABELS.gender}
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="성별 선택"
                    options={[
                      { value: "1", label: "남" },
                      { value: "2", label: "여" },
                    ]}
                  />
                } />
              )}
            />

            {/* 병역 */}
            <form.Field
              name="military_service"
              validators={{
                onChange: ({ value }) => {
                  const result = basicInfoSchema.shape.military_service.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Select
                    isMust
                    name="military_service"
                    label={USER_INFO_LABELS.military_service}
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    placeholder="병역 선택"
                    options={[
                      { value: "1", label: "면제" },
                      { value: "2", label: "미필" },
                      { value: "3", label: "군필" },
                      { value: "4", label: "공익" },
                      { value: "5", label: "해당없음" },
                    ]}
                  />
                } />
              )}
            />

            {/* 주소 */}
            <form.Field
              name="address"
              validators={{
                onChange: ({ value }) => {
                  const result = basicInfoSchema.shape.address.safeParse(value);
                  return result.success ? undefined : result.error.issues[0].message;
                },
              }}
              children={(field) => (
                <ResumeCardRow widthType="full" input={
                  <Text
                    isMust
                    name="address"
                    label={USER_INFO_LABELS.address}
                    type="text"
                    placeholder="주소를 입력해주세요"
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                  />
                } />
              )}
            />            
          </ResumeCard>
        </form>

        {/* 약관 동의 섹션 */}
        <div className={agreementSection}>
          <AgreementSection
            title="이용약관 동의"
            isChecked={termsAgreed}
            onToggle={() => setTermsAgreed(!termsAgreed)}
            content={TERMS_CONTENT}
          />
          <AgreementSection
            title="개인정보 수집 동의"
            isChecked={privacyAgreed}
            onToggle={() => setPrivacyAgreed(!privacyAgreed)}
            content={PRIVACY_CONTENT}
          />
        </div>

        {/* 제출 버튼 */}
        <div>
          {error && (
            <div
              role="alert"
              aria-live="polite"
              className={errorAlert}
            >
              {error}
            </div>
          )}
          <Button
            widthStyle="full"
            color="blue"
            text={loading ? "회원가입 중..." : "회원가입"}
            buttonType="submit"
            form="socialSignInForm"
            callback={() => {}}
            disabled={!form.state.isValid || loading || !termsAgreed || !privacyAgreed}
          />
        </div>
      </div>
    </div>
  );
}
