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
      <body className={`${quicksand.variable} ${vt323.variable} font-sans antialiased bg-black p-0 sm:p-6 overflow-hidden h-screen w-screen flex`}>
        
        {/* Tela de Inicialização (Marca do Criador) */}
        <SplashScreen />

        {/* Carcaça do Monitor (Fliperama) */}
        <div className="flex-1 h-full sm:rounded-3xl border-[16px] border-[#1a1a1a] shadow-[0_0_50px_rgba(0,210,255,0.2)] bg-background relative overflow-hidden flex flex-col sm:flex-row">
          {/* Efeito da Tela de Tubo */}
          <div className="scanlines absolute inset-0 rounded-2xl"></div>

          <GameProvider>
            <Sidebar />
            <main className="flex-1 overflow-y-auto pb-20 sm:pb-0 relative z-10">
              {children}
            </main>
            <BottomBar />
          </GameProvider>
        </div>
      </body>
    </html>
  );
}
