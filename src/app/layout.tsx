import type { Metadata } from "next";
import { Quicksand, VT323 } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomBar from "@/components/BottomBar";
import { GameProvider } from "@/context/GameContext";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Nihongo App",
  description: "Learn Japanese the right way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${vt323.variable} font-sans antialiased relative`}>
        {/* CRT Scanline Overlay Effect */}
        <div className="scanlines"></div>
        <GameProvider>
          <div className="flex h-screen w-full flex-col sm:flex-row overflow-hidden bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto pb-20 sm:pb-0 relative">
              {children}
            </main>
            <BottomBar />
          </div>
        </GameProvider>
      </body>
    </html>
  );
}
