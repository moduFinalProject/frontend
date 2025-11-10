import { Routes, Route } from "react-router-dom";

import Layout from "@/components/Layout/Layout";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";

import { Login, GoogleCallback, SocialSignUp } from "@/pages/Login";

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
    }}
  >
    학습가이드
  </div>
);

function App() {
  const loginToken: boolean = true;

  const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
    if (!loginToken) {
      return <Landing />;
    }
    return element as React.ReactElement;
  };

  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/googleCallback" element={<GoogleCallback />} />
      <Route path="/SocialSignUp" element={<SocialSignUp />} />

      <Route
        path="/"
        element={
          loginToken ? (
            <Layout>
              <ProtectedRoute element={<Dashboard />} />
            </Layout>
          ) : (
            <Landing />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          loginToken ? (
            <Layout>
              <ProtectedRoute element={<Dashboard />} />
            </Layout>
          ) : (
            <Landing />
          )
        }
      />

      <Route
        path="/resume"
        element={
          loginToken ? (
            <Layout>
              <Resume />
            </Layout>
          ) : (
            <Landing />
          )
        }
      >
        <Route index element={<ResumeList />} />
        <Route path="new" element={<ResumeForm mode="create" />} />
        <Route path=":id" element={<ResumeDetail />} />
        <Route path=":id/edit" element={<ResumeForm mode="edit" />} />
        <Route path=":id/correction" element={<ResumeCorrection />} />
      </Route>

      <Route
        path="/jobPost"
        element={
          loginToken ? (
            <Layout>
              <ProtectedRoute element={<JobPost />} />
            </Layout>
          ) : (
            <Landing />
          )
        }
      />

      <Route
        path="/resumeFeedbackHis"
        element={
          loginToken ? (
            <Layout>
              <ProtectedRoute element={<ResumeFeedbackHis />} />
            </Layout>
          ) : (
            <Landing />
          )
        }
      />

      <Route
        path="/interview"
        element={
          loginToken ? (
            <Layout>
              <ProtectedRoute element={<Interview />} />
            </Layout>
          ) : (
            <Landing />
          )
        }
      />

      <Route
        path="/studyGuide"
        element={
          loginToken ? (
            <Layout>
              <ProtectedRoute element={<StudyGuide />} />
            </Layout>
          ) : (
            <Landing />
          )
        }
      />

      <Route
        path="/profile"
        element={
          loginToken ? (
            <Layout>
              <ProtectedRoute element={<Profile />} />
            </Layout>
          ) : (
            <Landing />
          )
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
