"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { weeklyProgram } from "@/lib/program";

const AUTH_KEY = "mike-authenticated";
const COMPLETION_KEY = "mike-workout-completion-v2";
const METRICS_KEY = "mike-metrics-v1";
const RACE_DATE = new Date("2026-09-19T09:00:00+03:00");

type Metrics = {
  date: string;
  weight: string;
  waist: string;
  sleep: string;
  sleepQuality: string;
  backPain: string;
  energy: string;
};

const emptyMetrics: Metrics = {
  date: new Date().toISOString().slice(0, 10),
  weight: "",
  waist: "",
  sleep: "",
  sleepQuality: "",
  backPain: "",
  energy: "",
};

function getCountdown() {
  const diff = Math.max(0, RACE_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
  };
}

function getTodayKey() {
  const day = new Date().getDay();
  return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][day];
}

export default function MikeAppV2() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"home" | "calendar" | "tracking">("home");
  const [selectedDay, setSelectedDay] = useState(getTodayKey());
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [countdown, setCountdown] = useState(getCountdown());
  const [metrics, setMetrics] = useState<Metrics>(emptyMetrics);
  const [history, setHistory] = useState<Metrics[]>([]);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    setAuthenticated(localStorage.getItem(AUTH_KEY) === "true");
    const completion = localStorage.getItem(COMPLETION_KEY);
    const storedMetrics = localStorage.getItem(METRICS_KEY);
    if (completion) {
      try { setCompleted(JSON.parse(completion)); } catch { localStorage.removeItem(COMPLETION_KEY); }
    }
    if (storedMetrics) {
      try {
        const parsed = JSON.parse(storedMetrics) as Metrics[];
        setHistory(parsed);
      } catch { localStorage.removeItem(METRICS_KEY); }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const today = weeklyProgram.find((day) => day.key === getTodayKey()) ?? weeklyProgram[0];
  const currentDay = weeklyProgram.find((day) => day.key === selectedDay) ?? today;
  const todayDone = today.items.filter((item) => completed[item.id]).length;
  const todayProgress = Math.round((todayDone / today.items.length) * 100);
  const weekItems = weeklyProgram.flatMap((day) => day.items);
  const weekDone = weekItems.filter((item) => completed[item.id]).length;
  const weekProgress = Math.round((weekDone / weekItems.length) * 100);
  const latest = history[0];

  const weeklySummary = useMemo(() => [
    { label: "Haftalık uyum", value: `${weekProgress}%` },
    { label: "Son kilo", value: latest?.weight ? `${latest.weight} kg` : "—" },
    { label: "Son bel", value: latest?.waist ? `${latest.waist} cm` : "—" },
    { label: "Son uyku", value: latest?.sleep ? `${latest.sleep} saat` : "—" },
  ], [latest, weekProgress]);

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const expectedPin = process.env.NEXT_PUBLIC_MIKE_PIN;
    if (!expectedPin) {
      setError("Sistem PIN'i henüz tanımlanmamış.");
      return;
    }
    if (pin === expectedPin) {
      localStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
      setError("");
      return;
    }
    setError("PIN doğru değil.");
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setPin("");
  }

  function toggle(id: string) {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(next));
  }

  function saveMetrics(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = [metrics, ...history.filter((entry) => entry.date !== metrics.date)];
    setHistory(next);
    localStorage.setItem(METRICS_KEY, JSON.stringify(next));
    setSavedMessage("Günlük kayıt kaydedildi.");
    window.setTimeout(() => setSavedMessage(""), 2500);
  }

  function openDay(key: string) {
    setSelectedDay(key);
    setActiveTab("calendar");
  }

  if (!ready) return <main className="loading">MIKE hazırlanıyor...</main>;

  if (!authenticated) {
    return (
      <main className="login-shell">
        <section className="login-card">
          <div className="brand-mark">M</div>
          <p className="eyebrow">YUSUF BEZENG · HYROX PERFORMANCE</p>
          <h1>MIKE</h1>
          <p className="login-copy">19 Eylül’e kadar her gün ne yapacağını bil, yaptığını kaydet.</p>
          <form onSubmit={login}>
            <label htmlFor="pin">Kişisel PIN</label>
            <input id="pin" inputMode="numeric" autoComplete="current-password" value={pin} onChange={(event) => setPin(event.target.value)} placeholder="••••" maxLength={12} />
            {error && <p className="error">{error}</p>}
            <button type="submit">SİSTEME GİR</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">HYROX COMMAND CENTER</p>
          <h1>Günaydın, Yusuf.</h1>
        </div>
        <button className="ghost-button" onClick={logout}>Çıkış</button>
      </header>

      {activeTab === "home" && (
        <>
          <section className="hero-grid">
            <article className="countdown-card">
              <div><p className="eyebrow">19 EYLÜL 2026</p><h2>Yarışa kalan</h2></div>
              <div className="countdown">
                <strong>{countdown.days}<span>gün</span></strong>
                <strong>{String(countdown.hours).padStart(2, "0")}<span>saat</span></strong>
                <strong>{String(countdown.minutes).padStart(2, "0")}<span>dk</span></strong>
              </div>
            </article>
            <article className="progress-card">
              <div className="progress-head"><div><p className="eyebrow">BUGÜN</p><h2>Antrenman ilerlemesi</h2></div><strong>{todayProgress}%</strong></div>
              <div className="progress-track"><span style={{ width: `${todayProgress}%` }} /></div>
              <p>{todayDone} / {today.items.length} bölüm tamamlandı</p>
            </article>
          </section>

          <section className="metric-strip">
            {weeklySummary.map((item) => <article key={item.label}><span>{item.label}</span><strong>{item.value}</strong></article>)}
          </section>

          <section className="coach-note">
            <div className="coach-avatar">M</div>
            <div><p className="eyebrow">MIKE’IN GÜNLÜK NOTU</p><p>Bugün hızdan önce kalite. Splitleri eşit tut, kızakta bel pozisyonunu bozma ve son bölümü güçlü bitir.</p></div>
          </section>

          <section className="week-preview">
            <div className="section-heading"><div><p className="eyebrow">BU HAFTA</p><h2>Program akışı</h2></div><span>{weekDone} / {weekItems.length} bölüm</span></div>
            <div className="day-cards">
              {weeklyProgram.map((day) => {
                const done = day.items.filter((item) => completed[item.id]).length;
                return <button className={day.key === getTodayKey() ? "day-card today" : "day-card"} key={day.key} onClick={() => openDay(day.key)}><span>{day.short}</span><strong>{day.theme}</strong><small>{done}/{day.items.length} tamamlandı</small></button>;
              })}
            </div>
          </section>

          <WorkoutPanel day={today} completed={completed} toggle={toggle} />
        </>
      )}

      {activeTab === "calendar" && (
        <section className="calendar-page">
          <div className="section-heading"><div><p className="eyebrow">SPRINT 2</p><h2>Haftalık takvim</h2></div><span>Yusuf Bezeng</span></div>
          <div className="calendar-tabs">
            {weeklyProgram.map((day) => <button key={day.key} className={selectedDay === day.key ? "active" : ""} onClick={() => setSelectedDay(day.key)}><span>{day.short}</span><small>{day.status === "recovery" ? "Toparlanma" : "Antrenman"}</small></button>)}
          </div>
          <WorkoutPanel day={currentDay} completed={completed} toggle={toggle} />
        </section>
      )}

      {activeTab === "tracking" && (
        <section className="tracking-page">
          <div className="section-heading"><div><p className="eyebrow">GÜNLÜK CHECK-IN</p><h2>Vücut ve toparlanma</h2></div><span>Veriler bu cihazda saklanır</span></div>
          <form className="tracking-form" onSubmit={saveMetrics}>
            <label>Tarih<input type="date" value={metrics.date} onChange={(event) => setMetrics({ ...metrics, date: event.target.value })} required /></label>
            <label>Kilo (kg)<input type="number" step="0.1" value={metrics.weight} onChange={(event) => setMetrics({ ...metrics, weight: event.target.value })} placeholder="Örn. 84.5" /></label>
            <label>Bel çevresi (cm)<input type="number" step="0.1" value={metrics.waist} onChange={(event) => setMetrics({ ...metrics, waist: event.target.value })} placeholder="Örn. 92" /></label>
            <label>Uyku (saat)<input type="number" step="0.1" min="0" max="24" value={metrics.sleep} onChange={(event) => setMetrics({ ...metrics, sleep: event.target.value })} placeholder="Örn. 7.5" /></label>
            <label>Uyku kalitesi (1–10)<input type="number" min="1" max="10" value={metrics.sleepQuality} onChange={(event) => setMetrics({ ...metrics, sleepQuality: event.target.value })} /></label>
            <label>Bel durumu (0–10)<input type="number" min="0" max="10" value={metrics.backPain} onChange={(event) => setMetrics({ ...metrics, backPain: event.target.value })} /></label>
            <label>Enerji (1–10)<input type="number" min="1" max="10" value={metrics.energy} onChange={(event) => setMetrics({ ...metrics, energy: event.target.value })} /></label>
            <button type="submit">KAYDI TAMAMLA</button>
            {savedMessage && <p className="save-message">{savedMessage}</p>}
          </form>

          <div className="history-section">
            <div className="section-heading"><div><p className="eyebrow">GEÇMİŞ</p><h2>Son kayıtlar</h2></div></div>
            {history.length === 0 ? <div className="empty-state">Henüz kayıt yok. İlk check-in’i yukarıdan ekle.</div> : history.slice(0, 8).map((entry) => (
              <article className="history-row" key={entry.date}>
                <strong>{new Date(`${entry.date}T12:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "short" })}</strong>
                <span>{entry.weight ? `${entry.weight} kg` : "Kilo —"}</span>
                <span>{entry.waist ? `${entry.waist} cm` : "Bel —"}</span>
                <span>{entry.sleep ? `${entry.sleep} saat` : "Uyku —"}</span>
                <span>Bel {entry.backPain || "—"}/10</span>
              </article>
            ))}
          </div>
        </section>
      )}

      <nav className="bottom-nav" aria-label="Ana menü">
        <button className={activeTab === "home" ? "active" : ""} onClick={() => setActiveTab("home")}><span>⌂</span>Ana Sayfa</button>
        <button className={activeTab === "calendar" ? "active" : ""} onClick={() => setActiveTab("calendar")}><span>◫</span>Takvim</button>
        <button disabled><span>↗</span>Koşu</button>
        <button className={activeTab === "tracking" ? "active" : ""} onClick={() => setActiveTab("tracking")}><span>＋</span>Kayıt</button>
      </nav>
    </main>
  );
}

function WorkoutPanel({ day, completed, toggle }: { day: (typeof weeklyProgram)[number]; completed: Record<string, boolean>; toggle: (id: string) => void }) {
  return (
    <section className="workout-section">
      <div className="section-heading"><div><p className="eyebrow">{day.label.toUpperCase()} · {day.dateLabel}</p><h2>{day.theme}</h2></div><span>{day.duration}</span></div>
      <div className="workout-list">
        {day.items.map((item, index) => {
          const isDone = Boolean(completed[item.id]);
          return <article className={`workout-item ${isDone ? "done" : ""}`} key={item.id}><button className="check-button" aria-label={`${item.title} tamamlandı`} aria-pressed={isDone} onClick={() => toggle(item.id)}>{isDone ? "✓" : index + 1}</button><div className="workout-copy"><span>{item.category}</span><h3>{item.title}</h3><p>{item.detail}</p></div><strong>{item.prescription}</strong></article>;
        })}
      </div>
    </section>
  );
}
