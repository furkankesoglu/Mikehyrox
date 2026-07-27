import type { Metadata, Viewport } from "next";
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
      <body>{children}</body>
    </html>
  );
}
