import { z } from "zod";

export const MIN_LENGTH = 2;
export const MAX_LENGTH = 500;

const isArrayItemTrulyEmpty = (item: any, requiredKeys: string[]) => {
  return requiredKeys.every((key) => !item[key] || item[key] === "");
};

// 학력
export const educationItemSchema = z
  .object({
    organ: z
      .string()
      .trim()
      .min(MIN_LENGTH, "학교 이름을 입력하세요.")
      .regex(/^.+학교/, "oo학교 형식으로 입력하세요."),
    department: z
      .string()
      .trim()
      .min(MIN_LENGTH, "학과를 입력하세요.")
      .regex(/^.+과/, "oo과 형식으로 입력하세요."),
    degree_level: z.enum(["1", "2", "3", "4", "5"], "학위를 선택하세요."),
    score: z
      .string()
      .trim()
      .regex(/^.+점/, "00점 형식으로 입력하세요.")
      .optional(),
    start_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}$/, "입학년월을 입력하세요."),
    end_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}$/, "졸업년월을 입력하세요."),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);

      return startDate <= endDate;
    },
    {
      message: "입학년월은 졸업년월보다 늦을 수 없습니다.",
      path: ["end_date"],
    }
  );

export const educationSchema = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;

  const requiredKeys = [
    "organ",
    "department",
    "degree_level",
    "start_date",
    "end_date",
  ];

  return val.filter((item) => !isArrayItemTrulyEmpty(item, requiredKeys));
}, z.array(educationItemSchema).min(1, "학력은 최소 1개 이상 입력해야 합니다.").optional());

// 경력
export const experienceItemSchema = z.object({
  title: z.string().trim().min(MIN_LENGTH, "회사명을 입력하세요."),
  position: z.string().trim().min(MIN_LENGTH, "직책을 입력하세요."),
  start_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}$/, "입사년월을 입력하세요."),
  end_date: z
    .union([
      z.literal(null),
      z
        .string()
        .trim()
        .regex(/^\d{4}-\d{2}$/, "퇴사년월을 입력하세요.")
        .nullable(),
    ])
    .optional(),
  description: z
    .string()
    .trim()
    .min(MIN_LENGTH, "주요 업무 및 성과를 입력하세요."),
  department: z.string().trim().optional(),
});

export const experienceSchema = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;

  const requiredKeys = [
    "title",
    "position",
    "start_date",
    "end_date",
    "description",
  ];

  return val.filter((item) => !isArrayItemTrulyEmpty(item, requiredKeys));
}, z.array(experienceItemSchema).optional());

// 프로젝트
export const projectItemSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(MIN_LENGTH, `프로젝트 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`),
    description: z
      .string()
      .trim()
      .min(MIN_LENGTH, `프로젝트 내용을 ${MIN_LENGTH}글자 이상 입력하세요.`)
      .max(MAX_LENGTH, `프로젝트 내용을 ${MAX_LENGTH}글자 이하 입력하세요.`),
    start_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}$/, "시작년월을 입력하세요."),
    end_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}$/, "마감년월을 입력하세요."),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);

      return startDate <= endDate;
    },
    {
      message: "시작일은 마감일보다 늦을 수 없습니다.",
      path: ["end_date"],
    }
  );

export const projectSchema = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;

  const requiredKeys = ["title", "description", "start_date", "end_date"];

  return val.filter((item) => !isArrayItemTrulyEmpty(item, requiredKeys));
}, z.array(projectItemSchema).optional());

// 활동
export const activityItemSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(MIN_LENGTH, `활동 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`),
    description: z
      .string()
      .trim()
      .min(MIN_LENGTH, `활동 내용을 ${MIN_LENGTH}글자 이상 입력하세요.`)
      .max(MAX_LENGTH, `활동 내용을 ${MAX_LENGTH}글자 이하 입력하세요.`),
    start_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}$/, "입학년월을 입력하세요."),
    end_date: z
      .string()
      .trim()
      .regex(/^\d{4}-\d{2}$/, "졸업년월을 입력하세요."),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start_date);
      const endDate = new Date(data.end_date);

      return startDate <= endDate;
    },
    {
      message: "시작일은 마감일보다 늦을 수 없습니다.",
      path: ["end_date"],
    }
  );

