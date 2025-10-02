export default function FooterActions() {
  return (
    <div className="flex justify-end gap-3 pt-2 border-t border-gray-200">
      <button className="h-10 px-4 rounded border border-gray-300 bg-white text-gray-700">
        ยกเลิก
      </button>
      <button className="h-10 px-4 rounded bg-amber-500 text-white hover:bg-amber-600">
        บันทึกร่าง
      </button>
      <button className="h-10 px-4 rounded bg-emerald-600 text-white hover:bg-emerald-700">
        บันทึก
      </button>
    </div>
  );
}
