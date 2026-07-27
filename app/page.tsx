import Link from "next/link";
import MikeWeek1App from "@/components/MikeWeek1App";

export default function Home() {
  return (
    <>
      <Link
        href="/knowledge"
        style={{
          position: "fixed",
          top: 18,
          right: 18,
          zIndex: 999,
          padding: "11px 14px",
          borderRadius: 12,
          border: "1px solid #ff5a1f",
          background: "rgba(9,11,13,.92)",
          color: "#ff5a1f",
          textDecoration: "none",
          fontSize: 12,
          fontWeight: 900,
          letterSpacing: ".06em",
          backdropFilter: "blur(12px)",
        }}
      >
        HYROX BİLGİ
      </Link>
      <MikeWeek1App />
    </>
  );
}
