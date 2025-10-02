// import { NavLink, useLocation } from "react-router-dom";
// import {
//     Home, UserCircle2, CalendarDays, Network, ClipboardList, Clock4,
//     ChevronDown, ChevronRight, Layers, BriefcaseBusiness, Users,
//     GraduationCap, FileText, Shield, Cog
// } from "lucide-react";
// import { useMemo, useState } from "react";

// type Leaf = { label: string; to: string };
// type Section =
//     | { id: string; label: string; icon: React.ReactNode; to: string } // เมนูเดี่ยว
//     | { id: string; label: string; icon: React.ReactNode; children: Leaf[]; defaultOpen?: boolean }; // เมนูมีย่อย

// const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

// const SIDEBAR_BG = "#2b2e33"; // เทาเข้ม
// const CHILD_BG = "#0d0f12"; // พื้นดำของเมนูย่อย

// const MENU: Section[] = [
//     { id: "home", label: "หน้าหลัก", icon: <Home size={18} />, to: "/" },
//     { id: "me", label: "ข้อมูลส่วนตัว", icon: <UserCircle2 size={18} />, to: "/profile" },
//     { id: "calendar", label: "ปฏิทินองค์กร", icon: <CalendarDays size={18} />, to: "/calendar" },
//     { id: "org", label: "โครงสร้างองค์กร", icon: <Network size={18} />, to: "/org" },

//     { id: "work", label: "การลาและการปฏิบัติงาน", icon: <ClipboardList size={18} />, children: [] },
//     { id: "time", label: "เวลาปฏิบัติราชการ", icon: <Clock4 size={18} />, children: [] },
//     { id: "registry", label: "กลุ่มงานทะเบียนประวัติบำเหน็จความชอบและระบบสารสนเทศ ทรัพยากรบุคคล", icon: <Layers size={18} />, children: [] },
//     { id: "manpower", label: "กลุ่มงานอัตรากำลังและพัฒนาระบบบริหารทรัพยากรบุคคล", icon: <BriefcaseBusiness size={18} />, children: [] },

//     {
//         id: "recruit",
//         label: "กลุ่มงานสรรหาและบรรจุแต่งตั้ง",
//         icon: <Users size={18} />,
//         defaultOpen: true,
//         children: [
//             { label: "ขออนุมัติการเพิ่มอัตรากำลัง", to: "/operations/offsite-log" },
//             { label: "จัดการรับสมัครงาน", to: "/recruit/applications" },
//             { label: "การดำเนินการจัดสอบ", to: "/recruit/exams" },
//             { label: "บันทึกผลการสอบ", to: "/recruit/exam-results" },
//             { label: "ประวัติการสมัครงาน", to: "/recruit/history" },
//             { label: "การประเมินบุคคลและผลงาน", to: "/recruit/evaluation" },
//             { label: "คำสั่ง", to: "/recruit/orders" },
//         ],
//     },

//     { id: "develop", label: "กลุ่มงานพัฒนาทรัพยากรบุคคล", icon: <GraduationCap size={18} />, children: [] },
//     { id: "reports", label: "รายงาน", icon: <FileText size={18} />, children: [] },
//     { id: "users", label: "ผู้ใช้งานและสิทธิ์", icon: <Shield size={18} />, children: [] },

//     { id: "settings", label: "ตั้งค่า", icon: <Cog size={18} />, to: "/settings" },
// ];

// export default function Sidebar() {
//     const location = useLocation();

//     const autoOpen = useMemo(() => {
//         const s: Record<string, boolean> = {};
//         MENU.forEach((sec) => {
//             if ("children" in sec) {
//                 s[sec.id] =
//                     sec.defaultOpen ||
//                     sec.children?.some((c) => location.pathname.startsWith(c.to)) ||
//                     false;
//             }
//         });
//         return s;
//     }, [location.pathname]);

//     const [open, setOpen] = useState<Record<string, boolean>>(autoOpen);
//     const toggle = (id: string) => setOpen((st) => ({ ...st, [id]: !st[id] }));

