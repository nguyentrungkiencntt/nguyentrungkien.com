"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";
import { Reward, RewardType } from "@/utils/define";
import { getWeightedRandomReward } from "@/utils/reward";
import CountUp from "react-countup";



const REWARDS: Reward[] = [
    { id: "r1", label: "10.000 Xu", weight: 5, type: "coin", amount: 10000, color: "#06b6d4", image: "/images/coin.png", description: "Thêm 10.000 xu vào tài khoản của bạn." },
    { id: "r2", label: "500 Xu", weight: 40, type: "coin", amount: 500, color: "#7c3aed", image: "/images/coin.png", description: "Wow! 500 xu tặng bạn." },
    { id: "r3", label: "Không quà", weight: 5, type: "vip", color: "#f59e0b", image: "/images/vippa.png", description: "Chúc bạn may mắn lần sau." },
    { id: "r4", label: "50 Xu", weight: 5, type: "coin",amount: 50, color: "#ef4444", image: "/images/coin.png", description: "Thêm 50 xu vào tài khoản." },
    { id: "r5", label: "Mã code", weight: 20, type: "code", color: "#ec4899", image: "/images/code.webp", description: "Mã nhận thưởng." },
    { id: "r6", label: "200 Xu", weight: 25, type: "coin", amount: 200, color: "#0ea5a4", image: "/images/coin.png", description: "Chúc mừng! 200 xu đã về." },
];

const STORAGE_KEY = "myverse_user_v1";

type UserState = {
    name: string;
    balance: number;
    inventory: { [key: string]: number }; // itemId -> qty
    badges: string[];
};

const DEFAULT_USER: UserState = {
    name: "Nguyễn Trung Kiên",
    balance: 0,
    inventory: {},
    badges: [],
};

