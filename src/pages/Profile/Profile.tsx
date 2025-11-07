import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";
import {
  profileContainer,
  profileContent,
  profileHeader,
  headerText,
  headerTitle,
  headerSubtitle,
  card,
  cardTitle,
  formRow,
  formGroup,
  infoBox,
  infoLabel,
  infoValue,
  divider,
  warningText,
} from "./Profile.css";

import Input from "@/components/FormElem/text/Input";

// Zod 스키마 정의
const basicInfoSchema = z.object({
  name: z.string().min(2, "이름은 2글자 이상이어야 합니다."),
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  phone: z
    .string()
    .regex(
      /^010-\d{4}-\d{4}$/,
      "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)"
    ),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "현재 비밀번호를 입력하세요."),
    newPassword: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력하세요."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "새 비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function Profile() {
  const navigate = useNavigate();

  // 기본 정보 폼
  const basicInfoForm = useForm({
    defaultValues: {
      name: "김철수",
      email: "chulsoo@example.com",
      phone: "010-1234-5678",
    },
    onSubmit: async ({ value }) => {
      try {
        basicInfoSchema.parse(value);
        console.log("기본 정보 저장:", value);
        // TODO: API 호출
        alert("기본 정보가 저장되었습니다.");
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("검증 오류:", error.issues);
        }
      }
    },
  });

  // 비밀번호 변경 폼
  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        passwordSchema.parse(value);
        console.log("비밀번호 변경:", value);
        // TODO: API 호출
        alert("비밀번호가 변경되었습니다.");
        // 폼 초기화
        passwordForm.reset();
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.error("검증 오류:", error.issues);
        }
      }
    },
  });

  const handleDeleteAccount = () => {
    if (
      confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")
    ) {
      console.log("계정 삭제");
      // TODO: API 호출
    }
  };

  return (
    <div className={profileContainer}>
      <div className={profileContent}>
        {/* 헤더 */}
        <div className={profileHeader}>
          <Button
            text=""
            color="gray"
            widthStyle="fit"
            icon="PREV"
            callback={() => {
              navigate(-1);
            }}
          />

          <div className={headerText}>
            <h1 className={headerTitle}>프로필 설정</h1>
            <p className={headerSubtitle}>계정 정보 및 설정을 관리하세요</p>
          </div>
        </div>

        {/* 기본 정보 */}
        <div className={card}>
          <h2 className={cardTitle}>기본 정보</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              basicInfoForm.handleSubmit();
            }}
          >
            <div className={formGroup}>
              <div className={formRow}>
                <basicInfoForm.Field
                  name="name"
                  validators={{
                    onChange: ({ value }) => {
                      const result = z
                        .string()
                        .min(2, "이름은 2글자 이상이어야 합니다.")
                        .safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0].message;
                    },
                  }}
                >
                  {(field) => (
                    <Input
                      label="이름"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                    />
                  )}
                </basicInfoForm.Field>

                <basicInfoForm.Field
                  name="email"
                  validators={{
                    onChange: ({ value }) => {
                      const result = z
                        .string()
                        .email("올바른 이메일 형식이 아닙니다.")
                        .safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0].message;
                    },
                  }}
                >
                  {(field) => (
                    <Input
                      label="이메일"
                      type="email"
                      value={field.state.value}
                      onChange={field.handleChange}
                      onBlur={field.handleBlur}
                      error={field.state.meta.errors.join(", ")}
                    />
                  )}
                </basicInfoForm.Field>
              </div>

              <basicInfoForm.Field
                name="phone"
                validators={{
                  onChange: ({ value }) => {
                    const result = z
                      .string()
                      .regex(
                        /^010-\d{4}-\d{4}$/,
                        "올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)"
                      )
                      .safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0].message;
                  },
                }}
              >
                {(field) => (
                  <Input
                    label="연락처"
                    type="tel"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                  />
                )}
              </basicInfoForm.Field>

              <Button
                widthStyle="fit"
                color="blue"
                text="저장하기"
                buttonType="submit"
                callback={() => {}}
              />
            </div>
          </form>
        </div>

        {/* 비밀번호 변경 */}
        <div className={card}>
          <h2 className={cardTitle}>
            비밀번호 변경 ----현재 비밀번호 변경 불가----
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              passwordForm.handleSubmit();
            }}
          >
            <div className={formGroup}>
              <passwordForm.Field
                name="currentPassword"
                validators={{
                  onChange: ({ value }) => {
                    const result = z
                      .string()
                      .min(1, "현재 비밀번호를 입력하세요.")
                      .safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0].message;
                  },
                }}
              >
                {(field) => (
                  <Input
                    label="현재 비밀번호"
                    type="password"
                    placeholder="현재 비밀번호를 입력하세요"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    disabled={true}
                  />
                )}
              </passwordForm.Field>

              <passwordForm.Field
                name="newPassword"
                validators={{
                  onChange: ({ value }) => {
                    const result = z
                      .string()
                      .min(8, "비밀번호는 8자 이상이어야 합니다.")
                      .safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0].message;
                  },
                }}
              >
                {(field) => (
                  <Input
                    label="새 비밀번호"
                    type="password"
                    placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    disabled={true}
                  />
                )}
              </passwordForm.Field>

              <passwordForm.Field
                name="confirmPassword"
                validators={{
                  onChange: ({ value, fieldApi }) => {
                    const newPassword =
                      fieldApi.form.getFieldValue("newPassword");
                    if (value !== newPassword) {
                      return "새 비밀번호가 일치하지 않습니다.";
                    }
                    return undefined;
                  },
                }}
              >
                {(field) => (
                  <Input
                    label="새 비밀번호 확인"
                    type="password"
                    placeholder="새 비밀번호를 다시 입력하세요"
                    value={field.state.value}
                    onChange={field.handleChange}
                    onBlur={field.handleBlur}
                    error={field.state.meta.errors.join(", ")}
                    disabled={true}
                  />
                )}
              </passwordForm.Field>

              <Button
                widthStyle="fit"
                color="white"
                text="비밀번호 변경"
                buttonType="submit"
                callback={() => {}}
                disabled={true}
              />
            </div>
          </form>
        </div>

        {/* 계정 관리 */}
        <div className={card}>
          <h2 className={cardTitle}>계정 관리</h2>
          <div className={formGroup}>
            <div className={infoBox}>
              <p className={infoLabel}>회원 가입일</p>
              <p className={infoValue}>
                9999년 99월 99일 --------------수정필요----
              </p>
            </div>

            <div className={infoBox}>
              <p className={infoLabel}>마지막 로그인</p>
              <p className={infoValue}>0000년 99월 35일 오후 35:30</p>
            </div>

            <div className={divider} />

            <p className={warningText}>주의</p>
            <Button
              widthStyle="full"
              color="red"
              text="계정 삭제"
              callback={handleDeleteAccount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
