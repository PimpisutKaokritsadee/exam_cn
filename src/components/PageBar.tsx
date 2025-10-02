// src/components/PageBar.tsx
import { useLocation } from "react-router-dom";

export default function PageBar() {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/main": "หน้าหลัก",
    "/operations/offsite-log": "การสรรหาและคัดเลือกบุคลากร",
  };

  const title = pageTitles[location.pathname] || "ไม่พบหน้า";

  return (
    <div className="h-8 w-full bg-green-700 text-white border-b border-green-800">
      <div className="h-full px-4 flex items-center text-sm font-medium font-display">
        {title}
      </div>
    </div>
  );
}
