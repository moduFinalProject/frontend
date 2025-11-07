import { z } from "zod";

export const basicInfoSchema = z.object({
  user_info: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().regex(/^010-\d{4}-\d{4}$/),
  }),
  url: z.string().url(),
});

export function validateTechStack({ value }: { value: string }) {
  if (!value) return;
  const items = value
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
  const duplicates = items.filter((v, i) => items.indexOf(v) !== i);
  return duplicates.length
    ? `중복된 항목이 있습니다: ${[...new Set(duplicates)].join(", ")}`
    : undefined;
}
