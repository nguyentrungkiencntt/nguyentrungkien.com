"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Feature from "@/components/Feature";
import { LoadingHeaderHome } from "@/utils/loading";

type FormData = {
    name: string;
    email: string;
    content: string;
};

export default function EventLandingPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormData>({
        defaultValues: { name: "", email: "",content:"" },
    });

    const [success, setSuccess] = useState<null | { name: string; email: string,content:string }>(null);

    async function onSubmit(data: FormData) {
        try {

            await new Promise((r) => setTimeout(r, 900));

            setSuccess(data);
            reset();
        } catch (err) {
            console.error(err);
            alert("Đăng ký thất bại. Vui lòng thử lại");
        }
    }

    return (
        <div className="">
            <div className="bg-black text-white">
                <LoadingHeaderHome />
            </div>
            <div className="bg-linear-to-b min-h-screen from-[#050816] via-[#0b1022] to-[#06132a] text-white flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl"
                >
                    <div className="flex flex-col md:h-[430px] justify-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-linear-to-br from-pink-500 via-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="white" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-white/80">Trang liên hệ của hệ thống</p>
                                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Cùng nhau Kết nối & Trải nghiệm</h1>
                            </div>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/90 leading-relaxed text-justify"
                        >
                            Với tôi, mỗi dự án không chỉ là một sản phẩm được hoàn thành, mà là một hành trình. Hành trình đó có sự trao đổi, lắng nghe, thử nghiệm và cải thiện liên tục. Tôi thích làm việc cùng những người có tư duy tích cực, yêu sự rõ ràng và cùng hướng tới mục tiêu chung — vì chỉ khi đồng hành, chúng ta mới tạo ra được thứ thật sự đáng nhớ.
                        </motion.p>

                        <div className="grid grid-cols-2 gap-3 mt-2">
                            <Feature title="Information Technology Forum" desc="Diễn đàn công nghệ thông tin" />
                            <Feature title="Weather & News" desc="Xem tin tức & dự báo thời tiết" />
                            <Feature title="Education & Skills" desc="Đăng ký gia sư & học hỏi kỹ năng" />
                            <Feature title="Lucky Spin & GiftCode" desc="Hàng trăm phần quà may mắn" />
                        </div>

                    </div>

                    <div id="register" className="relative flex flex-col justify-center">
                        <motion.div
                            initial={{ scale: 0.98 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="bg-linear-to-br from-white/5 to-white/3 p-6 rounded-xl border border-white/5 shadow-xl"
                        >
                            <h2 className="text-xl font-bold">Gửi thông tin liên hệ</h2>
                            <p className="text-sm text-white/70 mt-1">Nhập tên, email và nội dung để gửi thông tin.</p>

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                                <div>
                                    <label className="text-xs text-white/70">Họ và tên</label>
                                    <input
                                        {...register("name", { required: "Vui lòng nhập tên" })}
                                        placeholder="Nhập họ và tên ..."
                                        className={`mt-1 w-full rounded-lg px-4 py-3 bg-black/20 placeholder-white/40 border ${errors.name ? "border-red-400" : "border-white/6"
                                            } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    />
                                    {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="text-xs text-white/70">Email</label>
                                    <input
                                        {...register("email", {
                                            required: "Vui lòng nhập email",
                                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Email không hợp lệ" },
                                        })}
                                        placeholder="Vui lòng nhập email của bạn ..."
                                        className={`mt-1 w-full rounded-lg px-4 py-3 bg-black/20 placeholder-white/40 border ${errors.email ? "border-red-400" : "border-white/6"
                                            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                                    />
                                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label className="text-xs text-white/70">Nội dung liên hệ</label>
                                    <textarea
                                        {...register("content", {
                                            required: "Vui lòng nhập nội dung liên hệ",
                                        })}
                                        placeholder="Vui lòng nhập nội dung liên hệ của bạn ..."
                                        className={`mt-1 w-full min-h-[100px] resize-none rounded-lg px-4 py-3 bg-black/20 placeholder-white/40 border ${errors.content ? "border-red-400" : "border-white/6"
                                            } focus:outline-none focus:ring-2 focus:ring-pink-500`}
                                    ></textarea>
                                    {errors.content && <p className="text-xs text-red-400 mt-1">{errors.content.message}</p>}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 cursor-pointer rounded-lg px-5 py-3 bg-linear-to-r from-pink-500 to-indigo-500 hover:scale-[1.01] active:scale-95 transition-transform font-semibold shadow-md"
                                    >
                                        {isSubmitting ? "Đang gửi..." : "Gửi thông tin"}
                                    </button>
                                </div>

                                <div id="sparkle" className="pointer-events-none absolute right-8 top-6 w-8 h-8 rounded-full bg-linear-to-tr from-yellow-300 to-pink-400 blur-sm opacity-60" />
                            </form>

                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="mt-4 bg-linear-to-r from-emerald-800/30 to-emerald-700/20 border border-emerald-500/20 p-4 rounded-lg flex items-center gap-3"
                                >
                                    <div className="p-2 bg-emerald-600/20 rounded-md">
                                        <CheckCircle size={28} />
                                    </div>
                                    <div>
                                        <div className="font-semibold">Gửi đi thành công</div>
                                        <div className="text-sm text-white/70">Cám ơn {success.name}. Chúng tôi đã gửi thông tin của bạn tới nguyenkiencnttltv@gmail.com.</div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
