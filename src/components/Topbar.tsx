// src/components/Topbar.tsx
import { Menu } from "lucide-react";

type TopbarProps = {
  /** path รูปโลโก้ ใน public เช่น /hrm-logo.png */
  logoSrc?: string;
};

export default function Topbar({ logoSrc = "/logo.png" }: TopbarProps) {
  return (
    <header className="h-14 w-full bg-white text-gray-900 border-b border-gray-200">
      <div className="h-full flex">
        {/* โซนโลโก้ซ้าย: กว้างเท่ากับ sidebar (w-72 = 18rem) */}
        <div className="h-full w-72 shrink-0 border-r border-gray-200 flex items-center px-4">
          <img
            src={logoSrc}
            alt="HRM Finearts"
            className="h-15 w-auto object-contain ml-0"
          />
        </div>

        {/* โซนเนื้อหาขวา: ปุ่มเมนู + โปรไฟล์ */}
        <div className="flex-1 flex items-center justify-between px-4">
          <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Toggle menu">
            <Menu size={22} className="text-gray-600" />
          </button>

          <div className="flex items-center gap-3">
            {/* ถ้าต้องการข้อความยินดีต้อนรับ ให้ปลดคอมเมนต์บรรทัดล่างนี้ */}
            {/* <span className="text-sm text-gray-600">ยินดีต้อนรับ</span> */}
            <img
              className="w-9 h-9 rounded-full"
              src="https://i.pravatar.cc/40?img=13"
              alt="user"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
