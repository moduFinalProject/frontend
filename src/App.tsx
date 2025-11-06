import { Routes, Route } from "react-router-dom";
import { themeClass } from "@/design-system";
import { vars } from "@/design-system";

import Header from "@/components/Header/Header";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import Footer from "@/components/Footer/Footer";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";

import Resume from "@/pages/Resume";
import ResumeList from "@/pages/Resume/ResumeList";
import ResumeDetail from "@/pages/Resume/ResumeDetail";
import ResumeCorrection from "@/pages/Resume/ResumeCorrection";
import ResumeForm from "@/pages/Resume/ResumeForm";

// 임시 페이지
const Dashboard = () => (
  <div
    style={{
      marginLeft: "15%",
      width: "85%",
      padding: "20px",
      borderTop: `1px solid ${vars.color.line}`,
    }}
  >
    대시보드 페이지
  </div>
);
const JobPost = () => (
  <div
    style={{
      marginLeft: "15%",
      width: "85%",
      padding: "20px",
      borderTop: `1px solid ${vars.color.line}`,
    }}
  >
    채용공고 관리 페이지
  </div>
);
const ResumeFeedbackHis = () => (
  <div
    style={{
      marginLeft: "15%",
      width: "85%",
      padding: "20px",
      borderTop: `1px solid ${vars.color.line}`,
    }}
  >
    공고별 첨삭 이력 페이지
  </div>
);
const Interview = () => (
  <div
    style={{
      marginLeft: "15%",
      width: "85%",
      padding: "20px",
      borderTop: `1px solid ${vars.color.line}`,
    }}
  >
    AI면접
  </div>
);
const StudyGuide = () => (
  <div
    style={{
      marginLeft: "15%",
      width: "85%",
      padding: "20px",
      borderTop: `1px solid ${vars.color.line}`,
    }}
  >
    학습가이드
  </div>
);

function App() {
  let loginToken: boolean = true;

  return (
    <>
      {!loginToken && <Landing />}
      {loginToken && (
        <>
          <Header />
          <main style={{ display: "flex" }}>
            <LeftMenu></LeftMenu>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/resume" element={<Resume />}>
                <Route index element={<ResumeList />} />
                <Route path="new" element={<ResumeForm mode="create" />} />
                <Route path=":id" element={<ResumeDetail />} />
                <Route path=":id/edit" element={<ResumeForm mode="edit" />} />
                <Route path=":id/correction" element={<ResumeCorrection />} />
              </Route>
              <Route path="/jobPost" element={<JobPost />} />
              <Route
                path="/resumeFeedbackHis"
                element={<ResumeFeedbackHis />}
              />
              <Route path="/interview" element={<Interview />} />
              <Route path="/studyGuide" element={<StudyGuide />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
