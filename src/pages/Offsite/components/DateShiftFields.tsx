type ShiftRadioProps = {
  name: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
};

/** ปุ่มวิทยุแบบ custom: ใหญ่ คลิกง่าย ตรงสไตล์ตัวอย่าง */
function ShiftRadio({ name, value, onChange, className }: ShiftRadioProps) {
  const opts = ["ตลอดวัน", "ครึ่งเช้า", "ครึ่งบ่าย"] as const;

  return (
    <div className={`flex flex-wrap gap-x-8 gap-y-2 ${className ?? ""}`}>
      {opts.map((o) => (
        <label
          key={o}
          className="inline-flex font-display items-center gap-3 cursor-pointer select-none py-1"
        >
          {/* input ซ่อน แต่ยังโฟกัส/กดคีย์บอร์ดได้ */}
          <input
            type="radio"
            name={name}
            className="sr-only peer"
            checked={value === o}
            onChange={() => onChange(o)}
          />

          {/* วงแหวน + จุดด้านในด้วย ::after */}
          <span
            className="
              relative inline-block
              w-6 h-6 md:w-7 md:h-7           /* ขนาดรวม: ลดจากเดิม */
              rounded-full border-2 border-gray-400
              peer-checked:border-emerald-700
              transition

              /* จุดด้านใน */
              after:content-[''] after:absolute
              after:inset-1                      /* ขนาดจุด = วง - 2*1px inset */
              md:after:inset-[3px]               /* บน md ใหญ่ขึ้นนิด */
              after:rounded-full after:bg-emerald-700
              after:scale-0 peer-checked:after:scale-100
              after:transition-transform
            "
          />

          <span className="text-base">{o}</span>
        </label>
      ))}
    </div>
  );
}

/* ---- DateShiftFields ---- */
type Props = {
  dateStart: string;
  onChangeDateStart: (v: string) => void;

  startShift: string;
  onChangeStartShift: (v: string) => void;

  dateEnd: string;
  onChangeDateEnd: (v: string) => void;

  endShift: string;
  onChangeEndShift: (v: string) => void;

  className?: string;
};

export default function DateShiftFields({
  dateStart,
  onChangeDateStart,
  startShift,
  onChangeStartShift,
  dateEnd,
  onChangeDateEnd,
  endShift,
  onChangeEndShift,
  className,
}: Props) {
  const startId = "offsite-start-date";
  const endId = "offsite-end-date";

  return (
    <div className={`grid grid-cols-1 gap-6 ${className ?? ""}`}>
      {/* เริ่มต้น */}
      <div className="flex flex-col gap-2">
        <label htmlFor={startId} className="text-sm font-display text-gray-700">
          วันที่เริ่มต้นปฏิบัติงานนอกสถานที่ <span className="text-red-600">*</span>
        </label>

        <div className="flex flex-wrap items-center gap-6">
          <input
            id={startId}
            type="date"
            className="h-9 w-[240px] rounded border border-gray-300 px-3 text-sm
                       placeholder:text-gray-400 outline-none focus:ring-2  font-display
                       focus:ring-emerald-600/30 focus:border-emerald-600"
            value={dateStart}
            onChange={(e) => onChangeDateStart(e.target.value)}
          />
          <ShiftRadio name="startShift" value={startShift} onChange={onChangeStartShift} />
        </div>
      </div>

      {/* สิ้นสุด */}
      <div className="flex flex-col gap-2">
        <label htmlFor={endId} className="text-sm font-display text-gray-700">
          วันที่สิ้นสุดปฏิบัติงานนอกสถานที่ <span className="text-red-600">*</span>
        </label>

        <div className="flex flex-wrap items-center gap-6">
          <input
            id={endId}
            type="date"
            className="h-9 w-[240px] rounded border border-gray-300 px-3 text-sm
                       placeholder:text-gray-400 outline-none focus:ring-2 font-display
                       focus:ring-emerald-600/30 focus:border-emerald-600"
            value={dateEnd}
            onChange={(e) => onChangeDateEnd(e.target.value)}
          />
          <ShiftRadio name="endShift" value={endShift} onChange={onChangeEndShift} />
        </div>
      </div>
    </div>
  );
}
