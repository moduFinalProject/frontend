// 방법 1
// interface TextProps {
//   mode?: "text" | "textarea";
// }

// export default function JobPost({ mode = "text" }: TextProps) {
//   switch (mode) {
//     case "text":
//       return <Text />;
//     case "textarea":
//       return <Textarea />;
//   }
// }

// 사용법
// import JobPost from '@/pages/JobPost';
// <JobPost mode="form" />
// <JobPost mode="detail" jobId="123" />

// 방법 2
export { default as Textarea } from "./Textarea";
export { default } from "./Text"; // 기본 컴포넌트

// 사용법
// import { Textarea, Text } from '@/components/FormElem/text';
// 또는
// import Text, { Textarea } from '@/components/FormElem/text';
