'use client';

import { ParishInfo } from "@/utils/define";

export default function HeaderCatholic({ parish }: { parish: ParishInfo }) {
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