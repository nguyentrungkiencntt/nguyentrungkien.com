'use client';
export default function IconHeart({ filled = false }: { filled?: boolean }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${filled ? 'text-red-500' : 'text-white'}`} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.8 8.6c0 5-8.8 10.6-8.8 10.6S3.2 13.6 3.2 8.6a4 4 0 0 1 6.6-3.1L12 7.2l2.2-1.7a4 4 0 0 1 6.6 3.1z" />
        </svg>
    );
}
