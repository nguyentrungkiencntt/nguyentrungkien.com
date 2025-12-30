"use client";
import { LoadingHeaderHome } from "@/utils/loading";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Weather = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type Coord = { lon: number; lat: number };

type MainWeather = { temp: number; feels_like: number; humidity: number; pressure: number };

type Wind = { speed: number; deg: number };

type Sys = { country?: string };

type CurrentResp = {
    coord: Coord;
    weather: Weather[];
    main: MainWeather;
    wind: Wind;
    sys?: Sys;
    name?: string;
};

type Daily = {
    dt: number;
    temp: { min: number; max: number; day: number };
    weather: Weather[];
    wind_speed: number;
    pop?: number;
};

type OneCall = { daily: Daily[]; alerts?: { event?: string; start?: number; end?: number; description?: string }[] };


const API_KEY = process.env.NEXT_PUBLIC_OWM_API_KEY || "cd79c13e2679bf61a54e3725c8e9c28e";
const DEFAULT_CITY = "Danang";

function kToC(k: number) { return +(k - 273.15).toFixed(1); }
function kToF(k: number) { return +(((k - 273.15) * 9) / 5 + 32).toFixed(1); }
function unixToDay(ts: number) { return new Date(ts * 1000).toLocaleDateString(undefined, { weekday: "short" }); }


