'use client';
import Avatar from "@/components/Avatar";
import { Post } from "@/components/PostCard";
import { formatDateUTC } from "@/utils/function";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Lightbox({ post, onClose }: { post: Post | null; onClose: () => void }) {
    if (!post) return null;
    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed max-h-screen inset-0 bg-black/70 z-50 flex items-center justify-center p-6">
                <motion.div initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: 20 }} className="w-full max-w-4xl h-[450px] my-4 bg-[#041228] rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="bg-black">
                            <div className="p-4">
                                <div className="mb-3">
                                    <Image src={"/images/wheel.jpg"} alt="logo"
                                        width={1000}
                                        height={1000}
                                        className="w-full h-full object-cover rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div className="py-5 px-4 flex flex-col">
                            <div className="flex items-center gap-3">
                                <Avatar url={post.author.avatarUrl} size={48} alt={post.author.name} />
                                <div>
                                    <div className="font-semibold">Nguyễn Trung Kiên</div>
                                    <div className="text-xs opacity-70">Hanoi • {formatDateUTC(post?.createdAt)}</div>
                                </div>
                                <div className="ml-auto">
                                    <button onClick={onClose} className="px-3 py-1 rounded-md bg-white/6">Đóng</button>
                                </div>
                            </div>

                            <div className="mt-4 flex-1 overflow-auto">
                                <div className="text-slate-200">{post.caption}</div>

                                <div className="mt-4">
                                    <div className="text-sm opacity-70 mb-2">Bình luận (15)</div>
                                    <div className="space-y-3">
                                        {post.comments.map(c => (
                                            <div key={c.id} className="p-2 bg-white/4 rounded-md">
                                                <div className="flex items-center gap-3">
                                                    <Avatar url={c.author.avatarUrl} size={36} alt={c.author.name} />
                                                    <div>
                                                        <div className="font-medium">Nguyễn Quang Huy</div>
                                                        <div className="text-xs opacity-70">{formatDateUTC(c?.createdAt)}</div>
                                                    </div>
                                                </div>
                                                <div className="mt-2 text-slate-200">{c.text}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <div className="flex gap-2">
                                    <input placeholder="Viết bình luận..." className="flex-1 px-3 py-2 rounded-md bg-transparent border border-white/10" />
                                    <button className="px-3 py-2 rounded-md bg-linear-to-r from-indigo-500 to-cyan-400">Gửi</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}