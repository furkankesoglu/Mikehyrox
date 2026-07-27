"use client";

import { useEffect, useState } from "react";

type State = "loading" | "synced" | "local" | "error";

export default function CloudStatus() {
  const [state, setState] = useState<State>("loading");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    fetch("/api/sync", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!data.configured) {
          setState("local");
          setDetail("Supabase değişkenleri bulunamadı");
          return;
        }
        if (!response.ok || data.error) {
          throw new Error(data.error || "Senkronizasyon hatası");
        }
        setState("synced");
        setDetail("Supabase bağlantısı aktif");
      })
      .catch((error) => {
        setState("error");
        setDetail(error instanceof Error ? error.message : "Bağlantı kurulamadı");
      });
  }, []);

  const label = state === "synced"
    ? "BULUT: SENKRON"
    : state === "loading"
      ? "BULUT: BAĞLANIYOR"
      : state === "local"
        ? "BULUT: KAPALI · YEREL"
        : "BULUT: HATA";

  return (
    <div
      title={detail}
      style={{
        position: "fixed",
        top: 14,
        right: 14,
        zIndex: 10000,
        padding: "10px 13px",
        borderRadius: 12,
        border: "1px solid #ff5a1f",
        background: "rgba(9,11,13,.96)",
        color: state === "synced" ? "#7dff9b" : state === "error" ? "#ff7d7d" : "#ff9a76",
        fontSize: 11,
        fontWeight: 900,
        letterSpacing: ".08em",
        boxShadow: "0 8px 30px rgba(0,0,0,.35)",
      }}
    >
      {label}
    </div>
  );
}
