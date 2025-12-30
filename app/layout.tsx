'use client';
import "./globals.css";
import { UserProvider } from "@/app/context/UserContext";
import { ProviderStore } from "@/config/ProviderStore";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <ProviderStore>
        <html lang="en">
          <head>
            <title>Nguyễn Trung Kiên - Mr. Kiên</title>
            <link rel="icon" href="/logo/ios.png" type="image/png" sizes="any" />
          </head>
          <body
          >
            {children}
          </body>
        </html>
      </ProviderStore>
    </UserProvider>
  );
}
