import { z } from "zod";

export const educationItemSchema = z
  .object({
    organ: z.string().min(1, "학교 이름을 입력하세요."),
    department: z.string().min(1, "학과를 입력하세요."),
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
      path: ["end_date"], // 에러 메시지를 end_date 필드에 표시
    }
  );

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
    gender: z.enum(["남", "여"], "성별을 선택해주세요"),
    address: z
      .string()
      .min(6, "주소를 입력해주세요")
      .regex(/^.+시\s+.+구/, "주소는 'OO시 OO구' 형식으로 입력해주세요"),
    military_service: z.enum(
      ["미필", "군필", "해당없음"],
      "병역 여부를 선택해주세요"
    ),
  }),
  self_introduction: z.string().max(400, "400자 이하로 입력하세요.").optional(),
  education: z.array(educationItemSchema).optional(),
  technology_stack: technologyStackSchema,
});
