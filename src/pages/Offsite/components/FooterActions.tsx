export default function FooterActions() {
  return (
    <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
      <button className="h-9 px-7 rounded border border-gray-400 bg-white text-gray-700">
        ยกเลิก
      </button>
      <button className="h-9 px-8 rounded border border-gray-400 bg-amber-500 text-black hover:bg-amber-600">
        บันทึกร่าง
      </button>
      <button className="h-9 px-6 rounded border border-gray-400 bg-emerald-600 text-white hover:bg-emerald-700">
        บันทึก
      </button>
    </div>
  );
}
