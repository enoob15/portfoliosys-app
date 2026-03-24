import type { Metadata } from "next";
import Script from "next/script";
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
  title: "Portfoliosis — AI-Powered Portfolio Builder",
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
        <Script src="/pinpoint.min.js" strategy="afterInteractive" />
        <Script id="pinpoint-init" strategy="afterInteractive">{`
          (function waitForPinpoint() {
            if (window.Pinpoint) {
              window.Pinpoint.init({
                projectId: "portfoliosis",
                endpoint: "/api/pinpoint",
                features: {
                  feedback: true,
                  console: true,
                  network: true,
                  errors: true,
                  abandonment: true,
                  rageClicks: true,
                  deadClicks: true,
                },
                ui: {
                  position: "bottom-right",
                  color: "#6366f1",
                  darkMode: "auto",
                }
              });
            } else {
              setTimeout(waitForPinpoint, 100);
            }
          })();
        `}</Script>
      </body>
    </html>
  );
}
