import { Menu } from "lucide-react";

type TopbarProps = {
  collapsed: boolean;                 // <- ต้องรับสถานะหุบ/ขยาย
  onToggleSidebar: () => void;
  logoFull?: string;
  logoIcon?: string;
};

export default function Topbar({
  collapsed,
  onToggleSidebar,
  logoFull = "/logo-full.png",
  logoIcon = "/logo-icon.png",
}: TopbarProps) {
  return (
    <header className="h-14 w-full bg-white text-gray-900 border-b border-gray-200">
      <div className="h-full flex">
        {/* Logo zone: ชิดซ้ายเมื่อไม่หุบ, กลางเมื่อหุบ */}
        <div
          className={`h-full shrink-0 border-r border-gray-200 flex items-center
            transition-all duration-300
            ${collapsed ? "w-16 justify-center" : "w-72 justify-start px-4"}`}
        >
          <img
            src={collapsed ? logoIcon : logoFull}
            alt="HRM Finearts"
            className={collapsed ? "h-8 w-8 object-contain" : "h-12 w-auto object-contain"}
          />
        </div>

        {/* Right zone */}
        <div className="flex-1 flex items-center justify-between px-4">
          <button
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Toggle menu"
            onClick={onToggleSidebar}
          >
            <Menu size={22} className="text-gray-600" />
          </button>

          <img className="w-9 h-9 rounded-full" src="https://i.pravatar.cc/40?img=13" alt="user" />
        </div>
      </div>
    </header>
  );
}
