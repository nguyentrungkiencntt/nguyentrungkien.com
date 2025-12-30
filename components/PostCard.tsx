'use client';

import Avatar from "@/components/Avatar";
import IconHeart from "@/components/ui/IconHeart";
import Image from "next/image";
import { icons } from "@/utils/icons";
import { useState } from "react";
const { PiSealCheckFill } = icons;

export type ID = string;

type MediaType = "image" | "video";

type User = {
    id: ID;
    name: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
};

type Comment = {
    id: ID;
    author: User;
    text: string;
    createdAt: string; 
};

type MediaItem = {
    id: ID;
    type: MediaType;
    src: string;
    alt?: string;
};


export type Post = {
    id: ID;
    author: User;
    media: MediaItem[];
    caption?: string;
    tags?: string[];
    createdAt: string;
    likes: number;
    comments: Comment[];
    location?: string;
};

export default function PostCard({ post, onOpen }: { post: Post; onOpen: (id: ID) => void; }) {


    const [isCheck, setCheck] = useState<boolean>(true);
    const [isHeart,setIsHeart] = useState<boolean>(false);

    const handdleCheck = () => {
        setCheck(!isCheck);
    }

    const handdleFill = () => {
        setIsHeart(!isHeart);
    }

    return (
        <div className="bg-linear-to-br from-[#061024] via-[#04112a] to-[#05162f] rounded-2xl overflow-hidden border border-white/6 shadow-lg">
            <div className="p-4 flex items-center gap-3">
                <Avatar url={post?.author.avatarUrl} size={48} alt={post?.author.name} />
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="font-semibold flex items-end gap-3">
                                <div className="flex items-center gap-1">
                                    <div>Nguyễn Trung Kiên</div>
                                    <div className="text-blue-400">
                                        <PiSealCheckFill size={18} />
                                    </div>
                                </div>
                                <span onClick={handdleCheck} className={`${isCheck ? "text-blue-400 " : "text-gray-400"}  text-[12px] hover:underline cursor-pointer`}>{isCheck ? "Theo dõi" : "Đang theo dõi"}</span>
                            </div>
                            <div className="text-xs opacity-70">Hanoi • 12/12/2025</div>
                        </div>
                        <div className="text-xs opacity-60">256 ❤</div>
                    </div>
                </div>
            </div>

            <div className="cursor-pointer" onClick={() => onOpen(post.id)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                    <div className="aspect-4/3 bg-black/20 overflow-hidden">
                        <Image src={"/images/wheel.jpg"} alt={'logo'}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover transform hover:scale-105 transition-transform" />
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-white/6">
                <div className="flex items-center gap-3">
                    <button onClick={handdleFill} className="p-2 rounded-md cursor-pointer bg-white/6 hover:bg-white/10">
                        <IconHeart filled={isHeart} />
                    </button>
                    <button onClick={() => onOpen(post.id)} className="px-3 py-2 rounded-md cursor-pointer bg-white/6">Xem chi tiết</button>
                </div>

                <div className="mt-3 text-slate-200">
                    <div className="mb-2">{post.caption}</div>
                    <div className="flex gap-2 flex-wrap">
                        {(post.tags ?? []).map(t => <span key={t} className="text-xs px-2 py-1 bg-white/6 rounded-md">{t}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
}