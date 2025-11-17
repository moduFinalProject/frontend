import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

import Layout from "@/components/Layout/Layout";
import LoadingOverlay from "@/components/LoadingOverlay/LoadingOverlay";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { setLoadingStateCallback } from "@/services/api";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import Dashboard from "@/pages/Dashboard";

import { Login, GoogleCallback, SocialSignUp } from "@/pages/Login";

import Resume from "@/pages/Resume";
import ResumeList from "@/pages/Resume/ResumeList";
import ResumeDetail from "@/pages/Resume/ResumeDetail";
import ResumeCorrection from "@/pages/Resume/ResumeCorrection";
import ResumeForm from "@/pages/Resume/ResumeForm";

import ResumeFeedbackLayout, {
  ResumeFeedbackList,
} from "@/pages/ResumeFeedback";
import ResumeFeedbackDetail from "@/pages/ResumeFeedback/ResumeFeedbackDetail";

import Jobs from "@/pages/Jobs";
import JobList from "@/pages/Jobs/JobList";
import JobDetail from "@/pages/Jobs/JobDetail";
import JobForm from "@/pages/Jobs/JobForm";
import ResumeFeedbackForm from "./pages/ResumeFeedback/ResumeFeedbackForm";

// 임시 페이지
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

const TOAST_AUTO_CLOSE_DELAY = 3000;

function App() {
  const { loginToken } = useAuth();
  const { setIsLoading } = useLoading();

  // API 로딩 상태 콜백 등록 (한 번만)
  useEffect(() => {
    setLoadingStateCallback(setIsLoading);
  }, [setIsLoading]);

  return (
    <>
      <Routes>
        <Route
          path="/landing"
          element={
            loginToken ? <Navigate to="/dashboard" replace /> : <Landing />
          }
        />
        <Route
          path="/login"
          element={
            loginToken ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/googleCallback"
          element={
            loginToken ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <GoogleCallback />
            )
          }
        />
        <Route
          path="/SocialSignUp"
          element={
            loginToken ? <Navigate to="/dashboard" replace /> : <SocialSignUp />
          }
        />

        <Route
          path="/"
          element={
            loginToken ? (
              <Layout>
                <Dashboard />
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
                <Dashboard />
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
          path="/jobs"
          element={
            loginToken ? (
              <Layout>
                <Jobs />
              </Layout>
            ) : (
              <Landing />
            )
          }
        >
          <Route index element={<JobList />} />
          <Route path="new" element={<JobForm mode="create" />} />
          <Route path=":id" element={<JobDetail />} />
          <Route path=":id/edit" element={<JobForm mode="edit" />} />
        </Route>

        <Route
          path="/resumeFeedback"
          element={
            loginToken ? (
              <Layout>
                <ResumeFeedbackLayout />
              </Layout>
            ) : (
              <Landing />
            )
          }
        >
          <Route index element={<ResumeFeedbackList />} />
          <Route path="new" element={<ResumeFeedbackForm />} />
          <Route path=":id" element={<ResumeFeedbackDetail />} />
        </Route>

        <Route
          path="/interview"
          element={
            loginToken ? (
              <Layout>
                <Interview />
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
                <StudyGuide />
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
                <Profile />
              </Layout>
            ) : (
              <Landing />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <LoadingOverlay />
      <ToastContainer
        position="top-right"
        autoClose={TOAST_AUTO_CLOSE_DELAY}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
