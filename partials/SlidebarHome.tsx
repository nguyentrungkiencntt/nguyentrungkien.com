'use client';
import Stat from "@/utils/CountUp";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaFigma, FaMobileAlt } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoTypescript } from "react-icons/bi";
import { TbBrandNodejs } from "react-icons/tb";
import { FaJava } from "react-icons/fa";
import { SiDotnet } from "react-icons/si";
import { SiJquery } from "react-icons/si";
import { SiRedux } from "react-icons/si";
import { SiSocketdotio } from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { SiPostman } from "react-icons/si";
import { SiIntellijidea } from "react-icons/si";
import { SiMysql } from "react-icons/si";
import { SiMongodb } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoVercel } from "react-icons/io5";
import { SiRender } from "react-icons/si";
import { SiClevercloud } from "react-icons/si";
import { SiXampp } from "react-icons/si";
import { FaGithub } from "react-icons/fa";
import { BiLogoCPlusPlus } from "react-icons/bi";

const skills = [
    { icon: <FaHtml5 className="text-orange-400 text-3xl" />, label: "HTML5" },
    { icon: <FaCss3Alt className="text-blue-400 text-3xl" />, label: "CSS3" },
    { icon: <BiLogoCPlusPlus className="text-blue-400 text-3xl" />, label: "C & C++" },
    { icon: <RiTailwindCssFill className="text-cyan-400 text-3xl" />, label: "Tailwind" },
    { icon: <FaJs className="text-yellow-400 text-3xl" />, label: "JavaScript" },
    { icon: <BiLogoTypescript className="text-blue-500 text-3xl" />, label: "TypeScript" },
    { icon: <FaReact className="text-cyan-400 text-3xl" />, label: "React" },
    { icon: <RiNextjsFill className="text-blue-500 text-3xl" />, label: "Next" },
    { icon: <FaMobileAlt className="text-green-400 text-3xl" />, label: "Responsive" },
    { icon: <TbBrandNodejs className="text-green-500 text-3xl" />, label: "Node" },
    { icon: <FaJava className="text-orange-400 text-3xl" />, label: "Java" },
    { icon: <SiDotnet className="text-blue-400 text-3xl" />, label: "ASP.NET" },
    { icon: <SiJquery className="text-cyan-400 text-3xl" />, label: "jQuery" },
    { icon: <SiRedux className="text-cyan-400 text-3xl" />, label: "Redux" },
    { icon: <SiSocketdotio className="text-cyan-400 text-3xl" />, label: "SocketIO" },
];


const tools = [
    { icon: <VscVscode className="text-blue-400 text-3xl" />, label: "VS Code" },
    { icon: <SiIntellijidea className="text-pink-400 text-3xl" />, label: "IntelliJ" },
    { icon: <SiPostman className="text-orange-400 text-3xl" />, label: "Postman" },
    { icon: <FaFigma className="text-green-400 text-3xl" />, label: "Figma" },
    { icon: <IoLogoVercel className="text-white text-3xl" />, label: "Vercel" },
    { icon: <SiRender className="text-black text-3xl" />, label: "Render" },
    { icon: <SiClevercloud className="text-red-500 text-3xl" />, label: "CloudClever" },
    { icon: <SiXampp className="text-orange-400 text-3xl" />, label: "Xampp" },
    { icon: <FaGithub className="text-white text-3xl" />, label: "GitHub" },
];

const database = [
    { icon: <SiMysql className="text-blue-400 text-3xl" />, label: "mySQL" },
    { icon: <SiMongodb className="text-green-600 text-3xl" />, label: "MongoDB" },

]

