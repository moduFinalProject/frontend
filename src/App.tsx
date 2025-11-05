import Header from "@/components/Header/Header"
import LeftMenu from "@/components/LeftMenu/LeftMenu"
import Footer from "@/components/Footer/Footer"
import { Routes, Route } from "react-router-dom"
import Resume from "@/pages/Resume/Resume"
 import { themeClass } from "@/design-system"
 import { vars } from "@/design-system"

// 임시 페이지
const Dashboard = () => <div style={{ marginLeft:"15%", width:"85%", padding: "20px", borderTop: `1px solid ${vars.color.line}`}}>대시보드 페이지</div>
const JobPost = () => <div style={{ marginLeft:"15%", width:"85%", padding: "20px", borderTop: `1px solid ${vars.color.line}` }}>채용공고 관리 페이지</div>
const ResumeFeedbackHis = () => <div style={{ marginLeft:"15%", width:"85%", padding: "20px", borderTop: `1px solid ${vars.color.line}` }}>공고별 첨삭 이력 페이지</div>
const Interview = () => <div style={{ marginLeft:"15%", width:"85%", padding: "20px", borderTop: `1px solid ${vars.color.line}` }}>AI면접</div>
const StudyGuide = () => <div style={{ marginLeft:"15%", width:"85%", padding: "20px", borderTop: `1px solid ${vars.color.line}` }}>학습가이드</div>
const Profile = () => <div style={{ marginLeft:"15%", width:"85%", padding: "20px", borderTop: `1px solid ${vars.color.line}` }}>마이페이지</div>

function App() {
  let loginToken:boolean = true;

  return (
    <>
      {!loginToken&&<div>랜딩페이지</div>}
      {loginToken&&
        <>
          <Header />
          <main style={{display:"flex"}}>
            <LeftMenu></LeftMenu>
            <Routes>
              <Route path="/frontend/" element={<Dashboard />} />
              <Route path="/frontend/dashboard" element={<Dashboard />} />
              <Route path="/frontend/resume" element={<Resume />} />
              <Route path="/frontend/jobPost" element={<JobPost />} />
              <Route path="/frontend/resumeFeedbackHis" element={<ResumeFeedbackHis />} />
              <Route path="/frontend/interview" element={<Interview />} />
              <Route path="/frontend/studyGuide" element={<StudyGuide />} />
              <Route path="/frontend/profile" element={<Profile />} />              
            </Routes>
          </main>      
        <Footer />
        </>
      }    
    </>
  )
  ;
}

export default App;
