export const generateSendOTP = () => {
   const chars: string = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
   let otp: string = "";
   for (let i = 0; i < 6; i++) {
      otp += chars.charAt(Math.floor(Math.random() * chars.length));
   }
   return otp;
}

export function formatDateUTC(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export const pad = (n: number) => n.toString().padStart(2, '0');