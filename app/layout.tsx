import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { getSession } from "@/app/lib/session";
import { AuthStoreProvider } from "@/store/auth-store-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Products list",
  description: "Products list",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthStoreProvider
          initialState={
            session ? { token: session.token, user: session.user } : undefined
          }
        >
          <Providers>{children}</Providers>
        </AuthStoreProvider>
      </body>
    </html>
  );
}
