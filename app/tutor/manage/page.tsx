"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';

/* -------------------- Types -------------------- */

type Student = { id: string; name: string; phone?: string; email?: string };
type ScheduleItem = { id: string; studentId: string; date: string; start: string; durationMinutes: number; status: 'pending'|'confirmed'|'done' };

type QuizSummary = { id: string; title: string; attempts: number; avgScore: number };

/* -------------------- Mock / Storage -------------------- */
const STORAGE = { STUDENTS: 'ts:students', SCHEDULE: 'ts:schedule', QUIZZES: 'ts:quizzes' };

function load<T>(key: string, fallback: T): T {
  try { const r = typeof window !== 'undefined' ? localStorage.getItem(key) : null; return r ? JSON.parse(r) as T : fallback; } catch { return fallback; }
}
function save<T>(key: string, v: T) { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }

const DEFAULT_STUDENTS: Student[] = [ { id: 'st1', name: 'Lan', phone: '09', email: 'lan@example.com' }, { id: 'st2', name: 'Minh', phone: '08', email: 'minh@example.com' } ];

/* -------------------- Component -------------------- */
export default function DashboardPage() {
  const [students, setStudents] = useState<Student[]>(() => load(STORAGE.STUDENTS, DEFAULT_STUDENTS));
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => load(STORAGE.SCHEDULE, []));
  const [quizzes, setQuizzes] = useState<QuizSummary[]>(() => load(STORAGE.QUIZZES, [{ id: 'q1', title: 'Quiz mẫu', attempts: 5, avgScore: 82 }]));

  useEffect(() => save(STORAGE.STUDENTS, students), [students]);
  useEffect(() => save(STORAGE.SCHEDULE, schedule), [schedule]);
  useEffect(() => save(STORAGE.QUIZZES, quizzes), [quizzes]);

  const upcoming = useMemo(() => schedule.filter(s => new Date(s.date) >= new Date()).slice(0,6), [schedule]);

  /* Simple stat data for charts */
  const revenueData = useMemo(() => {
    // mock revenue last 7 days
    const days = Array.from({length:7}).map((_,i)=>({ day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], revenue: (i+1)*200 }));
    return days;
  }, []);

  const studentGrowth = useMemo(() => {
    return [{ month: 'Jan', students: 10 }, { month: 'Feb', students: 12 }, { month: 'Mar', students: 14 }, { month: 'Apr', students: 16 }];
  }, []);

  function addStudent(name: string) { const s: Student = { id: 'st_'+Math.random().toString(36).slice(2,8), name }; setStudents(prev=>[s,...prev]); }
  function addSchedule(studentId: string, date: string, start: string) { const it: ScheduleItem = { id: 'sc_' + Math.random().toString(36).slice(2,8), studentId, date, start, durationMinutes: 60, status: 'pending' }; setSchedule(prev=>[it,...prev]); }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#020617] via-[#041530] to-[#06223a] text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Dashboard quản lý — Gia sư Toán</h1>
          <div className="text-sm opacity-80">Dark mode • Bảng & biểu đồ</div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-sm opacity-80">Học viên</div>
              <div className="mt-3 space-y-2 max-h-48 overflow-auto">
                {students.map(s => (
                  <div key={s.id} className="p-2 bg-white/4 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs opacity-70">{s.email}</div>
                    </div>
                    <div className="text-xs opacity-70">{s.phone}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <button onClick={() => addStudent('Học viên mới')} className="px-3 py-1 rounded-md bg-cyan-600/80">Thêm học viên</button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-sm opacity-80">Lịch sắp tới</div>
              <div className="mt-3 space-y-2">
                {upcoming.length===0 && <div className="text-sm opacity-70">Chưa có lịch</div>}
                {upcoming.map(it => (
                  <div key={it.id} className="p-2 bg-white/4 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-medium">{students.find(s=>s.id===it.studentId)?.name ?? 'Khách'}</div>
                      <div className="text-xs opacity-70">{it.date} • {it.start}</div>
                    </div>
                    <div className="text-xs opacity-70">{it.status}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <button onClick={() => addSchedule(students[0]?.id ?? 'st1', new Date().toISOString().slice(0,10), '19:00')} className="px-3 py-1 rounded-md bg-indigo-600/80">Tạo lịch demo</button>
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-sm opacity-80">Tổng quan</div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="p-3 bg-white/6 rounded-md text-center">
                  <div className="text-xs opacity-80">Học viên</div>
                  <div className="text-xl font-bold">{students.length}</div>
                </div>
                <div className="p-3 bg-white/6 rounded-md text-center">
                  <div className="text-xs opacity-80">Lịch</div>
                  <div className="text-xl font-bold">{schedule.length}</div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5">
              <div className="text-sm opacity-80">Biểu đồ doanh thu</div>
              <div style={{ height: 150 }} className="mt-3">
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="revenue" stroke="#60a5fa" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </aside>
        </section>

        <section className="p-4 rounded-2xl bg-white/5">
          <h3 className="font-semibold mb-4">Bảng lịch dạy (quản lý)</h3>
          <div className="overflow-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-slate-300">
                  <th className="p-3">Học viên</th>
                  <th className="p-3">Ngày</th>
                  <th className="p-3">Bắt đầu</th>
                  <th className="p-3">Thời lượng</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map(it => (
                  <tr key={it.id} className="border-t border-white/6">
                    <td className="p-3">{students.find(s=>s.id===it.studentId)?.name ?? 'Khách'}</td>
                    <td className="p-3">{it.date}</td>
                    <td className="p-3">{it.start}</td>
                    <td className="p-3">{it.durationMinutes} phút</td>
                    <td className="p-3">{it.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-6 text-center text-slate-400">© Dashboard • Trang cá nhân gia sư</footer>
      </div>
    </main>
  );
}
