"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";

type Reward = {
  type: "coin" | "item" | "badge";
  amount?: number;
  title: string;
  description?: string;
  image?: string;
};

export default function RedeemPage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  async function submitCode(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!code.trim()) {
      setError("Nhập mã code đã nhé!");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || "Có lỗi xảy ra");
      setReward(json.reward as Reward);
      setShowModal(true);

      launchConfetti(json.reward);

      setCode("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  function launchConfetti(r: Reward) {
    const particleCount = r.type === "item" ? 350 : 120;
    confetti({
      particleCount,
      spread: 80,
      origin: { y: 0.3 },
      scalar: r.type === "item" ? 1.8 : 1.2,
    });
  }

  return (
    <div className="flex w-full min-h-screen overflow-hidden items-center justify-center bg-linear-to-br from-[#0f172a] via-[#183a68] to-[#6b21a8]  p-6">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-3xl p-8 rounded-3xl backdrop-blur-md bg-white/6 border border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-white drop-shadow-md">
              Nhập mã code nhận thưởng lớn ✨
            </h2>
            <p className="text-sm text-white/80 mt-1">
              Nhập mã code để nhận phần thưởng giá trị — Xu, hộp quà VIP hoặc quà lớn!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-white/70">User</div>
              <div className="text-sm font-medium text-white">Nguyễn Kiên</div>
            </div>
            <div className="w-12 h-12 rounded-full bg-linear-to-tr from-pink-500 to-orange-400 flex items-center justify-center text-white font-bold shadow-xl">
              MK
            </div>
          </div>
        </div>

        <form onSubmit={submitCode} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <label className="sr-only">Mã code</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/10 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/30 transition"
              placeholder="Nhập mã code tại đây ..."
            />
            {error && <p className="text-sm text-rose-400 mt-2">{error}</p>}
          </div>

          <div className="flex gap-3 justify-end">

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="px-6 py-3 cursor-pointer rounded-xl bg-linear-to-r from-[#06b6d4] to-[#7c3aed] text-white font-semibold shadow-lg hover:brightness-105 disabled:opacity-60 transition"
            >
              {loading ? "Đang kiểm tra..." : "Nhận quà"}
            </motion.button>
          </div>
        </form>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/4 border border-white/6">
            <div className="text-sm text-white/80">Phần thưởng</div>
            <div className="mt-2 text-lg font-bold text-white">Xu & Vật phẩm</div>
            <div className="text-xs text-white/60 mt-1">Mã hợp lệ sẽ được cộng trực tiếp</div>
          </div>

          <div className="p-4 rounded-xl bg-white/4 border border-white/6">
            <div className="text-sm text-white/80">Quà đặc biệt</div>
            <div className="mt-2 text-lg font-bold text-white">1.000.000 Xu</div>
            <div className="text-xs text-white/60 mt-1">Các mã VIP mới có tỉ lệ giới hạn</div>
          </div>

          <div className="p-4 rounded-xl bg-white/4 border border-white/6">
            <div className="text-sm text-white/80">Bảo mật</div>
            <div className="mt-2 text-lg font-bold text-white">Một lần / Mã</div>
            <div className="text-xs text-white/60 mt-1">Mã dùng xong sẽ khóa</div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && reward && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 rounded-2xl bg-linear-to-tr from-white/10 to-white/6 border border-white/10 shadow-2xl"
            >
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-xl flex items-center justify-center bg-white/8 border border-white/8">
                  {reward.image ? (
                    <div className="relative w-20 h-20">
                      <Image src={reward.image} alt={reward.title} fill style={{ objectFit: "contain" }} />
                    </div>
                  ) : (
                    <div className="text-white text-xl font-bold">{reward.type === "coin" ? "💰" : "🎁"}</div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white">{reward.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{reward.description}</p>

                  {reward.type === "coin" && (
                    <div className="mt-4 inline-flex items-center gap-3 bg-white/5 px-3 py-2 rounded-lg">
                      <div className="text-white/90 font-bold">{reward.amount} xu</div>
                      <div className="text-xs text-white/70">Đã cộng vào tài khoản của bạn</div>
                    </div>
                  )}

                  {reward.type === "item" && (
                    <div className="mt-4">
                      <div className="text-sm text-white/80">Quà vật lý / voucher</div>
                      <div className="mt-2 inline-block px-4 py-2 rounded-lg bg-linear-to-r from-rose-400 to-pink-500 text-white font-semibold">
                        NHẬN NGAY
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setReward(null);
                    }}
                    className="text-white/90 cursor-pointer bg-white/5 px-3 py-2 rounded-lg border border-white/8 hover:bg-white/10 transition"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
