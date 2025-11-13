import { Outlet, useMatch } from "react-router-dom";
import { Suspense } from "react";

import { container, header } from "./index.css.ts";
import ResumeTitle from "./components/ResumeTitle.tsx";
import { ResumeProvider } from "./ResumeContext.tsx";

// 초기값 구조
const initialResumeValues = {
  title: "",
  url: "",
  image_url: "",
  updated_at: "",
  user_info: {
    name: "",
    birth_date: "",
    email: "",
    phone: "",
    gender: "0",
    military_service: "0",
    address: "",
  },
  educations: [],
  self_introduction: "",
  experiences: [],
  projects: [],
  activities: [],
  technology_stacks: [],
  qualifications: [],
};

export default function Resume() {
  // const { id } = useParams();
  // const [resumeData, setResumeData] = useState();
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <ResumeProvider initialResumeData={initialResumeValues}>
      <div className={container}>
        <header className={header}>
          <ResumeTitle title="내 이력서" />
        </header>

        <Suspense fallback={<p>로딩 중...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </ResumeProvider>
  );
}
