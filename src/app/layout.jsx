import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { NavSearch } from "./search/ui/NavSearch";
import NProgressBar from "@/components/NprogressBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "KAYSER | Control Stock",
  description: "Sistema para control stock",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light" className="bg-slate-100">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-xl mx-auto min-w-[320px] min-h-screen`}
        data-theme="light"

      >
        <NavSearch />

        <NProgressBar>
          {children}

        </NProgressBar>
        <Toaster richColors />
      </body>
    </html>
  );
}
