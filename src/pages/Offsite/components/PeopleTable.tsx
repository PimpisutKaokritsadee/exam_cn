// src/components/PeopleTable.tsx
import { useState } from "react";
import { Plus, Search, Trash2 } from "lucide-react";
import PersonDrawer, { type PersonForm } from "./PersonDrawer";

interface Person {
  id: number;
  name: string;
  role: string;
  level?: string;
  positionType?: string;
  personnelType?: string;
}

export default function PeopleTable() {
  const [people, setPeople] = useState<Person[]>([]);
  const [open, setOpen] = useState(false);

  const removePerson = (id: number) =>
    setPeople((prev) => prev.filter((p) => p.id !== id));

  const handleSave = (data: PersonForm) => {
    setPeople((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: data.person || "ไม่ระบุชื่อ",
        role: data.position || "ไม่ระบุตำแหน่ง",
        level: data.level,
        positionType: data.positionType,
        personnelType: data.personnelType,
      },
    ]);
    setOpen(false);
  };

  return (
    <div>
      {/* หัวข้อ + ปุ่มเพิ่ม */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg  font-display">ผู้ปฏิบัติงาน</h3>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-4 h-10 px-5 rounded-sm font-display
                     bg-indigo-800 text-white hover:bg-indigo-700 shadow-sm"
        >
          <Plus size={18} />
          เพิ่ม
        </button>
      </div>

      {/* ตาราง */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-2 border-gray-200 border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-medium font-display border-2 border-gray-200 w-20">ลำดับ</th>
              <th className="px-4 py-2 text-left font-medium font-display border-2 border-gray-200">ชื่อ - นามสกุล</th>
              <th className="px-4 py-2 text-left font-medium font-display border-2 border-gray-200">ตำแหน่ง</th>
              <th className="px-4 py-2 text-left font-medium font-display border-2 border-gray-200">ระดับตำแหน่ง</th>
              <th className="px-4 py-2 text-left font-medium font-display border-2 border-gray-200">ประเภทตำแหน่ง</th>
              <th className="px-4 py-2 text-left font-medium font-display border-2 border-gray-200">ประเภทบุคลากร</th>
              <th className="px-4 py-2 text-center font-medium font-display border-2 border-gray-200 w-24">เครื่องมือ</th>
            </tr>
          </thead>
          <tbody>
            {people.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-2 text-center font-display text-gray-500 border-2 border-gray-200">
                  -- ไม่พบข้อมูล --
                </td>
              </tr>
            ) : (
              people.map((p, idx) => (
                <tr key={p.id}>
                  <td className="px-4 py-2 border-2 font-display border-gray-200 text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border-2 font-display border-gray-200">{p.name}</td>
                  <td className="px-4 py-2 border-2 font-display border-gray-200">{p.role}</td>
                  <td className="px-4 py-2 border-2 font-display border-gray-200">{p.level || "—"}</td>
                  <td className="px-4 py-2 border-2 font-display border-gray-200">{p.positionType || "—"}</td>
                  <td className="px-4 py-2 border-2 font-display border-gray-200">{p.personnelType || "—"}</td>
                  <td className="px-2 py-2 border-2 font-display border-gray-200">
                    <div className="flex justify-center gap-3 font-display text-gray-600">
                      <button className="hover:text-emerald-700" aria-label="preview">
                        <Search size={18} />
                      </button>
                      <button
                        onClick={() => removePerson(p.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="ลบ"
                        title="ลบ"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Drawer ที่ถูกควบคุมจากภายนอก */}
      <PersonDrawer
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
