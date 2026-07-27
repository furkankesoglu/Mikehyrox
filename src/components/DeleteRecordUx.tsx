"use client";

import { useEffect } from "react";

export default function DeleteRecordUx() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest("button");
      if (!button || button.textContent?.trim() !== "KAYDI SİL") return;

      const card = button.closest("details");
      if (!card) return;

      window.setTimeout(() => {
        const pageText = document.body.textContent || "";
        const deletionStarted = pageText.includes("kaydı siliniyor") || pageText.includes("kaydı buluttan ve cihazdan silindi") || pageText.includes("kaydı cihazdan silindi");
        if (deletionStarted) card.remove();
      }, 120);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
