"use client";

import { useEffect } from "react";

type Checkin = { date?: string; weight?: string };

const CHECKIN_KEY = "mike-checkins-v3";

function latestWeight(): string {
  try {
    const items = JSON.parse(localStorage.getItem(CHECKIN_KEY) || "[]") as Checkin[];
    const latest = items
      .filter((item) => item.weight && String(item.weight).trim())
      .sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")))[0];
    return latest?.weight ? `${latest.weight} kg` : "91 kg";
  } catch {
    return "91 kg";
  }
}

function updateHeaderWeight() {
  const header = document.querySelector("header");
  if (!header) return;
  const spans = Array.from(header.querySelectorAll("span"));
  const weightSpan = spans.find((span) => /^\s*\d+(?:[.,]\d+)?\s*kg\s*$/i.test(span.textContent || ""));
  if (weightSpan) weightSpan.textContent = latestWeight();
}

export default function LiveWeightSync() {
  useEffect(() => {
    updateHeaderWeight();
    const interval = window.setInterval(updateHeaderWeight, 400);
    const onStorage = (event: StorageEvent) => {
      if (event.key === CHECKIN_KEY) updateHeaderWeight();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return null;
}
