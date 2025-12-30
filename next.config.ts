import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://i.pravatar.cc/160?img=12"),
      new URL("https://i.pravatar.cc/150?img=12"),
      new URL("https://i.pravatar.cc/150?img=32"),
      new URL("https://i.pravatar.cc/150?img=3"),
      new URL("https://res.cloudinary.com/dp6cr7ea5/image/upload/**"),
      new URL("https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&q=80&auto=format&fit=crop"),
      new URL("https://openweathermap.org/img/wn/**"),
      new URL("https://openweathermap.org/img/wn/**"),
      new URL("https://i.pravatar.cc/**")
    ],
  },
};

export default nextConfig;