export default function SlidebarHome() {

    const router = useRouter();

    return <div>
        <section className="container w-[92%] mt-28 mx-auto px-6 py-12 grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-4xl md:text-4xl font-semibold leading-tight">Xin chào, tôi là <span className="font-bold bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Nguyễn Trung Kiên</span></h2>
                <p className="mt-4 text-lg text-slate-700">Fullstack Developer - Mobile Developer & UI/UX Designer</p>
                <p className="mt-4 text-lg text-slate-700 text-justify">Tôi xây dựng giao diện web đẹp, performant và thân thiện. Tôi thích tối ưu hoá trải nghiệm người dùng, viết code rõ ràng và testable.</p>

                <div className="mt-6 flex gap-3">
                    <a target="_blank" href="https://github.com/nguyentrungkiencntt" className="inline-flex items-center gap-2 bg-cyan-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transform transition">Xem dự án</a>
                    <div onClick={() => router.push("/contact")} className="inline-flex cursor-pointer items-center gap-2 border border-slate-200 px-4 py-2 rounded-lg">Liên hệ</div>
                </div>

                <div className="mt-8 grid grid-cols-3 max-lg:grid-cols-1 gap-3">
                    <Stat number={3} label="Năm kinh nghiệm" />
                    <Stat number={10} label="Dự án" />
                    <Stat number={100} label="Tâm huyết" />
                </div>
            </motion.div>

            <motion.div
                className="relative w-full"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <div className="relative w-full mx-auto">
                    <div className="absolute -inset-2 rounded-3xl bg-linear-to-tr from-purple-500/30 via-blue-500/30 to-pink-200/30 blur-2xl" />
                    <Image
                        src={"/images/slide.png"}
                        height={1000}
                        width={1000}
                        className="w-full h-full object-cover object-center"
                        alt="logo"
                    />

                </div>
            </motion.div>


        </section>
        <motion.div
            className="pt-20 text-center"
        >
            <div className="flex items-center justify-center">
                <div className="text-center font-semibold px-4 py-2 bg-white rounded-xl text-black">Ngôn ngữ lập trình & Thư viện</div>
            </div>
            <p className="mt-4 text-lg text-slate-300">Với sự yêu mến công nghệ và yêu thích sự sáng tạo tôi bắt đầu làm Fullstack Web Developer</p>
            <p className="text-lg text-slate-300 mt-20 m-auto w-[70%] text-justify">Xin chào, tôi là <span className="font-bold">Nguyễn Trung Kiên</span>, tôi là một Fullstack Developer với hơn 3 năm kinh nghiệm trong việc xây dựng và phát triển ứng dụng web hiện đại. Thành thạo Node.js, React.js và Next.js, tôi luôn hướng đến việc tạo ra sản phẩm hiệu quả, tối ưu hiệu suất và mang lại trải nghiệm cho người dùng tốt nhất.</p>
            <p className="text-lg text-slate-300 mt-10 m-auto w-[70%] text-justify">Với những đầy đủ những kiến thức được học. Tôi biết cách phát triển một trang web đáp ứng đầy đủ tính năng và tính bảo mật cao.</p>
            <p className="text-lg text-slate-300 m-auto w-[70%] text-justify">Dự án đầu tiên của tôi dùng Reactjs, Redux, Tailwindcss và Nodejs, MySQL để tạo ra một dự án cá nhân nho nhỏ với đầy đủ Fullstack, Restfull API và với hơn 3 năm kinh nghiệm trong việc xây dựng và phát triển ứng dụng web hiện đại. Tôi đã hoàn toàn tạo ra một trang web thực sự hiệu quả và hữu ích.</p>
            <p className="text-lg text-slate-300 mt-10 m-auto w-[70%] text-justify">Tôi là một chuyên gia kết hợp giữa Nextjs, Redux Toolkit, Tailwindcss và Nodejs, MySQL để tạo ra các dự án có hiệu xuất cao và tối ưu, tôi đã áp dụng chúng vào các đồ án lớn nhỏ ở trường, tôi tiếp tục cập nhật công nghệ trong từng gia đoạn phát triển của dự án.</p>
            <p className="text-lg text-slate-300 m-auto w-[70%] text-justify">Ngoài ra, tôi cũng là một Frontend Developer với nền tảng vững chắc về HTML5, CSS3, JavaScript, TypeScript và các framework hiện đại như React.js và Next.js. Bên cạnh đó, tôi cũng có nhiều kinh nghiệm khi làm việc với Java và có một chút kinh nghiệm về Java SpringBoot trong các dự án phát triển web Fullstack. Tôi luôn cập nhật những xu hướng công nghệ mới, chú trọng vào hiệu suất và trải nghiệm người dùng để mang đến những sản phẩm tối ưu và chuyên nghiệp cho khách hàng.</p>
        </motion.div>
        <div className="py-16 px-6 text-center w-[70%] m-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-9 gap-y-3 justify-items-center">
                {skills.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.08, y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="bg-[#1a1f29] hover:bg-[#222837] text-white rounded-2xl p-6 w-28 h-28 flex flex-col items-center justify-center shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                    >
                        {s.icon}
                        <span className="mt-3 text-sm font-medium">{s.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div
            className="pt-20 text-center"
        >
            <div className="flex items-center justify-center">
                <div className="text-center font-semibold px-4 py-2 bg-white rounded-xl text-black">Ứng dụng & Công cụ phát triển</div>
            </div>
            <p className="mt-4 text-lg text-slate-300">Với sự bộ trở của các ứng dụng tôi dễ dàng tạo ra một trang web với kiểu Fullstack Web Developer</p>
            <p className="text-lg text-slate-300 mt-20 m-auto w-[70%] text-justify">Với sự tò mò và thích khám phá tôi cũng có cho mình những extension vô cùng hay và ý nghĩa trong mỗi ứng dụng code.</p>
            <p className="text-lg text-slate-300 mt-10 m-auto w-[70%] text-justify">Tôi cũng là một người thích sưu tầm những ứng dụng hay như IntelliJ IDEA, VS Code đây là những ứng dụng có giao diện bắt mắt và cực kì thích thú khi code, cũng như cách sử dung cũng rất dễ dàng và hiệu quả, đồng thời cũng cung cấp cho tôi các extension hữu ích và đẹp mắt.</p>
        </motion.div>
        <div className="py-16 px-6 text-center w-[70%] m-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-9 gap-y-3 justify-items-center">
                {tools.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.08, y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="bg-[#1a1f29] hover:bg-[#222837] text-white rounded-2xl p-6 w-28 h-28 flex flex-col items-center justify-center shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                    >
                        {s.icon}
                        <span className="mt-3 text-sm font-medium">{s.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>

        <motion.div
            className="pt-20 text-center"
        >
            <div className="flex items-center justify-center">
                <div className="text-center font-semibold px-4 py-2 bg-white rounded-xl text-black">Cơ sở dữ liệu & Database</div>
            </div>
            <p className="mt-4 text-lg text-slate-300">Khi làm việc với Fullstack Web thì không thể thiếu một thứ quan trọng đó là nơi lưu trữ dữ liệu của hệ thống</p>
            <p className="text-lg text-slate-300 mt-20 m-auto w-[70%] text-justify">Chính vì thế tôi đã bắt tay vào học cách thiết kế cơ sở dữ liệu và cách xử lý luồng dữ liệu của mỗi loại database. Tôi đã lựa chọn cho mình 2 cơ sở dự liệu để phát triển đó chính là MySQL, và MongDB. Khi kết hợp chúng với code tôi nhận thấy chúng rất hiệu quả và dễ dùng.</p>
        </motion.div>
        <div className="py-16 px-6 text-center w-[70%] m-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-9 gap-y-3 justify-items-center">
                {database.map((s, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.08, y: -5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="bg-[#1a1f29] hover:bg-[#222837] text-white rounded-2xl p-6 w-28 h-28 flex flex-col items-center justify-center shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                    >
                        {s.icon}
                        <span className="mt-3 text-sm font-medium">{s.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
}