"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { todayWorkout } from "@/lib/workout";

const AUTH_KEY = "mike-authenticated";
const COMPLETION_KEY = "mike-workout-completion-v1";
const RACE_DATE = new Date("2026-09-19T09:00:00+03:00");

function getCountdown() {
  const diff = Math.max(0, RACE_DATE.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
  };
}

export default function MikeApp() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    setAuthenticated(localStorage.getItem(AUTH_KEY) === "true");
    const saved = localStorage.getItem(COMPLETION_KEY);
    if (saved) {
      try {
        setCompleted(JSON.parse(saved));
      } catch {
        localStorage.removeItem(COMPLETION_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(getCountdown()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const doneCount = useMemo(
    () => todayWorkout.filter((item) => completed[item.id]).length,
    [completed],
  );
  const progress = Math.round((doneCount / todayWorkout.length) * 100);

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const expectedPin = process.env.NEXT_PUBLIC_MIKE_PIN;
    if (!expectedPin) {
      setError("Sistem PIN’i henüz yapılandırılmadı.");
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

  function toggle(id: string) {
    const next = { ...completed, [id]: !completed[id] };
    setCompleted(next);
    localStorage.setItem(COMPLETION_KEY, JSON.stringify(next));
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setPin("");
  }

  if (!ready) return <main className="loading">MIKE hazırlanıyor...</main>;

  if (!authenticated) {
    return (
      <main className="login-shell">
        <section className="login-card">
          <div className="brand-mark">M</div>
          <p className="eyebrow">HYROX PERFORMANCE SYSTEM</p>
          <h1>MIKE</h1>
          <p className="login-copy">Yusuf Bezeng için 19 Eylül’e kadar kişisel yarış hazırlığı.</p>
          <form onSubmit={login}>
            <label htmlFor="pin">Kişisel PIN</label>
            <input
              id="pin"
              inputMode="numeric"
              autoComplete="current-password"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              placeholder="••••"
              maxLength={8}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit">SİSTEME GİR</button>
          </form>
          <span className="login-hint">Yalnızca Yusuf Bezeng için kişisel erişim</span>
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

      <section className="hero-grid">
        <article className="countdown-card">
          <div>
            <p className="eyebrow">19 EYLÜL 2026</p>
            <h2>Yarışa kalan</h2>
          </div>
          <div className="countdown">
            <strong>{countdown.days}<span>gün</span></strong>
            <strong>{String(countdown.hours).padStart(2, "0")}<span>saat</span></strong>
            <strong>{String(countdown.minutes).padStart(2, "0")}<span>dk</span></strong>
          </div>
        </article>

        <article className="progress-card">
          <div className="progress-head">
            <div>
              <p className="eyebrow">BUGÜN</p>
              <h2>Antrenman ilerlemesi</h2>
            </div>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
          <p>{doneCount} / {todayWorkout.length} bölüm tamamlandı</p>
        </article>
      </section>

      <section className="coach-note">
        <div className="coach-avatar">M</div>
        <div>
          <p className="eyebrow">MIKE’IN GÜNLÜK NOTU</p>
          <p>Bugün hız kovalamıyoruz. Koşu splitlerini eşit tut, kızakta bel pozisyonunu bozma. Güçlü bitir.</p>
        </div>
      </section>

      <section className="workout-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PAZARTESİ · BUILD DAY</p>
            <h2>Günün antrenmanı</h2>
          </div>
          <span>Yaklaşık 75 dk</span>
        </div>

        <div className="workout-list">
          {todayWorkout.map((item, index) => {
            const isDone = Boolean(completed[item.id]);
            return (
              <article className={`workout-item ${isDone ? "done" : ""}`} key={item.id}>
                <button
                  className="check-button"
                  aria-label={`${item.title} tamamlandı`}
                  aria-pressed={isDone}
                  onClick={() => toggle(item.id)}
                >
                  {isDone ? "✓" : index + 1}
                </button>
                <div className="workout-copy">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
                <strong>{item.prescription}</strong>
              </article>
            );
          })}
        </div>
      </section>

      <nav className="bottom-nav" aria-label="Ana menü">
        <button className="active"><span>⌂</span>Ana Sayfa</button>
        <button><span>◫</span>Takvim</button>
        <button><span>↗</span>Koşu</button>
        <button><span>＋</span>Kayıt</button>
      </nav>
    </main>
  );
}
