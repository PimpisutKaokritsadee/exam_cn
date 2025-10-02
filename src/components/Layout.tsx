// src/components/Layout.tsx
import Sidebar from "./Sidebar"
import Topbar from "./Topbar";
import PageBar from "./PageBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    // ชั้นนอก: เปิดด้วยคอลัมน์เพื่อให้ Topbar ขาวพาดเต็มจอ
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Topbar /> {/* ถ้าพาดเต็มหน้าจอ */}
      <div className="flex flex-1 min-h-0">
        <Sidebar />  {/* ใช้เวอร์ชันที่แก้ข้างบน */}
        <div className="flex-1 min-w-0 flex flex-col">
          <PageBar title="การสรรหาและเลือกสรรบุคลากร" />
          <main className="flex-1 min-h-0 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

