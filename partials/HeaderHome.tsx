import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { icons } from "@/utils/icons";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useState } from "react";
const { IoMenu,IoCloseCircleSharp } = icons;

export default function HeaderHome() {

    const router = useRouter();
    const [isClose,setIsClose] = useState<boolean>(false);

    const handdleClose = () => {
        setIsClose(true);
    }

    return <header className="container w-[90%] mx-auto px-6 py-8 flex items-center max-lg:justify-between lg:justify-between ">
        <div className="flex items-center gap-4">
            <div className="md:w-12 max-md:p-2 md:h-12 rounded-full bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                <span className="font-bold text-white">KT</span>
            </div>
            <div>
                <h1 className="text-lg font-semibold">Nguyễn Trung Kiên</h1>
                <p className="text-sm text-slate-600">Fullstack Developer</p>
            </div>
        </div>
        <div className="flex justify-between items-center max-md:hidden">
            <nav className="hidden md:flex gap-6 items-center font-semibold text-sm">
                <Link href={'/'}><div className="hover:underline cursor-pointer">Giới thiệu</div></Link>
                <Link href={'/blog'}><div className="hover:underline cursor-pointer">Blog cá nhân</div></Link>
                <Link href={'/news'}><div className="hover:underline cursor-pointer">Tin tức</div></Link>
                <Link href={'/weather'}><div className="hover:underline cursor-pointer">Thời tiết</div></Link>
                <Link href={'/catholic'}><div className="hover:underline cursor-pointer">Công giáo</div></Link>
                <Link href={'/tutor'}><div className="hover:underline cursor-pointer">Gia sư</div></Link>
                <Link href={'/contact'}><div className="hover:underline cursor-pointer">Liên hệ</div></Link>
            </nav>
        </div>
        <div className='lg:hidden fixed top-0 px-6 py-8 right-0'>
            <Sheet>
                <SheetTrigger asChild>
                    <IoMenu size={26} />
                </SheetTrigger>
                <SheetContent className='bg-gray-900 text-white'>
                    <SheetHeader>
                        <SheetTitle className='flex items-center gap-2'>
                            <a href={'/'} className="flex items-center gap-5">
                                <div className="md:w-12 max-md:p-2 md:h-12 rounded-full bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                                    <span className="font-bold text-white">KT</span>
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold text-white">Nguyễn Trung Kiên</h1>
                                    <p className="text-sm text-white">Fullstack Developer</p>
                                </div>
                            </a>
                        </SheetTitle>
                    </SheetHeader>
                    <ul className='flex flex-col'>
                        <li className="hover:underline mt-6 cursor-pointer pl-12 border-b border-b-gray-800 uppercase p-6" onClick={() => router.push("/")}>Giới thiệu</li>
                        <li className="hover:underline cursor-pointer pl-12 border-b border-b-gray-800 uppercase p-6" onClick={() => router.push("/blog")}>Blog cá nhân</li>
                        <li className="hover:underline cursor-pointer pl-12 border-b border-b-gray-800 uppercase p-6" onClick={() => router.push("/news")}>Tin tức</li>
                        <li className="hover:underline cursor-pointer pl-12 border-b border-b-gray-800 uppercase p-6" onClick={() => router.push("/weather")}>Thời tiết</li>
                        <li className="hover:underline cursor-pointer pl-12 border-b border-b-gray-800 uppercase p-6" onClick={() => router.push("/catholic")}>Công giáo</li>
                        <li className="hover:underline cursor-pointer pl-12 border-b border-b-gray-800 uppercase p-6" onClick={() => router.push("/tutor")}>Gia sư</li>
                        <li className="hover:underline cursor-pointer pl-12 border-b border-b-gray-800 uppercase p-6" onClick={() => router.push("/contact")}>Liên hệ</li>
                    </ul>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button variant="outline" className='text-black'>Đóng</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>

        {!isClose && <div className="relative md:hidden max-md:fixed bottom-4 z-40 right-4">
            <Button onClick={() => router.push("/login")} className="bg-indigo-600 text-white px-4 py-2 cursor-pointer rounded-xl shadow hover:opacity-95">Đăng nhập & Đăng ký</Button>
            <IoCloseCircleSharp onClick={handdleClose} className="absolute top-[-23px] -right-2.5 cursor-pointer text-gray-400" size={20} />
        </div>}

         <div className="flex items-center gap-4">
            <Button onClick={() => router.push("/login")} className="bg-indigo-600 max-md:hidden text-white px-4 py-2 cursor-pointer shadow hover:opacity-95">Đăng nhập</Button>
            <Button onClick={() => router.push("/login")} className="bg-indigo-600 max-md:hidden text-white px-4 py-2 cursor-pointer shadow hover:opacity-95">Đăng ký</Button>
        </div>
    </header>
}