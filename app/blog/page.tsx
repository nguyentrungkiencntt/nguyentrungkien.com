"use client";
import { useEffect, useMemo, useState } from "react";
import HeaderBlog from "@/partials/HeaderBlog";
import Image from "next/image";
import PostCard, { ID, Post } from "@/components/PostCard";
import Lightbox from "@/components/LightBox";

type User = {
    id: ID;
    name: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
};

const ME: User = {
    id: "u_me",
    name: "Nguyễn Trung Kiên",
    username: "kientrung",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    bio: "Gia sư Toán • Lover of coffee & clean code",
};

function nowISO(): string { return new Date().toISOString(); }

const SAMPLE_POSTS: Post[] = [
    {
        id: "p1",
        author: ME,
        media: [{ id: 'm1', type: 'image', src: '/images/wheel.jpg', alt: 'Math notes' }],
        caption: 'Buổi ôn tập tích phân hôm nay: mẹo làm nhanh bằng đổi biến 🔥',
        tags: ['#toan', '#tuyensinh'],
        createdAt: nowISO(),
        likes: 128,
        comments: [{ id: 'c1', author: { ...ME, id: 'u2', name: 'Lan', username: 'lan' }, text: 'Cảm ơn thầy!', createdAt: nowISO() }],
        location: 'Hanoi',
    }
];

const STORAGE_KEY = 'instablog_posts_v1';

function savePosts(posts: Post[]) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(posts)); } catch { } }
function loadPosts(): Post[] { try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? JSON.parse(raw) as Post[] : SAMPLE_POSTS; } catch { return SAMPLE_POSTS; } }



/* Feed */
export default function InstaBlogPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [posts, setPosts] = useState<Post[]>(() => loadPosts());
    const [openPostId, setOpenPostId] = useState<ID | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => savePosts(posts), [posts]);

    function handleOpen(id: ID) { setOpenPostId(id); }
    function handleClose() { setOpenPostId(null); }


    const openPost = useMemo(() => posts.find(p => p.id === openPostId) ?? null, [posts, openPostId]);

    return (
        <main className="min-h-screen bg-linear-to-b from-[#031021] to-[#04142a] text-white p-6">
            <div className="max-w-6xl mx-auto">
                <HeaderBlog />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 gap-3">
                            {posts.map(p => (
                                <PostCard key={p.id} post={p} onOpen={handleOpen} />
                            ))}
                        </div>
                    </div>

                    {isLoggedIn && <aside className="space-y-6">
                        <div className="p-4 rounded-2xl bg-white/4">
                            <div className="font-semibold">Stories</div>
                            <div className="mt-3 flex gap-3 overflow-auto">
                                {[ME, { ...ME, id: 'u2', name: 'Lan', avatarUrl: 'https://i.pravatar.cc/150?img=32' }, { ...ME, id: 'u3', name: 'Minh', avatarUrl: 'https://i.pravatar.cc/150?img=3' }].map(u => (
                                    <div key={u.id} className="flex flex-col items-center gap-2">
                                        <div className="w-16 h-16 rounded-full p-1 bg-linear-to-tr from-pink-500 to-yellow-400">
                                            <Image
                                                src={u.avatarUrl ? u.avatarUrl : ""}
                                                alt={u.name}
                                                className="w-full h-full rounded-full object-cover border-2 border-black"
                                                height={64}
                                                width={64}
                                            />
                                        </div>
                                        <div className="text-xs">{u.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/4">
                            <div className="font-semibold">About me</div>
                            <div className="mt-3 text-sm opacity-80">Gia sư Toán • Chia sẻ mẹo giải nhanh, bộ đề luyện thi, và livestream giải đề.</div>
                            <div className="mt-3">
                                <a href="#" className="px-3 py-2 rounded-md bg-linear-to-r from-cyan-400 to-indigo-500 text-black">Liên hệ</a>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/4">
                            <div className="font-semibold">Tags</div>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {['#toan', '#luyenthi', '#dethi', '#gia sư'].map(t => <span key={t} className="px-2 py-1 bg-white/6 rounded-md text-xs">{t}</span>)}
                            </div>
                        </div>
                    </aside>}

                    {!isLoggedIn &&
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <div className="text-[14px]">Gợi ý cho bạn</div>
                                <div className="text-[14px]">Xem tất cả</div>
                            </div>
                            <ul className="flex flex-col gap-1">
                                <li className="flex gap-2 items-center w-full">
                                    <div className="w-[50px] flex items-center h-[50px] rounded-full">
                                        <Image
                                            src={"https://res.cloudinary.com/dp6cr7ea5/image/upload/v1766743948/center/jqeop8pkafokekexgkxg.jpg"}
                                            alt="logo"
                                            height={50}
                                            width={50}
                                            className="w-[50px] object-cover object-center rounded-full"
                                        />
                                    </div>
                                    <div className="flex py-2 justify-between w-full">
                                        <div className="flex flex-col">
                                            <div className="font-semibold">
                                                Nguyễn Trung Kiên
                                            </div>
                                            <div className="font-extralight text-[12px] text-gray-300">
                                                Gợi ý cho bạn
                                            </div>
                                        </div>
                                        <div className="text-blue-300 hover:underline text-[14px] cursor-pointer">
                                            Theo dõi
                                        </div>
                                    </div>
                                </li>
                                
                            </ul>
                        </div>
                    }
                </div>

                <footer className="mt-8 text-center opacity-70">© Copyright to 2025 - {new Date().getFullYear()} by  {ME.name} • Bản quyền thuộc về Nguyễn Trung Kiên</footer>
            </div>

            <Lightbox post={openPost} onClose={handleClose} />
        </main>
    );
}
