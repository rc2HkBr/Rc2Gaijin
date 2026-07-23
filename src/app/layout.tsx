import type { Metadata } from "next";
import { Quicksand, VT323 } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import BottomBar from "@/components/BottomBar";
import { GameProvider } from "@/context/GameContext";
import SplashScreen from "@/components/SplashScreen";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GAIJIN RC2 - 外人RC2",
  description: "Learn Japanese the Cyber-Ninja Way",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} ${vt323.variable} font-sans antialiased bg-black`}>
        
        {/* Splash Screen */}
        <SplashScreen />

        {/* DESKTOP: CRT Frame */}
        <div className="hidden sm:flex h-screen w-screen p-6">
          <div className="flex-1 rounded-3xl border-[16px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,210,255,0.2)] bg-background relative overflow-hidden flex flex-row">
            <div className="scanlines"></div>
            <GameProvider>
              <Sidebar />
              <main className="flex-1 overflow-y-auto relative z-10">
                {children}
              </main>
            </GameProvider>
          </div>
        </div>

        {/* MOBILE: Full screen, no CRT frame */}
        <div className="sm:hidden flex flex-col h-[100dvh] bg-background overflow-hidden">
          <GameProvider>
            <main className="flex-1 overflow-y-auto overscroll-none pb-16">
              {children}
            </main>
            <BottomBar />
          </GameProvider>
        </div>

      </body>
    </html>
  );
}
