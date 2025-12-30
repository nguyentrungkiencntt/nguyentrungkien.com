'use client';
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { icons } from "@/utils/icons";
import { Spin } from "antd";
import { redirect } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/lib/store";

const { IoReload } = icons;

export default function MyWindsorLoginPage() {

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { messageApi } = useUser();
  const [captchaInput, setCaptchaInput] = useState<string>("");
  const [captchaCode, setCaptchaCode] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>()


  useEffect(() => {
    generateCaptcha();
  }, []);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 0;
    } else return 1;
  }

  const validateUername = (username: string) => {
    if (username.length < 8) {
      return 0;
    } else return 1;
  }

  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);

    try {
      if (!validateUername(username)) {
        setError("Username không hợp lệ.")
        return;
      };
      if (!validatePassword(password)) {
        setError("Mật khẩu phải có ít nhất 8 ký tự.")
        return;
      };
      if (captchaInput.trim().toUpperCase() !== captchaCode) {
        setError("Mã captcha không đúng.");
        return;
      };
      setError(null)
      setIsLoading(true);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  }

  function generateCaptcha() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let str = "";
    for (let i = 0; i < 6; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(str);
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-indigo-100 flex items-center justify-center p-6">
      {isLoading && <div className="min-h-screen flex items-center justify-center w-full fixed top-0 right-0 bottom-0 left-0 bg-[#2523233f] z-50 ">
        <Spin size="large" />
      </div>}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-12"
      >
        <div className="col-span-12 lg:col-span-7 p-8 bg-[linear-gradient(135deg,#7c3aed_0%,#06b6d4_100%)] text-white relative">
          <div className="absolute inset-0 opacity-30 pointer-events-none" aria-hidden />
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h2 className="text-3xl md:text-4xl font-bold">myVerse Portal</h2>
            <p className="mt-3 max-w-md text-sm md:text-base text-justify font-semibold">Không gian kỹ thuật số cá nhân – nơi kết nối, sáng tạo và phát triển.
              Tại đây, bạn có thể khám phá các dự án, công cụ, và ý tưởng mang dấu ấn riêng trong hành trình công nghệ của bạn.</p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">📒</div>
                <div>
                  <div className="font-medium">Quản lý bài viết</div>
                  <div className="text-xs opacity-90">Tạo, chỉnh sửa và theo dõi nhà sáng tạo</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">🏆</div>
                <div>
                  <div className="font-medium">BXH nhà sáng tạo nổi bật</div>
                  <div className="text-xs opacity-90">Vinh danh nhà sáng tạo tiêu biểu trong tháng</div>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div id="login" className="col-span-12 lg:col-span-5 p-8">
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            {<div>
              <h3 className="text-xl font-semibold">Đăng nhập myVerse</h3>
              <p className="text-sm text-gray-500 mt-1">Nhập tên tài khoản và mật khẩu để đăng nhập.</p>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                {error && (
                  <div className="text-sm text-red-600 animate-pulse bg-red-50 border border-red-100 p-2 rounded">{error}</div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-700">Tên đăng nhập</label>
                  <Input
                    spellCheck={false}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Tên đăng nhập của bạn ..."
                  // required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Mật khẩu</label>
                  <Input
                    spellCheck={false}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Mật khẩu của bạn ..."
                  // required

                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700">Mã Captcha</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-4 py-2 bg-gray-100 rounded font-mono tracking-widest flex-1 text-center select-none">{captchaCode}</div>
                    <Button title="Làm mới" type="button" onClick={generateCaptcha} className="text-xs bg-white hover:bg-white shadow-none text-gray-500 hover:text-gray-600 cursor-pointer flex gap-1 items-center"><IoReload title="Làm mới" size={16} /></Button>
                  </div>
                  <Input spellCheck={false} type="text" value={captchaInput.toUpperCase()} onChange={(e) => setCaptchaInput(e.target.value)} className="mt-2 w-full border rounded-md px-3 py-2" placeholder="Nhập mã captcha" />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <div><Input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /></div>
                    <span>Ghi nhớ đăng nhập</span>
                  </label>
                  <a className="text-sm text-indigo-600" href="/acepctcode">Quên mật khẩu?</a>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-indigo-600 justify-center hover:bg-indigo-700 cursor-pointer text-white rounded-md px-4 py-2 font-medium shadow hover:scale-[1.01] active:scale-95"
                    disabled={loading}
                  >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </div>
                <div className="text-center text-sm text-gray mt-6">
                  Tôi chưa có tài khoản ?{" "}
                  <a
                    href="/register"
                    className="underline text-blue-400 hover:text-pink-200 transition-all"
                  >
                    Đăng ký ngay
                  </a>
                </div>
              </form>
            </div>}



            <div className="mt-6 text-xs text-gray-400">&copy; {new Date().getFullYear()} myVerser — Hệ thống quản lý phần mềm cá nhân</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

