import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { getSession } from "@/app/lib/session";
import AuthProvider from "@/app/components/AuthProvider";
// Providers is already imported above

// ... imports remain the same

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
        <AuthProvider
          initialState={
            session || {
              token: null,
              user: null,
            }
          }
        >
          <Providers>{children}</Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
