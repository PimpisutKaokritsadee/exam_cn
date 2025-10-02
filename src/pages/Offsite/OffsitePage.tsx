import Breadcrumb from "../Offsite/components/Breadcrumb";
import MainForm from "../Offsite/components/MainForm";
import RightSidebar from "../Offsite/components/RightSidebar";
import FooterActions from "../Offsite/components/FooterActions";

export default function OffsitePage() {
    return (
        <div className="space-y-4">
            <Breadcrumb />

            <h1 className="text-lg font-semibold text-gray-900 font-display">
                บันทึกการปฏิบัติการนอกสถานที่
            </h1>

            {/* main + right */}
            <div className="grid grid-cols-1 lg:grid-cols-13 gap-6 items-start">
                {/* mainform (ซ้าย) */}
                <section className="lg:col-span-10">
                    <MainForm />
                </section>

                {/* right sidebar (ขวา) */}
                <aside className="lg:col-span-3">
                    {/* ทำให้ค้างด้านบนเวลาเลื่อน */}
                    <div className="lg:sticky lg:top-4">
                        <RightSidebar />
                    </div>
                </aside>
            </div>

            {/* footer เต็มความกว้างด้านล่าง */}
            <div>
                <FooterActions />
            </div>
        </div>
    );

}
