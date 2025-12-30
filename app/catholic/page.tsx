"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LoadingHeaderHome } from "@/utils/loading";
import UnderConstructionPage from "@/components/Key";


type ParishInfo = {
  name: string;
  address?: string;
  priest?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
};

type EventItem = {
  id: string;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time?: string; // hh:mm
  location?: string;
  description?: string;
};

type PrayerPost = {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO
  answered?: boolean;
};

type Sermon = {
  id: string;
  title: string;
  videoUrl?: string; // youtube or mp4
  description?: string;
  date?: string; // ISO
};

type DailyVerse = {
  text: string;
  reference: string;
};

/* ========================= MOCK / DEFAULTS ========================= */

const DEFAULT_PARISH: ParishInfo = {
  name: "Giáo xứ Thánh Tâm",
  address: "123 Phố Thánh, Quận Tin, Thành phố Hy Vọng",
  priest: "Lm. Phan Văn Đức",
  phone: "+84 9xx xxx xxx",
  email: "contact@giaoxu.example",
  website: "https://giaoxu.example",
  description:
    "Giáo xứ Thánh Tâm chào đón mọi người — sinh hoạt cộng đoàn, thánh lễ, bác ái xã hội, và các lớp giáo lý.",
};

const SAMPLE_EVENTS: EventItem[] = [
  { id: "e1", title: "Thánh lễ Chúa Nhật", date: addDaysISO(1), time: "08:00", location: "Nhà thờ chính", description: "Thánh lễ dành cho gia đình" },
  { id: "e2", title: "Lớp Giáo lý", date: addDaysISO(3), time: "18:30", location: "Phòng học giáo xứ", description: "Cho thiếu nhi và thanh niên" },
];

