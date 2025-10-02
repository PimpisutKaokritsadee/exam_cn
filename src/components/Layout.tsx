import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import PageBar from "./PageBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
     <Topbar collapsed={collapsed} onToggleSidebar={() => setCollapsed(c => !c)} />

      <div className="flex flex-1 min-h-0">
        <Sidebar collapsed={collapsed} />
        <div className="flex-1 min-w-0 flex flex-col">
          <PageBar />
          <main className="flex-1 min-h-0 overflow-auto p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