//     return (
//         <div
//       className="w-72 shrink-0 text-gray-200 border-r border-black/20"
//       style={{ backgroundColor: SIDEBAR_BG }}
//     >
//         <aside className="sticky top-0 max-h-[100vh] overflow-y-auto overflow-x-hidden">
//             <nav className="py-3 px-2">
//                 {MENU.map((sec) => {
//                     // แถวหลัก: จัดชิดบนเผื่อขึ้นหลายบรรทัด
//                     const rowBase = "group w-full px-3 py-2 text-sm flex items-start gap-2 text-gray-200";

//                     // ===== เมนูเดี่ยว (ไม่มี >) =====
//                     if ("to" in sec) {
//                         const active = location.pathname === sec.to;
//                         return (
//                             <div key={sec.id} className="my-0.5">
//                                 <NavLink to={sec.to} end className={rowBase}>
//                                     <span className="text-yellow-400 shrink-0 mt-0.5">{sec.icon}</span>
//                                     <span
//                                         className={cx(
//                                             "flex-1 text-left break-words whitespace-normal leading-6 transition-colors",
//                                             "group-hover:text-yellow-300",
//                                             active && "text-yellow-300"
//                                         )}
//                                     >
//                                         {sec.label}
//                                     </span>
//                                 </NavLink>
//                             </div>
//                         );
//                     }

//                     // ===== เมนูมีย่อย (accordion) =====
//                     const isOpen = open[sec.id] ?? false;
//                     const anyActive =
//                         sec.children?.some((c) => location.pathname.startsWith(c.to)) ?? false;

//                     return (
//                         <div key={sec.id} className="my-0.5">
//                             <button onClick={() => toggle(sec.id)} className={rowBase}>
//                                 <span className="text-yellow-400 shrink-0 mt-0.5">{sec.icon}</span>
//                                 <span
//                                     className={cx(
//                                         "flex-1 text-left break-words whitespace-normal leading-6 transition-colors",
//                                         "group-hover:text-yellow-300",
//                                         (isOpen || anyActive) && "text-yellow-300"
//                                     )}
//                                 >
//                                     {sec.label}
//                                 </span>
//                                 <ChevronDown
//                                     size={25}
//                                     className={cx(
//                                         "transition-transform shrink-0 self-center ml-auto text-gray-300",
//                                         (isOpen || anyActive) && "rotate-180"
//                                     )}
//                                 />
//                             </button>

//                             {/* เมนูย่อย: พื้นดำ, ไม่มีมุมมน/เส้นคั่น, ข้อความขึ้นบรรทัดใหม่ได้ */}
//                             {/* กล่องเมนูย่อย: ให้กินเต็มกว้าง ชิดขอบซ้าย-ขวา */}
//                             {sec.children?.length ? (
//                                 <div
//                                     className={cx(
//                                         "mt-1 overflow-hidden -mx-2",           // ← เพิ่ม -mx-2 เพื่อชดเชย nav px-2
//                                         isOpen || anyActive ? "max-h-[1000px]" : "max-h-0",
//                                         "transition-[max-height] duration-300"
//                                     )}
//                                     style={{ backgroundColor: CHILD_BG }}      // พื้นดำทั้งกล่อง
//                                 >
//                                     {sec.children.map((item) => {
//                                         const activeChild = location.pathname.startsWith(item.to);
//                                         return (
//                                             <NavLink
//                                                 key={item.to}
//                                                 to={item.to}
//                                                 className="group flex items-start min-w-0 pl-10 pr-3 py-2 text-sm text-gray-200 w-full"
//                                             >
//                                                 <span
//                                                     className={cx(
//                                                         "flex-1 break-words whitespace-normal leading-6 transition-colors",
//                                                         "group-hover:text-yellow-300",
//                                                         activeChild && "text-yellow-300"
//                                                     )}
//                                                 >
//                                                     {item.label}
//                                                 </span>
//                                                 <ChevronRight size={25} className="opacity-70 shrink-0 self-center ml-auto" />
//                                             </NavLink>
//                                         );
//                                     })}
//                                 </div>
//                             ) : null}

