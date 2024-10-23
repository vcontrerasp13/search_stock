import localFont from "next/font/local";
import './globals.css'
import { Toaster } from "sonner";
import NProgressBar from "@/components/NprogressBar";
import { SessionProvider } from "next-auth/react";

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

export default async function RootLayout({ children }) {

  return (
    <SessionProvider >

      <html lang="es" data-theme="light" className="bg-slate-100">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-xl mx-auto min-w-[320px] min-h-screen`}
          data-theme="light"

        >
          <NProgressBar>

            {children}

            <Toaster richColors />
          </NProgressBar>
        </body>
      </html>
    </SessionProvider>
  );
}
