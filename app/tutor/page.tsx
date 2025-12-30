"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from 'framer-motion';
import Image from 'next/image';
import { LoadingFooterHome, LoadingHeaderHome } from '@/utils/loading';

type Review = { id: string; name: string; rating: number; text: string };

const REVIEWS: Review[] = [
    { id: 'r1', name: 'Hiền', rating: 5, text: 'Gia sư rất tận tâm, giúp con tiến bộ nhanh.' },
    { id: 'r2', name: 'Nhật', rating: 5, text: 'Giải bài nhanh, rõ ràng và có chiến lược ôn tập.' },
    { id: 'r3', name: 'Toàn', rating: 5, text: 'Phương pháp dạy tư duy rất hay.' },
];



export default function AboutTutorPage() {
    return (
        <div>
            <div className='fixed top-0 right-0 left-0 z-20 bg-linear-to-br from-[#020617] via-[#041530] to-[#06223a] text-white'>
                <LoadingHeaderHome />
            </div>
            <main className="min-h-screen bg-linear-to-br mt-28 from-[#020617] via-[#041530] to-[#06223a] text-slate-100 p-6">
                <div className="max-w-6xl mx-auto">

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                        <div className="lg:col-span-2 space-y-6">
                            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white/4 rounded-2xl p-6 shadow-lg">
                                <div className="flex gap-6 items-center">
                                    <Image height={200} width={200} src="https://i.pravatar.cc/160?img=12" alt="avatar" className="w-36 h-36 rounded-full object-cover border-4 border-white/10" />
                                    <div>
                                        <h2 className="text-2xl font-bold">Xin chào — Mình là Nguyễn Trung Kiên</h2>
                                        <p className="mt-2 text-slate-200">Mình chuyên giảng Toán THPT và luyện thi Đại học với 6 năm kinh nghiệm. Phương pháp tập trung tư duy, mẹo giải nhanh, và kỹ năng làm bài trắc nghiệm & tự luận.</p>

                                        <div className="mt-4 flex gap-3">
                                            <div className="p-3 rounded-lg bg-white/6">
                                                <div className="text-xs opacity-80">Kinh nghiệm</div>
                                                <div className="font-bold">6 năm</div>
                                            </div>
                                            <div className="p-3 rounded-lg bg-white/6">
                                                <div className="text-xs opacity-80">Học viên đạt</div>
                                                <div className="font-bold">80%</div>
                                            </div>
                                            <div className="p-3 rounded-lg bg-white/6">
                                                <div className="text-xs opacity-80">Học phí</div>
                                                <div className="font-bold">800k - 1.000k / tháng</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Phương pháp giảng dạy</h3>
                                        <ul className="mt-2 text-slate-200 list-disc ml-5 space-y-1">
                                            <li>Rèn tư duy, nắm phương pháp chứ không học vẹt</li>
                                            <li>Bộ đề luyện theo năng lực: cơ bản → nâng cao → thi</li>
                                            <li>Chấm bài có phản hồi chi tiết & mẹo làm nhanh</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold">Cam kết</h3>
                                        <ul className="mt-2 text-slate-200 list-disc ml-5 space-y-1">
                                            <li>Tiến bộ sau 4 tuần nếu học đều</li>
                                            <li>Buổi học bù/hoàn trả hợp lý</li>
                                            <li>Tài liệu & đề luyện định kỳ</li>
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="bg-white/4 rounded-2xl p-6">
                                <h3 className="text-xl font-semibold">Video giới thiệu / demo bài giảng</h3>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="aspect-video bg-black rounded-md overflow-hidden">

                                        <iframe className="w-full h-full" src="https://www.youtube.com/embed/YelkklEbJJI" title="intro video" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-semibold">Nội dung video</h4>
                                        <p className="mt-2 text-slate-200">Demo một buổi dạy mẫu: phân tích nhanh đề, kỹ thuật giải gọn, và mẹo làm trắc nghiệm hiệu quả.</p>
                                        <div className="mt-4">
                                            <Dialog>
                                                <form>
                                                    <DialogTrigger asChild>
                                                        <Button className="px-4 py-2 cursor-pointer rounded-md bg-linear-to-r from-cyan-400 to-indigo-500 text-black font-semibold hover:opacity-0.3">Liên hệ đặt lịch</Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px]">
                                                        <DialogHeader>
                                                            <DialogTitle>Thông tin liên hệ</DialogTitle>
                                                            <DialogDescription>
                                                                Mẫu form liên hệ xin vui lòng kiểm tra thông tin.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="grid gap-4">
                                                            <div className="grid gap-3">
                                                                <div className="flex gap-2">
                                                                    <Label htmlFor="name-1">Họ và tên</Label>
                                                                    <span className="text-[10px] text-red-400">(chỉ xem)</span>
                                                                </div>
                                                                <Input id="name-1" readOnly autoFocus={false} name="name" defaultValue="Nguyễn Trung Kiên" />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <div className="flex gap-2">
                                                                    <Label htmlFor="username-1">Số điện thoại</Label>
                                                                    <span className="text-[10px] text-red-400">(chỉ xem)</span>
                                                                </div>
                                                                <Input id="username-1" name="username" defaultValue="0336099317" />
                                                            </div>
                                                            <div className="grid gap-3">
                                                                <div className="flex gap-2">
                                                                    <Label htmlFor="email-1">Email</Label>
                                                                    <span className="text-[10px] text-red-400">(chỉ xem)</span>
                                                                </div>
                                                                <Input id="email-1" name="email" defaultValue="nguyenkiencnttltv@gmail.com" />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button variant="outline" className="px-4 py-2 cursor-pointer rounded-md bg-linear-to-r from-black to-white text-white hover:text-white font-semibold hover:opacity-0.3">Đã xong !</Button>
                                                            </DialogClose>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </form>
                                            </Dialog>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div className="bg-white/4 rounded-2xl p-6 mt-4">
                                <h3 className="text-xl font-semibold">Đánh giá học viên</h3>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {REVIEWS.map(r => (
                                        <div key={r.id} className="p-4 rounded-lg bg-white/6">
                                            <div className="font-semibold">{r.name}</div>
                                            <div className="text-sm opacity-80">{r.rating} ★</div>
                                            <div className="mt-2 text-slate-200">{r.text}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                        </div>

                        <aside className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/5">
                                <h4 className="font-semibold">Gói học</h4>
                                <div className="mt-3">
                                    <div className="p-4 rounded-lg bg-linear-to-r from-slate-800 to-slate-700">
                                        <div className="text-sm opacity-80">Gói tiêu chuẩn</div>
                                        <div className="text-2xl font-bold mt-1">800k / tháng</div>
                                        <div className="mt-2 text-sm text-slate-300">8 buổi / tháng • Hỗ trợ bài tập & tài liệu</div>
                                    </div>

                                    <div className="p-4 rounded-lg bg-linear-to-r from-slate-800 to-slate-700 mt-4">
                                        <div className="text-sm opacity-80">Gói ôn thi</div>
                                        <div className="text-2xl font-bold mt-1">1.000k / tháng</div>
                                        <div className="mt-2 text-sm text-slate-300">10 buổi / tháng • Kiểm tra năng lực & báo cáo</div>
                                    </div>
                                </div>

                                <div id="contact" className="mt-4">
                                    <h5 className="font-semibold">Liên hệ</h5>
                                    <p className="text-sm opacity-80 mt-1">Email: nguyenkiencnttltv@gmail.com</p>
                                    <p className="text-sm opacity-80 mt-1">SĐT: 0336.099.317</p>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/5">
                                <h4 className="font-semibold">Lợi ích khi học</h4>
                                <ul className="mt-2 text-slate-200 list-disc ml-5 space-y-1">
                                    <li>Phân loại lộ trình học cá nhân</li>
                                    <li>Hỗ trợ 24/7 qua zalo hoặc facebook</li>
                                    <li>Giải nhanh,chỉ phương pháp, luyện đề thi</li>
                                    <li>Chữa bài tập trực tiếp ở lớp hoặc qua zoom</li>
                                </ul>
                            </div>
                        </aside>
                    </section>

                </div>
            </main>
            <LoadingFooterHome />
        </div>
    );
}
