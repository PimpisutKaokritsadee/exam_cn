import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  return (
    <div className="text-sm text-gray-600 flex items-center gap-2">
      {/* ไอคอนบ้าน */}
      <Home size={16} className="text-black" />

      <ChevronRight size={20} className="opacity-60 text-gray-400" />
      <span className="text-gray-400 font-display">กลุ่มงานทะเบียนประวัติบำเหน็จความชอบและระบบสารสนเทศทรัพยากรบุคคล</span>

      <ChevronRight size={20} className="opacity-60 text-gray-400" />
      <span className="text-gray-400 font-display">จัดการลงเวลาปฏิบัติราชการ</span>

      <ChevronRight size={20} className="opacity-60 text-gray-400" />
      <span className="text-black font-medium font-display">
        บันทึกการปฏิบัติการนอกสถานที่
      </span>
    </div>
  );
}