const SAMPLE_SERMONS: Sermon[] = [
  { id: "s1", title: "Bài giảng: Tình yêu và hy vọng", videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", description: "Bài giảng mẫu", date: addDaysISO(-7) },
];

/* ========================= HELPERS ========================= */

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

function nowISO() {
  return new Date().toISOString();
}

function addDaysISO(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/* ========================= STORAGE KEYS ========================= */

const STORAGE = {
  PRAYERS: "catholic:prayers",
  EVENTS: "catholic:events",
};

/* ========================= MAIN PAGE ========================= */

export default function CatholicPage() {
  const [parish] = useState<ParishInfo>(DEFAULT_PARISH);
  const [events, setEvents] = useState<EventItem[]>(() => loadFromStorage<EventItem[]>(STORAGE.EVENTS, SAMPLE_EVENTS));
  const [prayers, setPrayers] = useState<PrayerPost[]>(() => loadFromStorage<PrayerPost[]>(STORAGE.PRAYERS, []));
  const [sermons] = useState<Sermon[]>(SAMPLE_SERMONS);
  const [verse, setVerse] = useState<DailyVerse | null>(null);
  const [loadingVerse, setLoadingVerse] = useState<boolean>(false);

  useEffect(() => { saveToStorage(STORAGE.EVENTS, events); }, [events]);
  useEffect(() => { saveToStorage(STORAGE.PRAYERS, prayers); }, [prayers]);

  useEffect(() => {
    // fetch daily verse from OurManna API
    async function fetchVerse() {
      setLoadingVerse(true);
      try {
        // OurManna API: https://www.ourmanna.com/api/v1/get/?format=json&order=daily
        const res = await fetch("https://www.ourmanna.com/api/v1/get/?format=json&order=daily");
        if (!res.ok) throw new Error("Verse API error");
        const data = await res.json();
        const verseText = data?.verse?.details?.text ?? "Chúa yêu thương bạn.";
        const ref = data?.verse?.details?.reference ?? "Lời Chúa";
        setVerse({ text: verseText, reference: ref });
      } catch (e) {
        // fallback
        setVerse({ text: "Lạy Chúa, xin soi dẫn con.", reference: "Thánh Kinh - Lời Chúa" });
      } finally {
        setLoadingVerse(false);
      }
    }
    fetchVerse();
  }, []);

  function addPrayer(author: string, content: string) {
    const p: PrayerPost = { id: uid("p"), author, content, createdAt: nowISO(), answered: false };
    setPrayers(prev => [p, ...prev]);
  }

  function addEvent(ev: Omit<EventItem, "id">) {
    const e: EventItem = { ...ev, id: uid("e") };
    setEvents(prev => [e, ...prev].sort((a, b) => a.date.localeCompare(b.date)));
  }

  function markAnswered(prayerId: string) {
    setPrayers(prev => prev.map(p => p.id === prayerId ? { ...p, answered: true } : p));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      {open ? <main className="min-h-screen bg-linear-to-br from-[#020617] via-[#031a35] to-[#042b4e] text-slate-100 p-6">
        <div>
          <div className="fixed z-40 top-0 bg-gray-950 right-0 left-0">
            <LoadingHeaderHome />
          </div>
          <div className="max-w-6xl mx-auto mt-30">

            <Header parish={parish} />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2 space-y-6">
                <Hero />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl bg-white/5">
                    <h3 className="text-xl font-semibold">Lời Chúa hôm nay</h3>
                    <div className="mt-3">
                      {loadingVerse ? (
                        <div className="text-sm opacity-70">Đang tải...</div>
                      ) : (
                        <blockquote className="italic text-lg">“{verse?.text}”</blockquote>
                      )}
                      <div className="mt-2 text-sm opacity-70">{verse?.reference}</div>
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 rounded-2xl bg-white/5">
                    <h3 className="text-xl font-semibold">Bài giảng gần đây</h3>
                    <div className="mt-3 space-y-3">
                      {sermons.map(s => (
                        <div key={s.id} className="p-3 bg-white/6 rounded-md">
                          <div className="flex items-start gap-3">
                            <div className="flex-1">
                              <div className="font-semibold">{s.title}</div>
                              <div className="text-sm opacity-70">{s.date}</div>
                              <div className="mt-2 text-sm opacity-80">{s.description}</div>
                            </div>
                            {s.videoUrl && (
                              <div className="w-40">
                                <iframe className="w-full h-24 rounded-md" src={s.videoUrl} title={s.title} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5">
                  <h3 className="text-xl font-semibold">Cộng đồng - Bảng cầu nguyện</h3>
                  <PrayerWall prayers={prayers} onAdd={addPrayer} onMarkAnswered={markAnswered} />
                </div>

                <div className="p-6 rounded-2xl bg-white/5">
                  <h3 className="text-xl font-semibold">Sự kiện & Lịch sinh hoạt</h3>
                  <EventManager events={events} onAdd={addEvent} parish={parish} />
                </div>

              </div>

              <aside className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/5">
                  <ParishCard parish={parish} />
                </div>

                <div className="p-6 rounded-2xl bg-white/5">
                  <h4 className="font-semibold">Liên kết nhanh</h4>
                  <ul className="mt-3 space-y-2 text-sm opacity-80">
                    <li><a className="underline" href="#">Đăng ký lớp Giáo lý</a></li>
                    <li><a className="underline" href="#">Bác ái xã hội</a></li>
                    <li><a className="underline" href="#">Đóng góp</a></li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white/5">
                  <h4 className="font-semibold">Thông tin liên hệ</h4>
                  <div className="mt-2 text-sm opacity-80">
                    <div>Điện thoại: {parish.phone}</div>
                    <div>Email: {parish.email}</div>
                    <div>Địa chỉ: {parish.address}</div>
                  </div>
                </div>
              </aside>
            </section>

            <footer className="mt-12 text-center opacity-70">© {new Date().getFullYear()} {parish.name} • Trang cá nhân</footer>
          </div>
        </div>
      </main> : < UnderConstructionPage />}
    </div>
  );
}

/* ========================= SUB-COMPONENTS ========================= */

function Header({ parish }: { parish: ParishInfo }) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-300">{parish.name}</div>
        <div className="text-2xl font-bold">Chia sẻ đức tin & giới thiệu giáo xứ</div>
      </div>
      <nav className="flex items-center gap-3">
        <a href="#" className="text-sm opacity-80">Trang chủ</a>
        <a href="#" className="text-sm opacity-80">Tin tức</a>
        <a href="#" className="text-sm opacity-80">Liên hệ</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-8 rounded-3xl bg-linear-to-br from-[#04132a] to-[#072a44]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2">
          <h1 className="text-4xl font-extrabold">Lòng mến Chúa và yêu thương người — Hành trình đức tin</h1>
          <p className="mt-4 text-slate-200">Chia sẻ cảm nghiệm cá nhân, suy niệm Lời Chúa, và sinh hoạt cộng đồng. Mời bạn cùng đồng hành và cầu nguyện.</p>
          <div className="mt-6 flex gap-3">
            <a href="#" className="px-4 py-2 rounded-md bg-linear-to-r from-cyan-400 to-indigo-600 text-black font-semibold">Tham gia Thánh lễ</a>
            <a href="#" className="px-4 py-2 rounded-md bg-white/6">Gửi lời cầu nguyện</a>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-56 h-56 rounded-full bg-linear-to-tr from-yellow-400/10 to-white/10 flex items-center justify-center border border-white/6">
            <img src="/images/cross.png" alt="cross" className="w-28 h-28" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ParishCard({ parish }: { parish: ParishInfo }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">Giới thiệu giáo xứ</h3>
      <div className="mt-3 text-sm opacity-90">{parish.description}</div>
      <div className="mt-4 px-3 py-2 bg-white/6 rounded-md">
        <div className="text-sm">Cha xứ: <strong>{parish.priest}</strong></div>
        <div className="text-sm">Địa chỉ: <strong>{parish.address}</strong></div>
      </div>
    </div>
  );
}

/* Prayer wall */
function PrayerWall({ prayers, onAdd, onMarkAnswered }: { prayers: PrayerPost[]; onAdd: (author: string, content: string) => void; onMarkAnswered: (id: string) => void; }) {
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <div>
      <form onSubmit={(e) => { e.preventDefault(); if (!content.trim()) return; onAdd(name || 'Bạn ẩn danh', content.trim()); setContent(''); setName(''); }} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Tên (tùy chọn)" className="w-full px-3 py-2 rounded-md bg-transparent border border-white/10" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Viết lời cầu nguyện của bạn..." className="w-full px-3 py-2 rounded-md bg-transparent border border-white/10" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded-md bg-linear-to-r from-cyan-400 to-indigo-600 text-black font-semibold">Gửi lời cầu nguyện</button>
        </div>
      </form>

      <div className="mt-6 space-y-3 max-h-72 overflow-auto">
        {prayers.length === 0 && <div className="text-sm opacity-70">Chưa có lời cầu nguyện nào.</div>}
        {prayers.map(p => (
          <div key={p.id} className={`p-3 rounded-md ${p.answered ? 'bg-emerald-600/20' : 'bg-white/6'}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{p.author}</div>
                <div className="text-xs opacity-70">{new Date(p.createdAt).toLocaleString()}</div>
              </div>
              <div className="text-sm">
                {p.answered ? <span className="text-emerald-300">Đã nhận lời</span> : <button onClick={() => onMarkAnswered(p.id)} className="underline">Đã được đáp?</button>}
              </div>
            </div>
            <div className="mt-2 text-sm">{p.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Events manager */
function EventManager({ events, onAdd, parish }: { events: EventItem[]; onAdd: (ev: Omit<EventItem, 'id'>) => void; parish: ParishInfo }) {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState<string>("18:00");
  const [location, setLocation] = useState<string>(parish.address ?? "");
  const [description, setDescription] = useState<string>("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return alert('Nhập tiêu đề sự kiện');
    onAdd({ title, date, time, location, description });
    setTitle(''); setDescription('');
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Tiêu đề" className="w-full px-3 py-2 rounded-md bg-transparent border border-white/10" />
        <div className="grid grid-cols-2 gap-2">
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-3 py-2 rounded-md bg-transparent border border-white/10" />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} className="px-3 py-2 rounded-md bg-transparent border border-white/10" />
        </div>
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Địa điểm" className="w-full px-3 py-2 rounded-md bg-transparent border border-white/10" />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Mô tả" className="w-full px-3 py-2 rounded-md bg-transparent border border-white/10" />
        <div className="flex justify-end">
          <button type="submit" className="px-4 py-2 rounded-md bg-linear-to-r from-cyan-400 to-indigo-600 text-black">Thêm sự kiện</button>
        </div>
      </form>

      <div className="mt-4 space-y-3">
        {events.length === 0 && <div className="text-sm opacity-70">Chưa có sự kiện.</div>}
        {events.map(ev => (
          <div key={ev.id} className="p-3 bg-white/6 rounded-md">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{ev.title}</div>
                <div className="text-xs opacity-70">{ev.date} {ev.time ? `• ${ev.time}` : ''}</div>
                <div className="mt-2 text-sm opacity-80">{ev.description}</div>
              </div>
              <div className="text-sm opacity-70">{ev.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================= STORAGE HELPERS ========================= */

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch { }
}
