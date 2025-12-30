
import { icons } from "@/utils/icons"
const { FaGithub, FaFacebookF, RiLinkedinLine, FiYoutube, MdOutlineMailOutline } = icons;

export default function FooterHome() {
    return <footer className="bg-gray-900 text-white pt-20">
        <div className="grid md:grid-cols-2 max-md:grid-cols-1 w-[85%] m-auto border-b border-gray-800 mt-5 pb-10">
            <div className="flex flex-col gap-2 mr-8">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-md">
                        <span className="font-bold text-white">KT</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold">Nguyễn Trung Kiên</h1>
                        <p className="text-sm text-gray-500">Fullstack Developer</p>
                    </div>
                </div>
                <p className="mt-4 text-lg text-gray-500 md:w-[400px] text-justify">Là một Fullstack Developer tôi luôn cố gắng hết sức để hoàn thiện tốt công việc và nhiệm vụ của mình.</p>
                <div className="flex gap-3 mt-4">
                    <a target="_blank" href="https://www.facebook.com/share/1AFois1MAc/" className="rounded-md py-2.5 hover:bg-[#667eea] cursor-pointer hover:text-white text-[#9ca3af] px-3 bg-gray-800">
                        <FaFacebookF size={18} />
                    </a>
                    <a target="_blank" href="https://www.youtube.com/@mr.nguyentrungkien" className="rounded-md py-2.5 hover:bg-[#667eea] cursor-pointer hover:text-white text-[#9ca3af] px-3 bg-gray-800">
                        <FiYoutube size={18} />
                    </a>
                    <a target="_blank" href="#" className="rounded-md py-2.5 hover:bg-[#667eea] cursor-pointer hover:text-white text-[#9ca3af] px-3 bg-gray-800">
                        <RiLinkedinLine size={18} />
                    </a>
                    <a target="_blank" href="https://github.com/nguyentrungkiencntt" className="rounded-md py-2.5 hover:bg-[#667eea] cursor-pointer hover:text-white text-[#9ca3af] px-3 bg-gray-800">
                        <FaGithub size={18} />
                    </a>
                    <a target="_blank" href="https://mail.google.com" className="rounded-md py-2.5 hover:bg-[#667eea] cursor-pointer hover:text-white text-[#9ca3af] px-3 bg-gray-800">
                        <MdOutlineMailOutline size={18} />
                    </a>
                </div>
            </div>
            <div className="grid md:grid-cols-2 max-md:grid-cols-1 max-md:mt-6 max-md:gap-2">
                <div className="flex flex-col gap-4">
                    <div className="">
                        Dịch vụ
                    </div>
                    <ul className="flex text-gray-500 flex-col gap-2">
                        <li className="hover:text-[#667eea] cursor-pointer">Fullstack Developer</li>
                        <li className="hover:text-[#667eea] cursor-pointer">Mobile Developer</li>
                        <li className="hover:text-[#667eea] cursor-pointer">UI/UX Designer</li>
                        <li className="hover:text-[#667eea] cursor-pointer">Dạy gia sư Toán</li>
                        <li className="hover:text-[#667eea] cursor-pointer">Code đồ án</li>
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="">
                        Liên hệ
                    </div>
                    <ul className="flex text-gray-500 flex-col gap-2">
                        <li><span className="min-w-[50px]">Email</span>: nguyenkiencnttltv@gmail.com</li>
                        <li><span className="min-w-[50px]">Phone</span>: 0336099317</li>
                        <li><span className="min-w-[50px]">Facebook</span>: Nguyễn Trung Kiên</li>
                        <li><span className="min-w-[50px]">Địa chỉ</span>: Hoà Khánh, Q.Liên Chiểu, TP.Đà Nẵng, Việt Nam</li>
                    </ul>
                </div>
            </div>

        </div>
        <div className="container text-[#9ca3af] mx-auto py-10 text-center text-sm max-lg:px-4">© Copyright to 2025 - {new Date().getFullYear()} by Nguyễn Trung Kiên. Bản quyền thuộc về Nguyễn Trung Kiên</div>
    </footer>
}