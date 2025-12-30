'use client';
import { LoadingFooterHome, LoadingHeaderHome, LoadingSlidebarHome } from "@/utils/loading";

export default function PortfolioPage() {
  return (
    <main className="bg-[#0a0a0a] overflow-hidden text-white">
      <div className="fixed z-40 top-0 bg-gray-950 right-0 left-0">
        <LoadingHeaderHome />
      </div>
      <div className="">
        <LoadingSlidebarHome />
      </div>
      <LoadingFooterHome />
    </main>
  );
}
