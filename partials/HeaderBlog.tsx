'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type ID = string;
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

const toolHeader = [
    {
        id: 0,
        name: "Trang chủ",
        link: '/blog'
    },
    {
        id: 1,
        name: "Trang cá nhân",
        link: '/blog/profile'
    }
]


export default function HeaderBlog() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const router = useRouter();
    const params = usePathname();

    const handdleChoice = (link: string) => {
        router.push(link)
    }


    return <header className="flex items-center justify-between mb-6">
        {isLoggedIn && <div className="flex items-center gap-4">
            <Image src={ME.avatarUrl ? ME.avatarUrl : ''}
                alt={ME.name}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover border-2 border-white/10"

            />
            <div>
                <div className="text-lg font-bold">{ME.name}</div>
                <div className="text-sm opacity-70">{ME.bio}</div>
            </div>
        </div>}
        {!isLoggedIn && <div className="flex items-center gap-4">
            <div className="md:w-12 max-md:p-2 md:h-12 rounded-full bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                <span className="font-bold text-white">KT</span>
            </div>
            <div>
                <h1 className="text-lg font-semibold">Nguyễn Trung Kiên</h1>
                <p className="text-sm text-slate-600">Website Blog</p>
            </div>
        </div>}
        {isLoggedIn && <div className="flex items-center gap-3">
            {toolHeader?.map((item, index) => {
                return <Button key={index} onClick={
                    () => handdleChoice(item?.link)
                } className={`px-3 py-2 rounded-md bg-white/6 cursor-pointer ${params === item?.link ? "bg-linear-to-r from-indigo-500 to-cyan-400 text-black font-semibold" : ""}`}>{item?.name}</Button>
            })}
        </div>}

        {!isLoggedIn && <div className="flex items-center gap-4">
            <Button onClick={() => router.push("/login")} className="bg-indigo-600 max-md:hidden text-white px-4 py-2 cursor-pointer shadow hover:opacity-95">Đăng nhập</Button>
            <Button onClick={() => router.push("/login")} className="bg-indigo-600 max-md:hidden text-white px-4 py-2 cursor-pointer shadow hover:opacity-95">Đăng ký</Button>
        </div>}

    </header>
};