import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfoliosys — AI-Powered Portfolio Builder",
  description: "Drop your resume, get a stunning portfolio website in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <script
          src="https://pinpoint.boone51.com/widget/pinpoint.min.js"
          defer
          data-project="portfoliosis-b51"
          data-endpoint="https://pinpoint.boone51.com/api/ingest"
        ></script>
      </body>
    </html>
  );
}
