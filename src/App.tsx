import { themeClass } from "@/design-system";
import { Routes, Route } from "react-router-dom";

import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <div className={themeClass}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
