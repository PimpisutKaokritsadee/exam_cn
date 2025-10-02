// src/components/Layout.tsx
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import PageBar from "./PageBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Topbar />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <PageBar />   {/* << อยู่ที่เดียวพอ */}
          <main className="flex-1 min-h-0 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
