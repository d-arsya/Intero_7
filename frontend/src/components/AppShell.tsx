import { Inter } from "next/font/google";
import "@/app/globals.css";
import { Footer } from '@/components/Footer'

const geistSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

interface AppShellProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function AppShell({ header, children }: AppShellProps) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {header}
        <main className="px-2 md:px-32">
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
