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

const baseInput =
  "h-9 rounded border border-gray-300 px-3 text-sm outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600";
const tone = (v: string) => (v ? "bg-white text-black" : "bg-gray-100 text-gray-500");

export default function PersonDrawer({ open, onClose, onSave }: Props) {
  const [form, setForm] = useState<PersonForm>(defaultForm);
  const [errors, setErrors] = useState<Partial<Record<keyof PersonForm, string>>>({});

  useEffect(() => {
    if (open) {
      setForm(defaultForm);
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const validate = () => {
  const newErrors: Partial<Record<keyof PersonForm, string>> = {};
  (Object.keys(defaultForm) as (keyof PersonForm)[]).forEach((key) => {
    if (!form[key]) {
      if (key === "person") {
        newErrors[key] = "กรุณาเลือกบุคลากร"; // ✅ ข้อความเฉพาะของ select
      } else {
        newErrors[key] = "กรุณากรอกข้อมูล";   // ช่องอื่นใช้ข้อความนี้
      }
    }
  });
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


  const handleSave = () => {
    if (validate()) {
      onSave(form);
    }
  };

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
        <div className="h-14 px-4 border-b border-gray-300 flex items-center justify-between">
          <div className="font-semibold text-emerald-600">เพิ่มบุคลากร</div>
          <button onClick={onClose} className="p-2 -mr-2 rounded hover:bg-gray-100" aria-label="ปิด">
            <X size={18} />
          </button>
        </div>

        {/* body */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-7.5rem)]">
          {/* บุคลากร */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              บุคลากร <span className="text-red-600">*</span>
            </span>
            <select
              className={`h-10 rounded-sm px-3 pr-8 text-sm outline-none border 
                ${errors.person ? "border-red-500" : "border-gray-300"}
                focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600
                ${!form.person ? "bg-white text-gray-400" : "bg-white text-black"}`}
              value={form.person}
              onChange={(e) => setForm((f) => ({ ...f, person: e.target.value }))}
            >
              <option value="" disabled hidden>
                บุคลากร
              </option>
              <option value="บุคลากร" className="text-black bg-white">
                บุคลากร
              </option>
            </select>
            {errors.person && <span className="text-red-500 text-xs">{errors.person}</span>}
          </label>

          {/* ชื่อตำแหน่ง */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              ชื่อตำแหน่ง <span className="text-red-600">*</span>
            </span>
            <input
              className={`${baseInput} ${tone(form.position)} ${errors.position ? "border-red-500" : ""}`}
              value={form.position}
              onChange={(e) => setForm((f) => ({ ...f, position: e.target.value }))}
            />
            {errors.position && <span className="text-red-500 text-xs">{errors.position}</span>}
          </label>

          {/* ระดับตำแหน่ง */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              ระดับตำแหน่ง <span className="text-red-600">*</span>
            </span>
            <input
              className={`${baseInput} ${tone(form.level)} ${errors.level ? "border-red-500" : ""}`}
              value={form.level}
              onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
            />
            {errors.level && <span className="text-red-500 text-xs">{errors.level}</span>}
          </label>

          {/* ประเภทตำแหน่ง/กลุ่มงาน */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              ประเภทตำแหน่ง/กลุ่มงาน <span className="text-red-600">*</span>
            </span>
            <input
              className={`${baseInput} ${tone(form.positionType)} ${errors.positionType ? "border-red-500" : ""}`}
              value={form.positionType}
              onChange={(e) => setForm((f) => ({ ...f, positionType: e.target.value }))}
            />
            {errors.positionType && <span className="text-red-500 text-xs">{errors.positionType}</span>}
          </label>

          {/* ประเภทบุคลากร */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              ประเภทบุคลากร <span className="text-red-600">*</span>
            </span>
            <input
              className={`${baseInput} ${tone(form.personnelType)} ${errors.personnelType ? "border-red-500" : ""}`}
              value={form.personnelType}
              onChange={(e) => setForm((f) => ({ ...f, personnelType: e.target.value }))}
            />
            {errors.personnelType && <span className="text-red-500 text-xs">{errors.personnelType}</span>}
          </label>

          {/* หน่วยงานระดับกอง / กอง / ศูนย์ */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              หน่วยงานระดับกอง / กอง / ศูนย์ <span className="text-red-600">*</span>
            </span>
            <input
              className={`${baseInput} ${tone(form.unitMajor)} ${errors.unitMajor ? "border-red-500" : ""}`}
              value={form.unitMajor}
              onChange={(e) => setForm((f) => ({ ...f, unitMajor: e.target.value }))}
            />
            {errors.unitMajor && <span className="text-red-500 text-xs">{errors.unitMajor}</span>}
          </label>

          {/* หน่วยงานระดับต่ำกว่าสำนักงาน / กอง / ศูนย์ 1 ระดับ */}
          <label className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">
              หน่วยงานระดับต่ำกว่าสำนักงาน / กอง / ศูนย์ 1 ระดับ <span className="text-red-600">*</span>
            </span>
            <input
              className={`${baseInput} ${tone(form.unitMinor)} ${errors.unitMinor ? "border-red-500" : ""}`}
              value={form.unitMinor}
              onChange={(e) => setForm((f) => ({ ...f, unitMinor: e.target.value }))}
            />
            {errors.unitMinor && <span className="text-red-500 text-xs">{errors.unitMinor}</span>}
          </label>
        </div>

        {/* footer */}
        <div className="h-16 px-4 border-t border-gray-300 flex items-center justify-end gap-3 bg-white">
          <button
            onClick={onClose}
            className="h-9 px-8 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="h-9 px-8 rounded bg-emerald-600 text-white hover:bg-emerald-700"
          >
            บันทึก
          </button>
        </div>
      </div>
    </>
  );
}
