import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PlaylistProvider } from "./context/PlaylistContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guess the Song",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-dvh min-h-screen`}
      >
        <ScrollArea>
          <main className="flex flex-col min-h-screen">
            <PlaylistProvider>{children}</PlaylistProvider>
          </main>
        </ScrollArea>
      </body>
    </html>
  );
}
