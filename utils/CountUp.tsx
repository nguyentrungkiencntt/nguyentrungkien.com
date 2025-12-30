'use client';
import CountUp from "react-countup";

export default function Stat({ number, label }: { number: number; label: string }) {
    return (
        <div className="bg-white rounded-xl p-4 shadow flex flex-col items-start max-lg:items-center">
            <div className="text-lg font-bold text-black max-lg:text-3xl"><CountUp end={number} duration={3} />{`${label === "Tâm huyết" ? '%' : '+'}`} </div>
            <div className="text-sm text-black max-lg:text-2xl">{label}</div>
        </div>
    );
}
