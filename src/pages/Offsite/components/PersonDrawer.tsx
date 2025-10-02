// src/components/PersonDrawer.tsx
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export type PersonForm = {
  person: string;
  position: string;
  level: string;
  positionType: string;
  personnelType: string;
  unitMajor: string;
  unitMinor: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: PersonForm) => void;
};

const defaultForm: PersonForm = {
  person: "",
  position: "",
  level: "",
  positionType: "",
  personnelType: "",
  unitMajor: "",
  unitMinor: "",
};

export default function PersonDrawer({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<PersonForm>(defaultForm);

  // รีเซ็ตฟอร์มทุกครั้งที่เปิด
  useEffect(() => {
    if (open) setForm(defaultForm);
  }, [open]);

  // ปิดด้วย ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 bg-black/60 z-[60]" onClick={onClose} />

      {/* drawer */}
      <div
        className="fixed inset-y-0 right-0 z-[61] w-full max-w-[520px] bg-white shadow-xl
                   transform transition-transform duration-300 translate-x-0"
        role="dialog"
        aria-modal="true"
      >
        {/* header */}
        <div className="h-14 px-4 border-b flex items-center justify-between">
          <div className="font-semibold">เพิ่มบุคลากร</div>
          <button onClick={onClose} className="p-2 -mr-2 rounded hover:bg-gray-100" aria-label="ปิด">
            <X size={18} />
          </button>
        </div>

        {/* body */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-7.5rem)]">
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">บุคลากร</span>
            <select
              className={`h-9 rounded border border-gray-300 px-3 text-sm outline-none
                          focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600
                          ${form.person ? "text-black" : "text-gray-400"}`}
              value={form.person}
              onChange={(e) => setForm((f) => ({ ...f, person: e.target.value }))}
            >
              <option value="" hidden>โปรดระบุ</option>
              <option value="สมชาย ใจดี">สมชาย ใจดี</option>
              <option value="สมหญิง ขยัน">สมหญิง ขยัน</option>
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">ชื่อตำแหน่ง</span>
            <input
              className="h-9 rounded border border-gray-300 px-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              placeholder="โปรดระบุ"
              value={form.position}
              onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">ระดับตำแหน่ง</span>
            <input
              className="h-9 rounded border border-gray-300 px-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              placeholder="โปรดระบุ"
              value={form.level}
              onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">ประเภทตำแหน่ง</span>
            <input
              className="h-9 rounded border border-gray-300 px-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              placeholder="โปรดระบุ"
              value={form.positionType}
              onChange={(e) => setForm((f) => ({ ...f, positionType: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">ประเภทบุคลากร</span>
            <input
              className="h-9 rounded border border-gray-300 px-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              placeholder="โปรดระบุ"
              value={form.personnelType}
              onChange={(e) => setForm((f) => ({ ...f, personnelType: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">หน่วยงานระดับกอง / กอง / ศูนย์</span>
            <input
              className="h-9 rounded border border-gray-300 px-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              placeholder="โปรดระบุ"
              value={form.unitMajor}
              onChange={(e) => setForm((f) => ({ ...f, unitMajor: e.target.value }))}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">หน่วยงานระดับสำนักงาน / กอง / ศูนย์ / โรงเรียน</span>
            <input
              className="h-9 rounded border border-gray-300 px-3 text-sm outline-none
                         focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
              placeholder="โปรดระบุ"
              value={form.unitMinor}
              onChange={(e) => setForm((f) => ({ ...f, unitMinor: e.target.value }))}
            />
          </label>
        </div>

        {/* footer */}
        <div className="h-16 px-4 border-t flex items-center justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => onSave(form)}
            className="h-9 px-4 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            บันทึก
          </button>
        </div>
      </div>
    </>
  );
}