export const activitySchema = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;

  const requiredKeys = ["title", "description", "start_date", "end_date"];

  return val.filter((item) => !isArrayItemTrulyEmpty(item, requiredKeys));
}, z.array(activityItemSchema).optional());

// 자격/어학
export const qualificationsItemSchema = z.object({
  qua_title: z
    .string()
    .trim()
    .min(
      MIN_LENGTH,
      `자격증 또는 어학 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
    ),
  organ: z
    .string()
    .trim()
    .min(
      MIN_LENGTH,
      `발급 및 주관기관 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`
    ),
  acquisition_date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}$/, "취득년월을 입력하세요."),
  score: z
    .union([
      z.literal(""), // 빈 문자열을 허용
      z
        .string()
        .trim()
        .regex(/^.+점$/, "00점 형식으로 입력하세요."),
    ])
    .optional(),
});

export const qualificationsSchema = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;

  const requiredKeys = ["qua_title", "organ", "acquisition_date"];

  return val.filter((item) => !isArrayItemTrulyEmpty(item, requiredKeys));
}, z.array(qualificationsItemSchema).optional());

// 기술스텍
export const technologyStackSchema = z.preprocess(
  (val) => {
    if (typeof val !== "string") {
      return val;
    }

    const processedArray = val
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    return processedArray.length > 0 ? processedArray : undefined;
  },

  z
    .array(z.string().trim().min(1, "스킬 이름을 입력하세요."))
    .superRefine((items, ctx) => {
      const duplicates = items.filter(
        (item, idx) => items.indexOf(item) !== idx
      );
      if (duplicates.length > 0) {
        const uniqueDuplicates = [...new Set(duplicates)];
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `중복된 스킬 항목이 있습니다: ${uniqueDuplicates.join(
            ", "
          )}`,
        });
      }
    })
    .nullable()
    .optional()
);

// 사진
export const photoUrlStringSchema = z
  .string()
  .trim()
  .min(MIN_LENGTH, "URL 또는 파일을 입력해야 합니다.")
  .refine(
    (val) => val.startsWith("data:image/") || val.startsWith("http"),
    "올바른 이미지 URL 형식(data:image/ 또는 http)을 선택해주세요"
  );
export const photoUrlFileSchema = z.instanceof(File).refine((file) => {
  console.log(file.type);
  return file.type.startsWith("image/");
}, "이미지 파일만 업로드할 수 있습니다.");

// 취합 스키마
export const basicInfoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(MIN_LENGTH, `이력서 이름을 ${MIN_LENGTH}글자 이상 입력하세요.`),
  // photoUrl: z.union([photoUrlFileSchema, photoUrlStringSchema]).optional(),
  user_info: z.object({
    name: z
      .string()
      .min(MIN_LENGTH, `이름은 ${MIN_LENGTH}글자 이상 입력하세요.`),
    email: z
      .string()
      .trim()
      .min(MIN_LENGTH, "이메일을 입력하세요.")
      .email("올바른 이메일 형식이 아닙니다."),
    phone: z
      .string()
      .trim()
      .min(MIN_LENGTH, "전화번호를 입력하세요.")
      .regex(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력하세요."),
    gender: z.enum(["1", "2"], "성별을 선택해주세요"),
    address: z
      .string()
      .trim()
      .min(MIN_LENGTH, "주소를 입력해주세요")
      .regex(/^.+시\s+.+구/, "주소는 'OO시 OO구' 형식으로 입력해주세요"),
    military_service: z.enum(
      ["1", "2", "3", "4", "5", "6"],
      "병역 여부를 선택해주세요"
    ),
  }),
  self_introduction: z
    .string()
    .max(MAX_LENGTH, `자기소개를 ${MAX_LENGTH}자 이하로 입력하세요.`)
    .optional(),
  education: educationSchema,
  experience: experienceSchema,
  project: projectSchema,
  activity: activitySchema,
  technology_stack: technologyStackSchema,
  qualifications: qualificationsSchema,
});
