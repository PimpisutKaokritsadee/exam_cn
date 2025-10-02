import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import OffsitePage from "./pages/Offsite/OffsitePage";

export default function App() {
  return (
    <Routes>
      {/* ใส่ path="/" ให้ layout ชัดเจน */}
      <Route path="/" element={<Layout />}>
        <Route path="/operations/offsite-log" element={<OffsitePage />} />
      </Route>

      {/* กันหลงทาง */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