export default function MyVerseLuckySpin() {
    const [user, setUser] = useState<UserState>(DEFAULT_USER);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [selected, setSelected] = useState<Reward | null>(null);
    const [spinsLeft, setSpinsLeft] = useState<number>(() => 5);
    const wheelRef = useRef<HTMLDivElement | null>(null);

    // load user from localStorage
    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(JSON.parse(raw));
            } else {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER));
            }
        } catch {
            // ignore
        }
    }, []);

    useEffect(() => {
        // persist user on change
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch {
            // ignore
        }
    }, [user]);

    // helper to launch fireworks / confetti
    const bigConfetti = (type: RewardType) => {
        const confettiCount = type === "item" || type === "vip" ? 400 : 160;
        confetti({
            particleCount: confettiCount,
            spread: 100,
            origin: { y: 0.3 },
            scalar: type === "item" || type === "vip" ? 1.5 : 1,
        });
    };

    // apply reward to user (client-side simulation)
    const applyReward = (r: Reward) => {
        if (r.type === "coin" && r.amount) {
            setUser((prev) => ({ ...prev, balance: prev.balance + (r?.amount ? r.amount : 0) }));
        } else if (r.type === "item") {
            setUser((prev) => ({
                ...prev,
                inventory: { ...prev.inventory, [r.id]: (prev.inventory[r.id] || 0) + 1 },
            }));
        } else if (r.type === "vip") {
            setUser((prev) => ({ ...prev, badges: Array.from(new Set([...prev.badges, r.label])) }));
        } else if (r.type === "code") {
            setUser((prev) => ({
                ...prev,
                inventory: { ...prev.inventory, [r.id]: (prev.inventory[r.id] || 0) + 1 },
            }));
        }
    };


    // spin logic
    const spin = () => {
        if (isSpinning) return;
        if (spinsLeft <= 0) {
            alert("Bạn đã hết lượt quay. Hãy quay lại ngày mai để nhận lượt thêm!");
            return;
        }

        setIsSpinning(true);
        setSelected(null);

        const count = REWARDS.length;
        const chosenIndex = getWeightedRandomReward(REWARDS); 
        const segment = 360 / count;

        const baseRounds = 6;
        const randomOffset = Math.random() * (segment - 6) - (segment / 2 - 3);
        const target =
            baseRounds * 360 +
            (360 - (chosenIndex * segment + segment / 2)) +
            randomOffset;

        setRotation((prev) => prev + target);

        setTimeout(() => {
            const reward = REWARDS[chosenIndex];
            setSelected(reward);
            applyReward(reward);
            bigConfetti(reward.type);
            setIsSpinning(false);
            setSpinsLeft((s) => Math.max(0, s - 1));
        }, 4700);
    };

    return (
        <div className="min-h-screen overflow-hidden bg-linear-to-b from-[#0f172a] via-[#22163b] to-[#4c1d95] text-white flex flex-col items-center p-6">
            {/* Decorative galaxy blobs */}
            {/* <motion.div
                className="absolute w-[700px] h-[700px] bg-linear-to-tr from-[#7c3aed] to-[#06b6d4] opacity-20 blur-3xl rounded-full -left-56 -top-48 -z-10"
                animate={{ x: [0, 30, -20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
            /> */}
            {/* <motion.div
                className="absolute w-[520px] h-[520px] bg-linear-to-tr from-[#ec4899] to-[#f59e0b] opacity-12 blur-3xl -right-20 top-52 -z-10 rounded-full"
                animate={{ y: [0, -30, 20, 0] }}
                transition={{ duration: 14, repeat: Infinity }}
            /> */}

            <header className="w-full max-w-5xl flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-linear-to-tr from-[#a78bfa] to-[#06b6d4] flex items-center justify-center text-2xl font-extrabold shadow-xl">
                        MV
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">MyVerse — Lucky Spin</h1>
                        <p className="text-sm text-white/70">Vòng quay may mắn — Ưu đãi & Quà tặng cực giá trị</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-xs text-white/70">User</div>
                        <div className="font-medium">{user.name}</div>
                    </div>

                    <div className="px-4 py-2 rounded-lg bg-white/6 border border-white/10">
                        <div className="text-xs text-white/80">Xu</div>
                        <div className="font-bold text-lg flex items-center gap-2">
                            <span>💠</span>
                            <span><CountUp end={user.balance} duration={5} /></span>
                        </div>
                    </div>

                </div>
            </header>

            <main className="w-full max-w-6xl flex flex-col md:flex-row gap-8 items-center justify-center">
                {/* Wheel area */}
                <section className="flex-1 flex mt-4 flex-col items-center gap-6">
                    <div className="relative">
                        <motion.div
                            ref={wheelRef}
                            animate={{ rotate: rotation }}
                            transition={{ duration: 4.7, ease: "easeOut" }}
                            className="relative w-[380px] h-[380px] drop-shadow-[0_0_40px_rgba(124,58,237,0.5)]"
                        >
                            <Image
                                src="/images/wheel.webp"
                                alt="Lucky Wheel"
                                fill
                                className="object-contain select-none"
                                priority
                            />

                            {/* Center glow */}
                            <motion.div
                                className="absolute left-1/2 top-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-tr from-[#06b6d4] to-[#7c3aed] blur-lg opacity-70"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </motion.div>

                        {/* arrow */}
                        <div className="absolute left-1/2 -translate-x-1/2 -top-7">
                            <div className="w-0 h-0 border-l-18 border-r-18 border-b-36 border-l-transparent border-r-transparent border-b-[#fde68a] shadow-lg" />
                        </div>
                    </div>

                    {/* Spin button + info */}
                    <div className="flex flex-col items-center gap-3 mt-4">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(124,58,237,0.35)" }}
                            whileTap={{ scale: 0.96 }}
                            onClick={spin}
                            disabled={isSpinning || spinsLeft <= 0}
                            className={`px-8 py-3 rounded-2xl font-bold text-lg ${isSpinning || spinsLeft <= 0
                                ? "bg-white/10 cursor-not-allowed"
                                : "bg-linear-to-r from-[#06b6d4] to-[#7c3aed] hover:brightness-110"
                                } shadow-xl`}
                        >
                            {isSpinning ? "Đang quay..." : "QUAY NGAY"}
                        </motion.button>

                        <div className="text-sm text-white/70">
                            Lượt còn lại: <span className="font-semibold">{spinsLeft}</span>
                        </div>
                    </div>
                </section>

                {/* Right panel: info & history */}
                <aside className="w-full md:w-[420px] bg-white/5 border border-white/8 rounded-2xl p-5 flex flex-col gap-4">
                    <div>
                        <h3 className="text-lg font-bold">Phần thưởng có thể trúng</h3>
                        <p className="text-xs text-white/70 mt-1">Xu và Mã nhận thưởng — may mắn sẽ gọi tên bạn ✨</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {REWARDS.map((r) => (
                            <div key={r.id} className="p-3 rounded-lg bg-white/4 flex items-center gap-3">
                                <div className="p-2 rounded-lg flex items-center justify-center" style={{ background: `${r.color}aa` }}>
                                    {r.image ? (
                                        <div className="relative w-8 h-8">
                                            <Image src={r.image} alt={r.label} fill style={{ objectFit: "contain" }} />
                                        </div>
                                    ) : (
                                        <span>🎁</span>
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold">{r.label}</div>
                                    <div className="text-xs text-white/70">{r.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>



                    <div className="mt-auto text-xs text-white/60">
                        MyVerse • Lucky Spin • Ứng dụng nhận thưởng hấp dẫn
                    </div>
                </aside>
            </main>

            {/* Result modal */}
            <AnimatePresence>
                {selected && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.85 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 bg-black"
                            onClick={() => setSelected(null)}
                        />

                        <motion.div
                            initial={{ scale: 0.9, y: 30, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 30, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-lg bg-linear-to-tr from-[#141026] to-[#3b0764] border border-white/10 rounded-3xl p-6 shadow-2xl"
                        >
                            <div className="flex gap-4 items-center">
                                <div className="w-24 h-24 rounded-xl bg-white/6 flex items-center justify-center">
                                    {selected.image ? (
                                        <div className="relative w-20 h-20">
                                            <Image src={selected.image} alt={selected.label} fill style={{ objectFit: "contain" }} />
                                        </div>
                                    ) : (
                                        <div className="text-3xl">🎉</div>
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold">{selected.label}</h2>
                                    <p className="text-sm text-white/80 mt-1">{selected.description}</p>

                                    {selected.type === "coin" && <div className="mt-3 text-white/90 font-semibold">{selected.amount} xu đã được cộng trực tiếp vào tài khoản của bạn.</div>}
                                    {selected.type === "item" && <div className="mt-3 text-white/90 font-semibold">Bạn trúng {selected.label}! Xu đã được cộng trực tiếp vào tài khoản của bạn.</div>}
                                    {selected.type === "vip" && <div className="mt-3 text-white/90 font-semibold">Chúc bạn may mắn lần sau.</div>}
                                    {selected.type === "code" && <div className="mt-3 text-white/90 font-semibold">Mã nhận thưởng đã được gửi về thư của bạn.</div>}
                                </div>
                            </div>

                            <div className="mt-5 flex gap-3 justify-end">
                                <button onClick={() => setSelected(null)} className="px-4 py-2 rounded-lg bg-white/6 hover:bg-white/8">
                                    Đóng
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
