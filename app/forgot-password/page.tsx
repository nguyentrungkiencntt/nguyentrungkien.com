'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { generateSendOTP } from "../../utils/function";
import { useUser } from "@/app/context/UserContext";
// import emailjs from "emailjs/browser";

const codeOTPRandom = generateSendOTP();
export default function ForgotPasswordPage() {
    const [step, setStep] = useState<"email" | "otp" | "reset">("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { messageApi } = useUser();

    const handleSendOTP = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!email || !email.includes("@gmail.com")) {
            messageApi.open({
                type: "error",
                content: "Vui lòng nhập email hợp lệ!"
            });
            return;
        }

        const templateEmail = {
            to_name: email,
            name: "windsorenglishcenterhotro@gmail.com",
            message: codeOTPRandom,
            title: "🔐 Mã xác thực OTP của bạn"
        }
        setStep("otp");
        try {


            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {

        } finally {
            console.log(templateEmail)
        }
    };

    const handleVerifyOTP = () => {
        if (!otp) return;
        if (otp.trim().toUpperCase() === codeOTPRandom) {
            setStep("reset");
        } else {
            messageApi.open({
                type: "error",
                content: "Mã OTP không đúng!"
            })
            return;
        }
    };

    const handleResetPassword = () => {
        if (!password || password !== confirmPassword) return;
        // Call API đặt lại mật khẩu
        messageApi.open({
            type: "success",
            content: "Đặt lại mật khẩu thành công!"
        })
        setTimeout(() => {
            redirect("/")
        }, 4000)
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-200 to-indigo-400 p-6">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <Card className="shadow-2xl rounded-2xl border-0 backdrop-blur-lg bg-white/90">
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-indigo-700">
                            {step === "email" && "Quên mật khẩu"}
                            {step === "otp" && "Nhập mã OTP"}
                            {step === "reset" && "Đặt mật khẩu mới"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {step === "email" && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <form onSubmit={handleSendOTP} className="space-y-4">
                                    <Input
                                        spellCheck={false}
                                        placeholder="Nhập email đăng ký"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Button type="submit" className="w-full bg-linear-to-br from-blue-400 cursor-pointer to-indigo-400">
                                        Gửi mã OTP
                                    </Button>
                                </form>
                            </motion.div>
                        )}

                        {step === "otp" && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <Input
                                    placeholder="Nhập mã OTP"
                                    spellCheck={false}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                                <div className="flex justify-between items-center">
                                    <Button variant="outline" onClick={() => setStep("email")}>
                                        Quay lại
                                    </Button>
                                    <Button onClick={handleVerifyOTP}>Xác nhận OTP</Button>
                                </div>
                            </motion.div>
                        )}
                        {step === "reset" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <Input
                                    spellCheck={false}
                                    type="password"
                                    placeholder="Mật khẩu mới"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Input
                                    type="password"
                                    placeholder="Xác nhận mật khẩu mới"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <div className="flex justify-between items-center">
                                    <Button variant="outline" onClick={() => {
                                        setStep("otp")
                                    }}>
                                        Quay lại
                                    </Button>
                                    <Button onClick={handleResetPassword}>Đặt mật khẩu</Button>
                                </div>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