//                         </div>
//                     );
//                 })}
//             </nav>
//         </aside>
//         </div>
//     );
// }

// src/components/Sidebar.tsx
import { NavLink, useLocation } from "react-router-dom";
import {
  Home, UserCircle2, CalendarDays, Network, ClipboardList, Clock4,
  ChevronDown, ChevronRight, Layers, BriefcaseBusiness, Users,
  GraduationCap, FileText, Shield, Cog
} from "lucide-react";
import { useState } from "react";

type Leaf = { label: string; to: string };
type Section =
  | { id: string; label: string; icon: React.ReactNode; to: string } // เมนูเดี่ยว
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

export default function Sidebar() {
  const location = useLocation();

  // เก็บสถานะที่ "ผู้ใช้" ตั้งค่าเองเท่านั้น (ไม่บังคับเปิดเพราะ route)
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) =>
    setOpen((s) => ({ ...s, [id]: !(s[id] ?? true) })); // ครั้งแรกกด = ปิด

  return (
    // ชั้นนอก: เป็น rail ที่ยืดตามความยาวเพจ
    <div
      className="w-72 shrink-0 text-gray-200 border-r border-black/20"
      style={{ backgroundColor: SIDEBAR_BG }}
    >
      {/* ชั้นใน: sticky + สกอลล์ภายใน */}
      <aside className="sticky top-0 max-h-[100vh] overflow-y-auto overflow-x-hidden">
        <nav className="py-3 px-2">
          {MENU.map((sec) => {
            const rowBase = "group w-full px-3 py-2 text-sm flex items-start gap-2 text-gray-200";

            // เมนูเดี่ยว
            if ("to" in sec) {
              const active = location.pathname === sec.to;
              return (
                <div key={sec.id} className="my-0.5">
                  <NavLink to={sec.to} end className={rowBase}>
                    <span className="text-yellow-400 shrink-0 mt-0.5">{sec.icon}</span>
                    <span
                      className={cx(
                        "flex-1 text-left break-words whitespace-normal leading-6 transition-colors",
                        "group-hover:text-yellow-300",
                        active && "text-yellow-300"
                      )}
                    >
                      {sec.label}
                    </span>
                  </NavLink>
                </div>
              );
            }

            // เมนูมีย่อย
            const anyActive =
              sec.children?.some((c) => location.pathname.startsWith(c.to)) ?? false;
            const userSet = Object.prototype.hasOwnProperty.call(open, sec.id);
            // เปิดอัตโนมัติถ้ายังไม่เคยตั้งค่า และ route อยู่ใต้เมนูนี้ หรือมี defaultOpen
            const computedOpen = userSet ? !!open[sec.id] : (sec.defaultOpen || anyActive || false);

            return (
              <div key={sec.id} className="my-0.5">
                <button onClick={() => toggle(sec.id)} className={rowBase}>
                  <span className="text-yellow-400 shrink-0 mt-0.5">{sec.icon}</span>
                  <span
                    className={cx(
                      "flex-1 text-left break-words whitespace-normal leading-6 transition-colors",
                      "group-hover:text-yellow-300",
                      computedOpen && "text-yellow-300"
                    )}
                  >
                    {sec.label}
                  </span>
                  <ChevronDown
                    size={25}
                    className={cx(
                      "transition-transform shrink-0 self-center ml-auto text-gray-300",
                      computedOpen && "rotate-180"
                    )}
                  />
                </button>

                {sec.children?.length ? (
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
                          className="group flex items-start min-w-0 pl-10 pr-3 py-2 text-sm text-gray-200 w-full"
                        >
                          <span
                            className={cx(
                              "flex-1 break-words whitespace-normal leading-6 transition-colors",
                              "group-hover:text-yellow-300",
                              activeChild && "text-yellow-300"
                            )}
                          >
                            {item.label}
                          </span>
                          <ChevronRight size={25} className="opacity-70 shrink-0 self-center ml-auto" />
                        </NavLink>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
