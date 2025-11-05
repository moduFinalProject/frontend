import { themeClass } from "@/design-system";
import { Routes, Route } from "react-router-dom";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

import Resume from "@/pages/Resume"; // index.tsx
import ResumeList from "@/pages/Resume/ResumeList";
import ResumeCreate from "@/pages/Resume/ResumeCreate";
import ResumeDetail from "@/pages/Resume/ResumeDetail";
import ResumeEdit from "@/pages/Resume/ResumeEdit";
import ResumeCorrection from "@/pages/Resume/ResumeCorrection";

function App() {
  return (
    <div className={themeClass}>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/resume" element={<Resume />}>
          <Route index element={<ResumeList />} />
          <Route path="new" element={<ResumeCreate />} />
          <Route path=":id" element={<ResumeDetail />} />
          <Route path=":id/edit" element={<ResumeEdit />} />
          <Route path=":id/correction" element={<ResumeCorrection />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
