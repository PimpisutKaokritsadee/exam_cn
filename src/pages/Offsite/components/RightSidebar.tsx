export default function RightSidebar() {
  const approvers = [
    { step: "จัดทำเอกสาร", person: "นาง อรนุช พิพัฒนา" },
    { step: "รออนุมัติ", person: "นาย วิสุท ไพศาลแสงรวี" },
  ];

  return (
    <div className="border border-gray-300 rounded p-4 space-y-4">
      <h3 className="font-medium text-gray-900">ลำดับขั้นตอนการอนุมัติ</h3>
      <div className="space-y-3">
        {approvers.map((a, i) => (
          <div key={i} className="flex items-center gap-3 relative">
            
            <img
              className="w-11 h-11 rounded-full mb-2"
              src={`https://i.pravatar.cc/40?img=${i + 12}`}
              alt={a.person}
            />
            <div className="flex-1 min-w-0 mb-2">
              <div
                className={`text-sm truncate ${
                  i === 0 ? "font-bold text-black" : "text-gray-500"
                }`}
              >
                {a.step}
              </div>
              <div
                className={`text-sm truncate mt-1 ${
                  i === 0 ? "text-black" : "text-gray-500"
                }`}
              >
                {a.person}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
