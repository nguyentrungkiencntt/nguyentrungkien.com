'use client';
import Image from "next/image";

export default function Avatar({ url, size = 40, alt = '' }: { url?: string; size?: number; alt?: string }) {
    return (
        <div className="rounded-full overflow-hidden" style={{ width: size, height: size }}>
            <Image
                width={500}
                height={500}
                src={url ?? '/images/avatar-placeholder.png'} alt={alt} className="w-full h-full object-cover" />
        </div>
    );
}