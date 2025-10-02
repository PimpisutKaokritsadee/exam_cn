import { useState } from "react";
import PeopleTable from "./PeopleTable";
import WorkplaceLocation from "./WorkplaceLocation";
import DateShiftFields from "./DateShiftFields";
import AttachmentSection from "./AttachmentSection";

export default function MainForm() {
    // ฟิลด์หัวฟอร์ม
    const [taskType, setTaskType] = useState("");
    const [orderNo, setOrderNo] = useState("");
    const [offsiteType, setOffsiteType] = useState("");

    // เนื้อหา
    const [topic, setTopic] = useState("");
    const [detail, setDetail] = useState("");
    const [projectName, setProjectName] = useState("");

    // วันเวลา
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [startShift, setStartShift] = useState("ตลอดวัน");
    const [endShift, setEndShift] = useState("ตลอดวัน");

    return (
        <div className="border-2 border-dashed border-gray-500 rounded p-6 space-y-6">
            {/* ประเภทการปฏิบัติงาน */}
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700 font-bold font-display">
                    ประเภทการปฏิบัติงาน <span className="text-red-600">*</span>
                </span>
                <select
                    className={`h-9 rounded border border-gray-300 px-3 pr-8 text-sm outline-none
              focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 font-display
              ${taskType === "" ? "text-gray-400 focus:text-black" : "text-black"}`}
                    value={taskType}
                    onChange={(e) => setTaskType(e.target.value)}
                >
                    <option value="" disabled hidden>โปรดระบุ</option>
                    <option value="out">ปฏิบัติงานนอกสถานที่</option>
                </select>

            </label>

            {/* เลขที่คำสั่ง */}
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700 font-bold font-display">เลขที่คำสั่ง</span>
                <input
                    className="h-9 rounded border border-gray-300 px-3 text-sm
               placeholder:text-gray-400 outline-none font-display
               focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    value={orderNo}
                    onChange={(e) => setOrderNo(e.target.value)}
                    placeholder="โปรดระบุ"
                />
            </label>

            {/* ประเภทงานนอกสถานที่ */}
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700 font-bold font-display">
                    ประเภทการปฏิบัติงานนอกสถานที่ <span className="text-red-600">*</span>
                </span>
                <select
                    className={`h-9 rounded border border-gray-300 px-3 pr-8 text-sm outline-none
              focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 font-display
              ${taskType === "" ? "text-gray-400 focus:text-black" : "text-black"}`}
                    value={offsiteType}
                    onChange={(e) => setOffsiteType(e.target.value)}
                >
                    <option value="" disabled hidden>โปรดระบุ</option>
                    <option value="inspect">ออกตรวจราชการ</option>
                    <option value="field">ปฏิบัติงานภาคสนาม</option>
                    <option value="mission">ไปราชการ</option>
                </select>
            </label>

            {/* หัวข้อ/เรื่อง */}
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700 font-bold font-display">
                    หัวข้อ/เรื่อง <span className="text-red-600">*</span>
                </span>
                <input
                    className="h-9 rounded border border-gray-300 px-3 text-sm
               placeholder:text-gray-400 outline-none font-display
               focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="โปรดระบุ"
                />
            </label>

            {/* รายละเอียด */}
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700 font-bold font-display">รายละเอียดเพิ่มเติม (ถ้ามี)</span>
                <textarea
                    className="rounded border border-gray-300 px-3 py-2 text-sm min-h-[96px]
               placeholder:text-gray-400 outline-none font-display  
               focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="โปรดระบุ"
                />
            </label>

            {/* ชื่อโครงการ */}
            <label className="flex flex-col gap-1">
                <span className="text-sm text-gray-700 font-bold font-display">ชื่อโครงการ<span className="text-red-600">*</span></span>
                <input
                    className="h-9 rounded border border-gray-300 px-3 text-sm
               placeholder:text-gray-400 outline-none font-display
               focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="โปรดระบุ"
                />
            </label>


            <WorkplaceLocation />

            <DateShiftFields
                dateStart={dateStart}
                onChangeDateStart={setDateStart}
                startShift={startShift}
                onChangeStartShift={setStartShift}
                dateEnd={dateEnd}
                onChangeDateEnd={setDateEnd}
                endShift={endShift}
                onChangeEndShift={setEndShift}
            />

            {/* ตารางผู้ปฏิบัติงาน */}
            <PeopleTable />

            {/* แนบเอกสาร */}
            <AttachmentSection />
     
        </div>
    );
}
