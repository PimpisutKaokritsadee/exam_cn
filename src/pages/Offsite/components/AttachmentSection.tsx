import { Folder, Search, Trash2 } from "lucide-react";

type Props = {
    title?: string;
    supportText?: string;
    className?: string;
};

export default function AttachmentSection({
    title = "แนบเอกสาร",
    supportText = "รองรับไฟล์ JPG, JPEG, PNG, PDF และขนาดไม่เกิน 5 MB ต่อไฟล์",
    className,
}: Props) {
    return (
        <section className={`space-y-3 ${className ?? ""}`}>
            {/* หัวข้อ + ข้อความรองรับไฟล์ */}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{supportText}</p>

            {/* กล่องอัปโหลดตามภาพ */}
            <div className="rounded-md border-2 border-dashed border-emerald-300 bg-emerald-50">
                <div className="min-h-[220px] flex flex-col items-center justify-center text-emerald-700">
                    <Folder size={64} strokeWidth={1.75} />
                    <div className="mt-3 text-base">อัปโหลด หรือลากวางไฟล์ของคุณที่นี่</div>
                </div>
            </div>

            {/* ตารางพื้นขาว + ขอบเทาอ่อน */}
            <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-left font-light border-2 border-gray-200 w-20">
                                ลำดับ
                            </th>
                            <th className="px-4 py-2 text-left font-light border-2 border-gray-200 w-[32%]">
                                เอกสาร
                            </th>
                            <th className="px-4 py-2 text-left font-light border-2 border-gray-200 w-[30%]">
                                ชื่อเอกสาร
                            </th>
                            <th className="px-4 py-2 text-left font-light border-2 border-gray-200 w-[20%]">
                                วันที่อัปโหลดเอกสาร
                            </th>
                            <th className="px-4 py-2 text-center font-light border-2 border-gray-200 w-20">
                                เครื่องมือ
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-2 border-gray-200">
                            <td className="px-4 py-2 border-2 border-gray-200 text-center">1</td>
                            <td className="px-4 py-2 border-2 border-gray-200">เอกสาร.pdf</td>
                            <td className="px-4 py-2 border-2 border-gray-200">
                                <input
                                    className="h-9 w-full rounded border-2 border-gray-200 px-2 text-sm
                                    placeholder:text-gray-400 outline-none focus:ring-2
                                    focus:ring-emerald-600/30 focus:border-emerald-600"
                                    placeholder="โปรดระบุ"
                                />
                            </td>
                            <td className="px-4 py-2 border-2 border-gray-200 whitespace-nowrap">
                                01 ต.ค. 2564
                            </td>
                            <td className="px-4 py-2 border-2 border-gray-200">
                                <div className="flex justify-center gap-3 text-gray-600">
                                    <button className="hover:text-emerald-700" aria-label="preview">
                                        <Search size={18} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-600" aria-label="delete">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

            {/* เหตุผลการไม่อนุมัติ */}
            <div className="pt-4">
                <div className="rounded-md border-2 border-dashed border-gray-400">
                    <div className="text-lg font-semibold text-gray-900">เหตุผลการไม่อนุมัติ</div>
                    <p className="p-4">แก้ไขเอกสารแบบให้สมบูรณ์</p>
                </div>
            </div>
        </section>
    );
}
