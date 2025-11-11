import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ResumeCard from "@/pages/Resume/components/card/ResumeCard";
import ResumeCardRow from "@/pages/Resume/components/card/ResumeCardRow";
import Text from "@/components/FormElem/text/Text";
import Select from "@/components/FormElem/text/Select";
import Button from "@/components/Button/Button";
import { signUpWithUserInfo } from "@/services/api";

import {
  profileContainer,
  profileContent,
  profileHeader,
  headerText,
  headerTitle,
  headerSubtitle,
} from "./SocialSignUp.css";

// Zod 스키마 정의
const basicInfoSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요").min(2, "이름은 2글자 이상이어야 합니다."),
  email: z.string()
    .min(1, "이메일을 입력해주세요")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "올바른 이메일 형식이 아닙니다."),
  phone: z
    .string()
    .min(1, "전화번호를 입력해주세요")
    .regex(
      /^010-\d{4}-\d{4}$/,
      "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)"
    ),
  gender: z.string().min(1, "성별을 선택해주세요"),
  address: z.string().min(1, "주소를 입력해주세요"),
  military_service: z.string().min(1, "군 복무 여부를 선택해주세요"),
});

type ProfileData = z.infer<typeof basicInfoSchema>;

// 레이블 정의
const USER_INFO_LABELS: Record<string, string> = {
  name: "이름",
  email: "이메일",
  phone: "전화번호",
  gender: "성별",
  address: "주소",
  military_service: "군 복무 여부",
};

export default function SocialSignIn() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // localStorage에서 user 정보 가져오기
  const userStr = localStorage.getItem('user');
  const oauthUser = userStr ? JSON.parse(userStr) : {};

  // 폼 생성
  const form = useForm({
    defaultValues: {
      name: oauthUser.name || "",
      email: oauthUser.email || "",
      phone: "",
      gender: "",
      address: "",
      military_service: "",
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

        console.log("Form value:", value);
        const response = await signUpWithUserInfo(value);

        // 회원가입 성공 시 토큰 저장
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("user", JSON.stringify(response.user));

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
                    error={field.state.meta.errors[0]?.message || ""}
                  />
                } />
              )}
            />

            {/* 이메일 */}
            <form.Field
              name="email"
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
                    error={field.state.meta.errors[0]?.message || ""}
                  />
                } />
              )}
            />

            {/* 전화번호 */}
            <form.Field
              name="phone"
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
                    error={field.state.meta.errors[0]?.message || ""}
                  />
                } />
              )}
            />

            {/* 성별 */}
            <form.Field
              name="gender"
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Select
                    isMust
                    name="gender"
                    label={USER_INFO_LABELS.gender}
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors[0]?.message || ""}
                    placeholder="성별 선택"
                    options={[
                      { value: "1", label: "남" },
                      { value: "2", label: "여" },
                    ]}
                  />
                } />
              )}
            />

            {/* 주소 */}
            <form.Field
              name="address"
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
                    error={field.state.meta.errors[0]?.message || ""}
                  />
                } />
              )}
            />

            {/* 군 복무 여부 */}
            <form.Field
              name="military_service"
              children={(field) => (
                <ResumeCardRow widthType="half" input={
                  <Select
                    isMust
                    name="military_service"
                    label={USER_INFO_LABELS.military_service}
                    value={field.state.value}
                    onChange={(value) => field.setValue(value)}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors[0]?.message || ""}
                    placeholder="군 복무 여부 선택"
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
          </ResumeCard>
        </form>

        {/* 제출 버튼 */}
        <div>
          {error && (
            <div style={{ color: "#ef4444", marginBottom: "16px", fontSize: "14px", textAlign: "center" }}>
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
            disabled={!form.state.isValid || loading}
          />
        </div>
      </div>
    </div>
  );
}
