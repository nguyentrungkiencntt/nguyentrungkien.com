import { NextResponse } from "next/server";

type Reward = {
  type: "coin" | "item" | "badge";
  amount?: number;
  title: string;
  description?: string;
  image?: string;
};

// Demo: map mã -> reward
const CODE_DB: Record<string, Reward> = {
  // mã cộng xu
  "VIP-COINS-200": { type: "coin", amount: 200, title: "200 Xu", description: "Chúc mừng bạn nhận được 200 xu!", image: "/images/coin.png" },
  "VIP-COINS-500": { type: "coin", amount: 500, title: "500 Xu", description: "Chúc mừng bạn nhận được 500 xu!", image: "/images/coin.png" },
  "EPIC-IPX-2025": { type: "item", title: "iPhone 14 Pro", description: "Bạn đã trúng thưởng 1 chiếc iPhone 14 Pro (chi tiết nhận quà sẽ được gửi qua email)", image: "/images/iphone.png" },
  "VIP-COINS-10000": { type: "coin",amount: 10000, title: "10.000 Xu", description: "Chúc mừng bạn nhận được 10.000 xu!", image: "/images/coin.png" },
  "VIP-COINS-1000000": { type: "coin",amount: 1000000, title: "1.000.000 Xu", description: "Chúc mừng bạn nhận được 1.000.000 xu!", image: "/images/coin.png" },
};

// Đảm bảo mã chỉ dùng 1 lần (demo trong bộ nhớ) — production: lưu DB
const usedCodes = new Set<string>();

export async function POST(req: Request) {
  try {
    const { code } = await req.json();
    if (!code || typeof code !== "string") {
      return NextResponse.json({ message: "Missing code" }, { status: 400 });
    }

    const key = code.trim().toUpperCase();

    if (usedCodes.has(key)) {
      return NextResponse.json({ message: "Mã đã được sử dụng." }, { status: 409 });
    }

    const reward = CODE_DB[key];
    if (!reward) {
      return NextResponse.json({ message: "Mã không hợp lệ." }, { status: 404 });
    }

    // mark used (demo)
    usedCodes.add(key);

    // Trong thực tế ở đây bạn sẽ:
    // - kiểm tra DB, xác thực user
    // - ghi log, cộng xu / tạo đơn giao quà / gửi email xác nhận
    return NextResponse.json({ success: true, reward });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
