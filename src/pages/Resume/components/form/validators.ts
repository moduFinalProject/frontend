import { z } from "zod";

export const educationItemSchema = z
  .object({
    organ: z
      .string()
      .min(1, "학교 이름을 입력하세요.")
      .regex(/^.+학교/, "oo학교 형식으로 입력하세요."),
    department: z
      .string()
      .min(1, "학과를 입력하세요.")
      .regex(/^.+과/, "oo과 형식으로 입력하세요."),
    degree_level: z.enum(["1", "2", "3", "4", "5"], "학위를 선택하세요."),
    score: z.string().regex(/^.+점/, "00점 형식으로 입력하세요.").optional(),
    start_date: z.string().regex(/^\d{4}-\d{2}$/, "입학년월을 입력하세요."),
    end_date: z.string().regex(/^\d{4}-\d{2}$/, "졸업년월을 입력하세요."),
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

export const experienceItemSchema = z
  .object({
    title: z.string().min(1, "회사명을 입력하세요."),
    position: z.string().min(1, "직책을 입력하세요."),
    start_date: z.string().regex(/^\d{4}-\d{2}$/, "입사년월을 입력하세요."),
    end_date: z.string().regex(/^\d{4}-\d{2}$/, "퇴사년월을 입력하세요."),
    description: z.string().min(1, "주요 업무 및 성과를 입력하세요."),
    department: z.string().optional(),
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

const isArrayItemTrulyEmpty = (item: any, requiredKeys: string[]) => {
  return requiredKeys.every((key) => !item[key] || item[key] === "");
};
export const educationSchema = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;

  // 교육 항목의 필수 문자열 키
  const requiredKeys = [
    "organ",
    "department",
    "degree_level",
    "start_date",
    "end_date",
  ];

  return val.filter((item) => !isArrayItemTrulyEmpty(item, requiredKeys));
}, z.array(educationItemSchema).min(1, "학력은 최소 1개 이상 입력해야 합니다.").optional());

export const experienceSchema = z.preprocess((val) => {
  if (!Array.isArray(val)) return val;

  // 경력 항목의 필수 문자열 키
  const requiredKeys = [
    "title",
    "position",
    "start_date",
    "end_date",
    "description",
  ];

  // 🚨 필터링: 필수 키가 모두 비어있는 항목은 제거
  return val.filter((item) => !isArrayItemTrulyEmpty(item, requiredKeys));
}, z.array(experienceItemSchema).optional());

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
    .array(z.string().min(1, "스킬 이름을 입력하세요."))
    .refine((items) => {
      const uniqueItems = new Set(items);
      return uniqueItems.size === items.length;
    }, "중복된 스킬 항목이 있습니다.")
    .optional()
);

const photoUrlStringSchema = z
  .string()
  .refine(
    (val) => val.startsWith("data:image/") || val.startsWith("http"),
    "올바른 이미지 URL 형식(data:image/ 또는 http)을 선택해주세요"
  );
const photoUrlFileSchema = z
  .instanceof(File)
  .refine(
    (file) => file.type.startsWith("image/"),
    "이미지 파일만 업로드할 수 있습니다."
  );

export const basicInfoSchema = z.object({
  title: z.string().min(1, "이력서 이름을 입력하세요."),
  photoUrl: z.union([photoUrlStringSchema, photoUrlFileSchema]),
  user_info: z.object({
    name: z.string().min(2, "이름은 두글자 이상 입력하세요."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    phone: z
      .string()
      .regex(/^010-\d{4}-\d{4}$/, "010-0000-0000 형식으로 입력하세요."),
    gender: z.enum(["1", "2"], "성별을 선택해주세요"),
    address: z
      .string()
      .min(6, "주소를 입력해주세요")
      .regex(/^.+시\s+.+구/, "주소는 'OO시 OO구' 형식으로 입력해주세요"),
    military_service: z.enum(
      ["1", "2", "3", "4", "5", "6"],
      "병역 여부를 선택해주세요"
    ),
  }),
  self_introduction: z.string().max(400, "400자 이하로 입력하세요.").optional(),
  education: educationSchema,
  experience: experienceSchema,
  project: z.array(educationItemSchema).optional(),
  activity: z.array(educationItemSchema).optional(),
  technology_stack: technologyStackSchema,
  qualifications: z.array(educationItemSchema).optional(),
});
