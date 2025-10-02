import { useRef, useState } from "react";
import { Folder, FolderOpen, Search, Trash2 } from "lucide-react";

type Row = {
  id: string;
  file: File;
  url: string;
  displayName: string;
  uploadedAt: Date;
};

type Props = {
  title?: string;
  supportText?: string;
  className?: string;
  onChange?: (rows: Row[]) => void;
};

export default function AttachmentSection({
  title = "แนบเอกสาร",
  supportText = "รองรับไฟล์ JPG, JPEG, PNG, PDF และขนาดไม่เกิน 5 MB ต่อไฟล์",
  className,
  onChange,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // ---------- MOCK ROW (เริ่มต้นมีข้อมูลตัวอย่าง) ----------
  const makeMockRow = (): Row => {
    // ไฟล์ปลอมสำหรับพรีวิว (PDF ว่าง ๆ)
    const blob = new Blob([new Uint8Array([0x25, 0x50, 0x44, 0x46])], {
      type: "application/pdf",
    });
    const file = new File([blob], "เอกสาร.pdf", { type: "application/pdf" });

    // 01 ต.ค. 2564 -> ค.ศ. 2021-10-01 (locale th-TH จะโชว์ 2564 อัตโนมัติ)
    const uploadedAt = new Date(2021, 9, 1); // เดือน 0=ม.ค., 9=ต.ค.

    return {
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
      displayName: "",
      uploadedAt,
    };
  };

  const [rows, setRows] = useState<Row[]>(() => [makeMockRow()]); // << มีม็อกตั้งแต่แรก
  // -----------------------------------------------------------

  const MAX_MB = 5;
  const acceptExt = [".jpg", ".jpeg", ".png", ".pdf"];

  const fmt = (d: Date) =>
    d.toLocaleDateString("th-TH", { day: "2-digit", month: "short", year: "numeric" });

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const next: Row[] = [];
    const errors: string[] = [];

    Array.from(files).forEach((file) => {
      const ext = "." + file.name.split(".").pop()!.toLowerCase();
      const okExt = acceptExt.includes(ext);
      const okSize = file.size <= MAX_MB * 1024 * 1024;

      if (!okExt || !okSize) {
        errors.push(
          `${file.name} – ${!okExt ? "ชนิดไฟล์ไม่ถูกต้อง" : ""}${
            !okExt && !okSize ? " และ " : ""
          }${!okSize ? `ขนาดเกิน ${MAX_MB}MB` : ""}`
        );
        return;
      }

      next.push({
        id: crypto.randomUUID(),
        file,
        url: URL.createObjectURL(file),
        displayName: "",
        uploadedAt: new Date(),
      });
    });

    if (errors.length) alert("อัปโหลดบางไฟล์ไม่สำเร็จ:\n" + errors.join("\n"));

    setRows((prev) => {
      const merged = [...prev, ...next];
      onChange?.(merged);
      return merged;
    });
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addFiles(e.dataTransfer.files);
  };
  const handleBrowse = () => inputRef.current?.click();

  const updateName = (id: string, name: string) =>
    setRows((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, displayName: name } : r));
      onChange?.(updated);
      return updated;
    });

  const removeRow = (id: string) =>
    setRows((prev) => {
      const target = prev.find((r) => r.id === id);
      if (target) URL.revokeObjectURL(target.url);
      const updated = prev.filter((r) => r.id !== id);
      onChange?.(updated);
      return updated;
    });

  const preview = (url: string) => window.open(url, "_blank");

  return (
    <section className={`space-y-3 ${className ?? ""}`}>
      <h3 className="text-lg font-bold font-display text-gray-900">{title}</h3>
      <p className="text-sm font-display text-gray-600">{supportText}</p>

      {/* กล่องอัปโหลด */}
      <div
        className="rounded-md font-display border-2 border-dashed border-emerald-300 bg-emerald-50 cursor-pointer"
        onClick={handleBrowse}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={handleDrop}
        role="button"
        aria-label="อัปโหลดหรือวางไฟล์ที่นี่"
      >
        <div className="min-h-[220px] flex flex-col items-center justify-center text-emerald-700 select-none">
          <FolderOpen size={64} strokeWidth={1.75} />
          <div className="mt-3 text-base">อัปโหลด หรือลากวางไฟล์ของคุณที่นี่</div>
        </div>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          multiple
          accept={acceptExt.join(",")}
          onChange={(e) => {
            addFiles(e.target.files);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {/* ตารางรายการไฟล์ */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border font-display border-gray-200 ">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left font-medium border-2 border-gray-200 w-20">ลำดับ</th>
              <th className="px-4 py-2 text-left font-medium border-2 border-gray-200 w-[32%]">เอกสาร</th>
              <th className="px-4 py-2 text-left font-medium border-2 border-gray-200 w-[30%]">ชื่อเอกสาร</th>
              <th className="px-4 py-2 text-left font-medium border-2 border-gray-200 w-[20%]">วันที่อัปโหลดเอกสาร</th>
              <th className="px-4 py-2 text-center font-medium border-2 border-gray-200 w-20">เครื่องมือ</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center text-gray-500 border-2 border-gray-200">
                  -- ยังไม่มีไฟล์แนบ --
                </td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr key={r.id} className="border-2 border-gray-200">
                  <td className="px-4 py-2 border-2 border-gray-200 text-center">{idx + 1}</td>
                  <td className="px-4 py-2 border-2 border-gray-200 truncate" title={r.file.name}>
                    {r.file.name}
                  </td>
                  <td className="px-4 py-2 border-2 border-gray-200">
                    <input
                      className="h-9 w-full rounded border-2 border-gray-200 px-2 text-sm placeholder:text-gray-400 outline-none
                                 focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                      placeholder="โปรดระบุ"
                      value={r.displayName}
                      onChange={(e) => updateName(r.id, e.target.value)}
                    />
                  </td>
                  <td className="px-4 py-2 border-2 border-gray-200 whitespace-nowrap">{fmt(r.uploadedAt)}</td>
                  <td className="px-4 py-2 border-2 border-gray-200">
                    <div className="flex justify-center gap-3 text-gray-600">
                      <button className="hover:text-emerald-700" aria-label="preview" onClick={() => preview(r.url)}>
                        <Search size={18} />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        aria-label="delete"
                        onClick={() => removeRow(r.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* เหตุผลการไม่อนุมัติ */}
      <div className="pt-4">
        <div className="rounded-md font-display border-2 border-dashed border-gray-400">
          <div className="text-lg font-semibold font-display text-gray-900">เหตุผลการไม่อนุมัติ</div>
          <p className="p-4">แก้ไขเอกสารแบบให้สมบูรณ์</p>
        </div>
      </div>
    </section>
  );
}
