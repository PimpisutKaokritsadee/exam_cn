import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  return (
    <div className="text-sm text-gray-600 flex items-center gap-2">
      <span>กลุ่มงานทะเบียนประวัติบำเหน็จความชอบและระบบสารสนเทศทรัพยากรบุคคล</span>
      <ChevronRight size={14} className="opacity-60" />
      <span>จัดการลงเวลาปฏิบัติราชการ</span>
      <ChevronRight size={14} className="opacity-60" />
      <span className="text-gray-900 font-medium">
        บันทึกการปฏิบัติการนอกสถานที่
      </span>
    </div>
  );
}
