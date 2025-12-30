'use client';
import { pad } from "@/utils/function";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type ActionLink = {
    readonly id: string;
    readonly label: string;
    readonly href: string;
};

type UnderConstructionContent = {
    readonly time: string;
    readonly messages: ReadonlyArray<string>;
    readonly subtitle: string;
    readonly links: ReadonlyArray<ActionLink>;
};

const content: UnderConstructionContent = {
    time: "23 : 13 : 18",
    messages: [
        "Hệ thống hiện tại đang kiểm tra và sao lưu dữ liệu, xin vui lòng quay lại sau 12 giờ đêm.",
        "Mong Quý Khách hàng và nhân viên thông cảm!",
        "Xin chân thành cảm ơn Khách hàng đã quan tâm và sử dụng hệ thống.",
    ],
    subtitle: "Trong thời gian chờ đợi, Bạn có thể sử dụng những ứng dụng sau:",
    links: [
        { id: "1", label: "Trang chủ Nguyễn Trung Kiên", href: "/" },
        { id: "2", label: "Chuyên trang Gia sư", href: "/tutor" },
        { id: "3", label: "Diễn đàn", href: "/blog" },
        { id: "4", label: "Tin tức và công nghệ", href: "/news" },
    ],
};

export default function UnderConstructionPage() {

    const [now, setNow] = useState<Date>(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date())
        }, 1000)

        return () => clearInterval(timer);

    }, [])

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#8b0b0b]">
            <div className="pointer-events-none absolute inset-0 opacity-40">
                <div
                    className="h-full w-full"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 2px, transparent 2px, transparent 6px)",
                    }}
                />
            </div>


            <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
                <div className="relative w-full">

                    <div className="absolute right-4 -top-14 hidden items-center gap-2 md:flex">
                    </div>
                    <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-0">
                        <div className="relative z-10 w-full max-w-[420px] md:translate-x-8">
                            <div className="relative aspect-square w-full overflow-hidden rounded-full border-[6px] border-white/60 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
                                <Image
                                    src="/images/construction.png"
                                    alt="Under construction"
                                    fill
                                    priority
                                    className="object-cover object-center w-full h-full"
                                />
                            </div>
                        </div>

                        <div className="relative w-full max-w-[780px] rounded-2xl bg-white shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
                            <div className="absolute left-1/2 text-2xl top-[-26px] -translate-x-1/2 rounded-b-xl bg-[#b10000] px-14 py-3 text-white shadow-[0_10px_20px_rgba(0,0,0,0.25)]">
                                <div className='flex items-center gap-2'>
                                    <div className='h-10 w-10 flex items-center justify-center rounded-md font-semibold text-white'>
                                        {pad(now.getHours())}
                                    </div>
                                    :
                                    <div className='h-10 w-10 flex items-center justify-center rounded-md font-semibold text-white'>
                                        {pad(now.getMinutes())}
                                    </div>
                                    :
                                    <div className='h-10 w-10 flex items-center justify-center rounded-md font-semibold text-white'>
                                        {pad(now.getSeconds())}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 px-8 pb-10 pt-14 md:px-12">
                                <div className="mt-3 shrink-0">
                                    <Image
                                        src="/images/warning.png"
                                        alt="Warning"
                                        width={48}
                                        height={48}
                                        className="h-12 w-12"
                                    />
                                </div>

                                <div className="w-full">
                                    <div className="space-y-4 text-[15px] leading-6">
                                        <p className="text-[#cc0000]">
                                            {content.messages[0]}
                                        </p>
                                        <p className="text-[#cc0000]">{content.messages[1]}</p>
                                        <p className="text-[#cc0000]">{content.messages[2]}</p>
                                    </div>

                                    <div className="mt-8">
                                        <p className="font-bold text-black">{content.subtitle}</p>

                                        <div className="mt-5 grid grid-cols-2 gap-x-10 gap-y-3 md:grid-cols-2">
                                            {content.links.map((item) => (
                                                <Link
                                                    key={item.id}
                                                    href={item.href}
                                                    className="group hover:cursor-pointer flex h-8 items-center rounded bg-[#b10000] px-3 text-sm text-white shadow-[0_6px_14px_rgba(0,0,0,0.2)] transition hover:brightness-110"
                                                >
                                                    <span className="mr-2 text-base leading-none">
                                                        »
                                                    </span>
                                                    <span className="cursor-pointer">{item.label}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
