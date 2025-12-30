import { motion } from "framer-motion"

export default function Feature({ title, desc }: { title: string; desc: string }) {
    return (
        <motion.div whileHover={{ y: -4 }} className="p-3 rounded-lg bg-black/20 border border-white/6">
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-white/70 mt-1">{desc}</div>
        </motion.div>
    );
}