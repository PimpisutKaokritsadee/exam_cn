// components/offsite/WorkplaceLocation.tsx
import { MapPin, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";


// Leaflet
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// แก้ปัญหาไอคอน Marker ไม่แสดงใน Vite/CRA
// (ใช้ url จาก CDN ของ leaflet)
const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function FlyTo({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 16, { animate: true });
    }, [center, map]);
    return null;
}

function ClickToMark({ onPick }: { onPick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onPick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function WorkplaceLocation() {
    // ฟอร์มลิงก์/สถานที่ (คงของเดิม)
    const [org, setOrg] = useState("");
    const [place, setPlace] = useState("");

    // ตำแหน่งเริ่มต้น — กทม.
    const defaultCenter = useMemo<[number, number]>(() => [13.7563, 100.5018], []);
    const [center, setCenter] = useState<[number, number]>(defaultCenter);
    const [marker, setMarker] = useState<[number, number]>(defaultCenter);

    // ช่องค้นหา
    const [query, setQuery] = useState("");
    const searching = useRef(false);

    // ค้นหาด้วย Nominatim (OpenStreetMap)
    const handleSearch = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!query.trim() || searching.current) return;

        try {
            searching.current = true;
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                query.trim()
            )}`;
            const res = await fetch(url);
            const data: Array<{ lat: string; lon: string; display_name: string }> = await res.json();
            if (data?.length) {
                const lat = parseFloat(data[0].lat);
                const lon = parseFloat(data[0].lon);
                setCenter([lat, lon]);
                setMarker([lat, lon]);
                setPlace(data[0].display_name); // เติมชื่อสถานที่อัตโนมัติ
            }
        } finally {
            searching.current = false;
        }
    };

    // เมื่อคลิกบนแมพ ให้ขยับ marker + เก็บ lat/lng ลง org (ตัวอย่าง: ลิงก์แผนที่)
    const handlePick = (lat: number, lng: number) => {
        setMarker([lat, lng]);
        setOrg(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`);
    };

    return (
        <div className="space-y-4">
            {/* แผนที่ + แถบค้นหา */}
            <div className="space-y-2">
                <div className="text-sm text-gray-700 font-extrabold">สถานที่ปฏิบัติงาน</div>

                <div className="border rounded relative overflow-hidden">
                    {/* แผนที่จริง */}
                    <div className="border rounded relative overflow-hidden z-0">
                        <MapContainer
                            center={center}
                            zoom={15}
                            className="w-full h-[420px] md:h-[480px] z-0"
                            scrollWheelZoom
                            attributionControl={false}
                            zoomControl={false}          // ปิด default ก่อน แล้วค่อยใส่ของเราเอง
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <FlyTo center={center} />
                            <ClickToMark onPick={handlePick} />
                            <Marker position={marker} icon={markerIcon} />

                            {/* ปุ่มซูมฝั่งขวา */}
                            <ZoomControl position="topright" />
                        </MapContainer>
                    </div>

                    {/* แถบค้นหาลอยทับ (กึ่งกลางล่าง) */}
                    <form
                        onSubmit={handleSearch}
                        className="
                            absolute left-1/2 -translate-x-1/2 bottom-4
                            w-[92%] md:w-[70%]
                            z-10 pointer-events-none       
                        "
                    >
                        <div className="flex items-center gap-3 bg-white border rounded-full h-12 px-4 shadow-lg pointer-events-auto">
                           <MapPin size={18} className="text-gray-500" />
                        <input
                            className="flex-1 outline-none text-sm"
                            placeholder="ค้นหาสถานที่"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="rounded-full px-3 py-1 text-sm text-gray-700 hover:text-emerald-700"
                            title="ค้นหา"
                        >
                            <Search size={18} />
                        </button> 
                        </div>
                        
                    </form>
                </div>

            </div>


            {/* องค์กร/สถานที่ (คงโครงจากของเดิม) */}
            <div className="grid grid-cols-1 gap-4">
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-gray-700 font-extrabold">ลิงก์สถานที่</span>
                    <input
                        className="h-9 w-full rounded border border-gray-300 px-3 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        placeholder="โปรดระบุ"
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm text-gray-700 font-extrabold">สถานที่</span>
                    <input
                        className="h-9 w-full rounded border border-gray-300 px-3 text-sm placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        placeholder="โปรดระบุ"
                    />
                </label>
            </div>
        </div>
    );
}
