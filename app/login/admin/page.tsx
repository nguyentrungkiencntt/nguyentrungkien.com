'use client';
import { motion } from "framer-motion";
import { useState } from "react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-purple-700 via-pink-500 to-orange-400">
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full bg-white/10 blur-3xl"
                animate={{
                    x: [0, 100, -100, 0],
                    y: [0, -50, 50, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[400px] border border-white/20"
            >
                <h1 className="text-3xl font-bold text-center text-white mb-8 drop-shadow-lg">
                    Đăng nhập vào Admin
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div>
                        <label className="text-white text-sm mb-2 block">Mật khẩu</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-pink-400 transition-all"
                            placeholder="Nhập mật khẩu ..."
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #fff" }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading}
                        className="bg-linear-to-r cursor-pointer from-pink-500 to-orange-400 text-white font-semibold py-3 rounded-xl mt-4 shadow-lg hover:shadow-pink-400/50 transition-all disabled:opacity-70"
                    >
                        {isLoading ? "Đang đăng nhập ..." : "Đăng nhập"}
                    </motion.button>
                </form>

                <div className="text-center text-sm text-white/80 mt-6">
                    Quên mật khẩu ?{" "}
                    <a
                        href="/acepctcode"
                        className="underline text-white hover:text-pink-200 transition-all"
                    >
                        Nhập code
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
