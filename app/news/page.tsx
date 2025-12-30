"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import UnderConstructionPage from "@/components/Key";

type Source = {
  id: string | null;
  name: string;
};

type Article = {
  source: Source;
  author?: string | null;
  title: string;
  description?: string | null;
  url: string;
  urlToImage?: string | null;
  publishedAt: string; // ISO
  content?: string | null;
};

type NewsResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};

/* ========================= CONFIG ========================= */

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY ?? "e65502b0e8f7482e9eae0c5408a23818";
const PAGE_SIZE = 8;

const CATEGORIES = ["general", "business", "entertainment", "health", "science", "sports", "technology"] as const;

type Category = typeof CATEGORIES[number];

/* ========================= HELPERS ========================= */

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString();
}

function estimateReadTime(text?: string) {
  if (!text) return "1 min";
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

/* ========================= MAIN COMPONENT ========================= */

export default function NewsStudioPage() {
  const [query, setQuery] = useState<string>("");
  const [category, setCategory] = useState<Category | "all">("all");
  const [domesticOnly, setDomesticOnly] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [articles, setArticles] = useState<Article[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Article | null>(null);

  useEffect(() => {
    // Reset when filters change
    setArticles([]);
    setPage(1);
    fetchArticles(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, domesticOnly]);

  async function fetchArticles(pageToLoad = 1, replace = false) {
    if (!API_KEY || API_KEY === "e65502b0e8f7482e9eae0c5408a23818") {
      console.warn("Missing API key for news provider.");
      return;
    }
    setLoading(true);
    try {
      // NewsAPI example: everything endpoint (q, page, pageSize, language)
      const q = encodeURIComponent(query || (domesticOnly ? "Vietnam" : ""));
      const catParam = category !== "all" ? `&category=${category}` : "";
      const countryParam = domesticOnly ? "&country=vn" : ""; // note: /top-headlines supports country
      const url = `https://newsapi.org/v2/top-headlines?${q ? `q=${q}&` : ""}pageSize=${PAGE_SIZE}&page=${pageToLoad}${catParam}${countryParam}&apiKey=${API_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`News API error ${res.status}`);
      const data: NewsResponse = await res.json();
      if (replace) setArticles(data.articles);
      else setArticles(prev => [...prev, ...data.articles]);
      setTotal(data.totalResults);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    const next = page + 1;
    setPage(next);
    fetchArticles(next);
  }

  const featured = articles.slice(0, 3);
  const feed = articles.slice(3);

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      {open ? <main className="min-h-screen bg-linear-to-br from-[#01040b] via-[#042238] to-[#062a44] text-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">NewsStudio</h1>
              <p className="text-sm opacity-80">Tin tức trong nước & quốc tế — giao diện hiện đại, trực quan</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm tin..." className="px-3 py-2 rounded-md bg-white/6 placeholder:text-slate-300 outline-none" />
                <button onClick={() => { setArticles([]); setPage(1); fetchArticles(1, true); }} className="absolute right-1 top-1 px-3 py-1 rounded-md bg-cyan-500">Tìm</button>
              </div>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm opacity-80"><input type="checkbox" checked={domesticOnly} onChange={e => setDomesticOnly(e.target.checked)} /> Trong nước</label>
              </div>
            </div>
          </header>

          {/* Hero featured */}
          <section className="mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featured.length > 0 ? (
                featured.map((a, idx) => (
                  <motion.article key={a.url} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`rounded-2xl overflow-hidden ${idx === 0 ? 'lg:col-span-2' : ''} bg-gradient-to-br from-[#041827] to-[#072b3f]`}>
                    <div className="relative h-64">
                      {a.urlToImage ? <img src={a.urlToImage} alt={a.title} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-black/30" />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-xs opacity-80">{a.source.name} • {formatDate(a.publishedAt)}</div>
                        <h2 className="text-2xl font-bold">{a.title}</h2>
                        <p className="mt-2 opacity-90 max-w-xl">{a.description}</p>
                        <div className="mt-3 flex gap-2">
                          <button onClick={() => setSelected(a)} className="px-3 py-2 rounded-md bg-cyan-500">Đọc thêm</button>
                          <a href={a.url} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-md bg-white/6">Gốc</a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-3 p-8 rounded-2xl bg-white/5">Chưa có bài nổi bật. Hãy tìm hoặc tải lại.</div>
              )}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {feed.map(a => (
                  <article key={a.url} className="p-4 rounded-2xl bg-white/5 hover:scale-[1.01] transition-transform">
                    <div className="flex gap-4">
                      <div className="w-36 h-24 bg-black/20 rounded-md overflow-hidden">
                        {a.urlToImage && <img src={a.urlToImage} alt={a.title} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-xs opacity-70">{a.source.name} • {formatDate(a.publishedAt)} • {estimateReadTime(a.content ?? a.description ?? undefined)}</div>
                        <h3 className="font-semibold mt-2">{a.title}</h3>
                        <p className="mt-2 text-sm opacity-80">{a.description}</p>
                        <div className="mt-3 flex gap-2 items-center">
                          <button onClick={() => setSelected(a)} className="px-3 py-1 rounded-md bg-cyan-500 text-black">Đọc</button>
                          <a href={a.url} target="_blank" rel="noreferrer" className="text-sm opacity-70">Nguồn gốc</a>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="text-center mt-4">
                {loading ? <div className="text-sm opacity-70">Đang tải...</div> : <button onClick={loadMore} className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-indigo-500 text-black">Tải thêm</button>}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5">
                <h4 className="font-semibold">Phân loại</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button onClick={() => setCategory('all')} className={`px-3 py-1 rounded-md ${category === 'all' ? 'bg-cyan-500 text-black' : 'bg-white/6'}`}>Tất cả</button>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-md ${category === c ? 'bg-cyan-500 text-black' : 'bg-white/6'}`}>{c}</button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5">
                <h4 className="font-semibold">Xu hướng</h4>
                <div className="mt-3 space-y-2">
                  {articles.slice(0, 5).map(a => (
                    <div key={a.url} className="flex items-start gap-3">
                      <div className="w-12 h-8 bg-black/20 rounded-md overflow-hidden">{a.urlToImage && <img src={a.urlToImage} className="w-full h-full object-cover" alt="thumb" />}</div>
                      <div>
                        <div className="text-sm font-medium">{a.title}</div>
                        <div className="text-xs opacity-70">{a.source.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5">
                <h4 className="font-semibold">Theo dõi</h4>
                <div className="mt-3 flex gap-2">
                  <a className="px-3 py-2 rounded-md bg-white/6">Facebook</a>
                  <a className="px-3 py-2 rounded-md bg-white/6">Twitter</a>
                </div>
              </div>
            </aside>
          </section>

          {/* Article modal */}
          {selected && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#021623] max-w-4xl w-full rounded-2xl p-6 overflow-auto max-h-[90vh]">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="text-xs opacity-70">{selected.source.name} • {formatDate(selected.publishedAt)}</div>
                    <h2 className="text-2xl font-bold my-2">{selected.title}</h2>
                    <p className="text-sm opacity-80">{selected.description}</p>
                    <div className="mt-4 text-slate-200" dangerouslySetInnerHTML={{ __html: selected.content ?? selected.description ?? '' }} />
                  </div>
                  <div>
                    <button onClick={() => setSelected(null)} className="px-3 py-1 rounded-md bg-white/6">Đóng</button>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href={selected.url} target="_blank" rel="noreferrer" className="underline">Đọc bản gốc</Link>
                </div>
              </motion.div>
            </div>
          )}

          <footer className="mt-12 text-center opacity-70">© {new Date().getFullYear()} NewsStudio • Demo</footer>
        </div>
      </main> : <UnderConstructionPage />}
    </div>
  );
}
