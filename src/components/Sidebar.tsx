// src/components/Sidebar.tsx
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, UserCircle2, CalendarDays, Network, ClipboardList, Clock4,
  ChevronDown, ChevronRight, Layers, BriefcaseBusiness, Users,
  GraduationCap, FileText, Shield, Cog
} from "lucide-react";
import { useMemo, useState } from "react";

type Leaf = { label: string; to: string };
type Section =
  | { id: string; label: string; icon: React.ReactNode; to: string }                     // เมนูเดี่ยว
  | { id: string; label: string; icon: React.ReactNode; children: Leaf[]; defaultOpen?: boolean }; // เมนูมีย่อย

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

const SIDEBAR_BG = "#2b2e33";
const CHILD_BG = "#0d0f12";

const MENU: Section[] = [
  { id: "home", label: "หน้าหลัก", icon: <Home size={18} />, to: "/main" },
  { id: "me", label: "ข้อมูลส่วนตัว", icon: <UserCircle2 size={18} />, to: "/profile" },
  { id: "calendar", label: "ปฏิทินองค์กร", icon: <CalendarDays size={18} />, to: "/calendar" },
  { id: "org", label: "โครงสร้างองค์กร", icon: <Network size={18} />, to: "/org" },

  { id: "work", label: "การลาและการปฏิบัติงาน", icon: <ClipboardList size={18} />, children: [] },
  { id: "time", label: "เวลาปฏิบัติราชการ", icon: <Clock4 size={18} />, children: [] },
  { id: "registry", label: "กลุ่มงานทะเบียนประวัติบำเหน็จความชอบและระบบสารสนเทศ ทรัพยากรบุคคล", icon: <Layers size={18} />, children: [] },
  { id: "manpower", label: "กลุ่มงานอัตรากำลังและพัฒนาระบบบริหารทรัพยากรบุคคล", icon: <BriefcaseBusiness size={18} />, children: [] },

  {
    id: "recruit",
    label: "กลุ่มงานสรรหาและบรรจุแต่งตั้ง",
    icon: <Users size={18} />,
    defaultOpen: true,
    children: [
      { label: "ขออนุมัติการเพิ่มอัตรากำลัง", to: "/operations/offsite-log" },
      { label: "จัดการรับสมัครงาน", to: "/recruit/applications" },
      { label: "การดำเนินการจัดสอบ", to: "/recruit/exams" },
      { label: "บันทึกผลการสอบ", to: "/recruit/exam-results" },
      { label: "ประวัติการสมัครงาน", to: "/recruit/history" },
      { label: "การประเมินบุคคลและผลงาน", to: "/recruit/evaluation" },
      { label: "คำสั่ง", to: "/recruit/orders" },
    ],
  },

  { id: "develop", label: "กลุ่มงานพัฒนาทรัพยากรบุคคล", icon: <GraduationCap size={18} />, children: [] },
  { id: "reports", label: "รายงาน", icon: <FileText size={18} />, children: [] },
  { id: "users", label: "ผู้ใช้งานและสิทธิ์", icon: <Shield size={18} />, children: [] },

  { id: "settings", label: "ตั้งค่า", icon: <Cog size={18} />, to: "/settings" },
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const location = useLocation();

  // เก็บสถานะเปิด/ปิดของเมนูย่อย (ตอน sidebar ขยาย)
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) =>
    setOpen((s) => ({ ...s, [id]: !(s[id] ?? true) })); // ครั้งแรกกด = ปิด

  // ตรวจ active ของเมนูย่อยเพื่อเปิดอัตโนมัติรอบแรก
  const autoOpen = useMemo(() => {
    const map: Record<string, boolean> = {};
    MENU.forEach((sec) => {
      if ("children" in sec && sec.children?.length) {
        map[sec.id] = sec.children.some((c) => location.pathname.startsWith(c.to)) || !!sec.defaultOpen;
      }
    });
    return map;
  }, [location.pathname]);

  return (
    <div
      className={cx(
        "shrink-0 text-gray-200 border-r border-black/20 transition-[width] duration-300",
        collapsed ? "w-16" : "w-72"
      )}
      style={{ backgroundColor: SIDEBAR_BG }}
    >
      <aside className="sticky top-0 max-h-[100vh] overflow-y-auto overflow-x-hidden">
        <nav className="py-3 px-2">
          {MENU.map((sec) => {
            const rowBase =
              "group relative w-full px-3 py-2 text-sm flex items-center gap-2 text-gray-200 hover:text-yellow-300";

            // ── เมนูเดี่ยว ─────────────────────────────────────────────────────
            if ("to" in sec) {
              const active = location.pathname === sec.to;
              return (
                <div key={sec.id} className="my-0.5">
                  <NavLink to={sec.to} end className={rowBase}>
                    <span className="text-yellow-400 shrink-0">{sec.icon}</span>
                    {!collapsed && (
                      <span
                        className={cx(
                          "flex-1 text-left break-words whitespace-normal leading-6 transition-colors",
                          active && "text-yellow-300"
                        )}
                      >
                        {sec.label}
                      </span>
                    )}

                    {/* tooltip ตอนหุบ */}
                    {collapsed && (
                      <span className="pointer-events-none absolute left-full ml-2 hidden rounded bg-black/80 px-2 py-1 text-xs text-white whitespace-nowrap group-hover:block">
                        {sec.label}
                      </span>
                    )}
                  </NavLink>
                </div>
              );
            }

            // ── เมนูมีย่อย ────────────────────────────────────────────────────
            const userSet = Object.prototype.hasOwnProperty.call(open, sec.id);
            const computedOpen = userSet ? !!open[sec.id] : autoOpen[sec.id] ?? false;

            return (
              <div key={sec.id} className="my-0.5">
                {/* แถวหัวข้อของกลุ่ม */}
                <button
                  className={rowBase}
                  onClick={() => !collapsed && toggle(sec.id)} // ถ้าหุบ ไม่ต้อง toggle (ใช้ flyout แทน)
                >
                  <span className="text-yellow-400 shrink-0">{sec.icon}</span>

                  {!collapsed && (
                    <>
                      <span
                        className={cx(
                          "flex-1 text-left break-words whitespace-normal leading-6 transition-colors",
                          computedOpen && "text-yellow-300"
                        )}
                      >
                        {sec.label}
                      </span>
                      <ChevronDown
                        size={20}
                        className={cx(
                          "transition-transform shrink-0 text-gray-300",
                          computedOpen && "rotate-180"
                        )}
                      />
                    </>
                  )}

                  {/* tooltip ตอนหุบ */}
                  {collapsed && (
                    <span className="pointer-events-none absolute left-full ml-2 hidden rounded bg-black/80 px-2 py-1 text-xs text-white whitespace-nowrap group-hover:block">
                      {sec.label}
                    </span>
                  )}
                </button>

                {/* รายการย่อย: โหมดขยาย = แสดงแบบ accordion, โหมดหุบ = flyout */}
                {"children" in sec && sec.children?.length ? (
                  collapsed ? (
                    // ── FLYOUT ── (โชว์เมื่อ hover ที่หัวข้อ)
                    <div className="relative">
                      <div
                        className="pointer-events-none absolute left-full top-0 ml-1 hidden min-w-56 rounded-md border border-black/20 shadow-lg
                                   group-hover:pointer-events-auto group-hover:block"
                        style={{ backgroundColor: CHILD_BG }}
                      >
                        {sec.children.map((item) => {
                          const activeChild = location.pathname.startsWith(item.to);
                          return (
                            <NavLink
                              key={item.to}
                              to={item.to}
                              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 hover:text-yellow-300"
                            >
                              <span className={cx("flex-1", activeChild && "text-yellow-300")}>
                                {item.label}
                              </span>
                              <ChevronRight size={18} className="opacity-70" />
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    // ── ACCORDION ──
                    <div
                      className={cx(
                        "mt-1 overflow-hidden -mx-2",
                        computedOpen ? "max-h-[1000px]" : "max-h-0",
                        "transition-[max-height] duration-300"
                      )}
                      style={{ backgroundColor: CHILD_BG }}
                    >
                      {sec.children.map((item) => {
                        const activeChild = location.pathname.startsWith(item.to);
                        return (
                          <NavLink
                            key={item.to}
                            to={item.to}
                            className="group flex items-center min-w-0 pl-10 pr-3 py-2 text-sm text-gray-200 w-full hover:text-yellow-300"
                          >
                            <span className={cx("flex-1 break-words", activeChild && "text-yellow-300")}>
                              {item.label}
                            </span>
                            <ChevronRight size={20} className="opacity-70 shrink-0" />
                          </NavLink>
                        );
                      })}
                    </div>
                  )
                ) : null}
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
