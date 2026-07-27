import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import "./sprint2.css";

export const metadata: Metadata = {
  title: "MIKE | HYROX Coach",
  description: "19 Eylül HYROX hazırlık komuta merkezi",
  applicationName: "MIKE",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0d0f",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        {children}
        <Link
          href="/bilgi"
          aria-label="HYROX Bilgi Merkezi"
          style={{
            position: "fixed",
            right: 16,
            top: 16,
            zIndex: 100,
            padding: "10px 13px",
            borderRadius: 12,
            background: "rgba(17,20,24,.92)",
            border: "1px solid #30363d",
            color: "#ff5a1f",
            textDecoration: "none",
            fontSize: 11,
            fontWeight: 900,
            letterSpacing: ".08em",
            backdropFilter: "blur(12px)",
          }}
        >
          HYROX BİLGİ
        </Link>
      </body>
    </html>
  );
}