export default function WeatherStudio() {
    const [query, setQuery] = useState<string>(DEFAULT_CITY);
    const [loading, setLoading] = useState(false);
    const [current, setCurrent] = useState<CurrentResp | null>(null);
    const [onecall, setOnecall] = useState<OneCall | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [unit, setUnit] = useState<"c" | "f">("c");
    const [coords, setCoords] = useState<Coord | null>(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchByCity(DEFAULT_CITY); }, []);

    async function fetchByCity(city: string) {
        if (!API_KEY || API_KEY === "REPLACE_WITH_YOUR_KEY") {
            setError("Thiếu API key OpenWeatherMap - đặt NEXT_PUBLIC_OWM_API_KEY");
            return;
        }
        setLoading(true); setError(null);
        try {
            const q = encodeURIComponent(`${city},VN`);
            const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${q}&lang=vi&appid=${API_KEY}`);
            if (!r.ok) throw new Error(`Không tìm thấy: ${r.status}`);
            const data: CurrentResp = await r.json();
            setCurrent(data);
            setCoords(data.coord);
            await fetchOneCall(data.coord.lat, data.coord.lon);
            setQuery(data.name || city);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Lỗi");
            setCurrent(null); setOnecall(null);
        } finally { setLoading(false); }
    }

    async function fetchOneCall(lat: number, lon: number) {
        try {
            const r = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lang=vi&lon=${lon}&exclude=minutely,hourly&appid=${API_KEY}`);
            if (!r.ok) throw new Error("OneCall API error");
            const data: OneCall = await r.json();
            setOnecall(data);
        } catch { setOnecall(null); }
    }

    async function useMyLocation() {
        if (!navigator.geolocation) { setError("Geolocation không hỗ trợ"); return; }
        setLoading(true); setError(null);
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const lat = pos.coords.latitude; const lon = pos.coords.longitude;
                setCoords({ lat, lon });
                const r = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lang=vi&lon=${lon}&appid=${API_KEY}`);
                if (!r.ok) throw new Error("Lỗi API vị trí");
                const d: CurrentResp = await r.json();
                setCurrent(d);
                await fetchOneCall(lat, lon);
                setQuery(d.name || "");
            } catch (e) { setError(e instanceof Error ? e.message : "Lỗi"); }
            setLoading(false);
        }, (err) => { setError(err.message); setLoading(false); }, { enableHighAccuracy: true });
    }

    const temp = useMemo(() => {
        if (!current) return "--";
        const rawK = current.main.temp;
        return unit === "c" ? `${kToC(rawK)}°C` : `${kToF(rawK)}°F`;
    }, [current, unit]);

    const sparkData = useMemo(() => {
        if (!onecall?.daily) return [];
        return onecall.daily.slice(0, 7).map(d => ({ name: unixToDay(d.dt), temp: +(d.temp.day - 273.15).toFixed(1) }));
    }, [onecall]);

    return (
        <div>
            <div className="fixed top-0 left-0 z-20 right-0 bg-linear-to-br from-[#001829] via-[#05204a] to-[#1a1f3a] text-white">
                <LoadingHeaderHome />
            </div>
            <main className="min-h-screen mt-28 bg-linear-to-br from-[#001829] via-[#05204a] to-[#1a1f3a] text-slate-100 p-6">
                <div className="max-w-6xl mx-auto">
                    <nav className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="text-2xl font-extrabold tracking-tight">Ứng dụng thời tiết</div>
                            <div className="text-sm opacity-70">Thời tiết & dự báo • trực tiếp</div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setUnit(u => u === "c" ? "f" : "c")}
                                className="bg-white/6 px-3 py-2 rounded-md hover:bg-white/10">Đơn vị: {unit === "c" ? "°C" : "°F"}</button>
                            <button onClick={useMyLocation} className="bg-linear-to-r from-cyan-400/10 to-blue-400/10 px-3 py-2 rounded-md">Lấy vị trí hiện tại</button>
                        </div>
                    </nav>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        <div className="lg:col-span-1 p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/6">
                            <div className="mb-4">
                                <label className="block text-xs opacity-80">Tìm tỉnh/thành</label>
                                <div className="flex gap-2 mt-2">
                                    <input value={query} onChange={e => setQuery(e.target.value)} className="flex-1 bg-transparent border border-white/10 px-3 py-2 rounded-md outline-none" />
                                    <button onClick={() => fetchByCity(query)} className="px-3 py-2 rounded-md bg-blue-500/30">Tìm</button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="text-sm opacity-80">Thành phố gợi ý</div>
                                <div className="flex flex-wrap gap-2">
                                    {['Hanoi', 'Ho Chi Minh', 'Da Nang', 'Nha Trang', 'Hue'].map(c => (
                                        <button key={c} onClick={() => fetchByCity(c)} className="px-3 py-1 rounded-md bg-white/6">{c}</button>
                                    ))}
                                </div>
                            </div>

                            {error && <div className="mt-4 text-sm text-red-300">⚠️ {error}</div>}

                            <div className="mt-6">
                                <div className="text-xs opacity-80">7 ngày - nhiệt độ trung bình</div>
                                <div style={{ height: 110 }} className="mt-3">
                                    <ResponsiveContainer width="100%" height={110}>
                                        <LineChart data={sparkData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                                            <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                                            <YAxis hide domain={[(dataMin: number) => Math.floor(dataMin) - 2, (dataMax: number) => Math.ceil(dataMax) + 2]} />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="temp" stroke="#60a5fa" strokeWidth={2} dot={{ r: 2 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-2 p-6 rounded-3xl bg-linear-to-br from-white/5 to-white/3 backdrop-blur-md border border-white/8 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10 -z-10" style={{ backgroundImage: 'linear-gradient(120deg, rgba(96,165,250,0.06), rgba(99,102,241,0.04))' }} />

                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl font-bold">{current?.name ?? '—'}</div>
                                        <div className="text-sm opacity-70">{current?.sys?.country ?? 'VN'}</div>
                                    </div>
                                    <div className="mt-2 text-2xl font-semibold">{current ? (unit === 'c' ? `${kToC(current.main.temp)}°C` : `${kToF(current.main.temp)}°F`) : '--'}</div>
                                    <div className="mt-1 text-sm opacity-80">Cảm giác như: {current ? (unit === 'c' ? `${kToC(current.main.feels_like)}°C` : `${kToF(current.main.feels_like)}°F`) : '--'}</div>
                                </div>

                                <div className="flex items-center gap-4">
                                    {current && (
                                        <Image height={400} width={400} src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`} alt="icon" className="w-28 h-28" />
                                    )}
                                    <div className="text-right">
                                        <div className="text-sm opacity-70">Gió</div>
                                        <div className="font-semibold">{current ? `${current.wind.speed} m/s` : '--'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-3 rounded-lg bg-white/6">
                                    <div className="text-xs opacity-80">Độ ẩm</div>
                                    <div className="font-semibold mt-1">{current ? `${current.main.humidity}%` : '--'}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-white/6">
                                    <div className="text-xs opacity-80">Áp suất</div>
                                    <div className="font-semibold mt-1">{current ? `${current.main.pressure} hPa` : '--'}</div>
                                </div>
                                <div className="p-3 rounded-lg bg-white/6">
                                    <div className="text-xs opacity-80">Tình trạng</div>
                                    <div className="font-semibold mt-1">{current ? current.weather[0].description : '--'}</div>
                                </div>
                            </div>
                            
                            {onecall?.alerts && onecall.alerts.length > 0 && (
                                <div className="mt-6 p-3 rounded-lg bg-red-600/20 border border-red-600/40">
                                    <div className="font-semibold">⚠️ Cảnh báo:</div>
                                    {onecall.alerts.map((a, i) => (
                                        <div key={i} className="mt-2 text-sm">
                                            <div className="font-semibold">{a.event}</div>
                                            <div className="text-xs opacity-80 whitespace-pre-wrap">{a.description}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* 7-day forecast strip */}
                            <div className="mt-6">
                                <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
                                    {onecall?.daily?.slice(0, 7).map((d, idx) => (
                                        <div key={idx} className="p-3 text-center rounded-lg bg-white/4">
                                            <div className="text-xs opacity-80">{unixToDay(d.dt)}</div>
                                            <Image height={400} width={400} src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`} alt="w" className="mx-auto" />
                                            <div className="mt-2 text-sm">{Math.round(d.temp.day - 273.15)}°</div>
                                            <div className="text-xs opacity-80">{d.pop ? `${Math.round((d.pop || 0) * 100)}%` : ''}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </section>

                    <footer className="mt-8 text-center text-sm opacity-70">Dữ liệu từ OpenWeatherMap • Thiết kế: Nguyễn Trung Kiên</footer>
                </div>
            </main>
        </div>
    );
}

