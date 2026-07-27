"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { week1Program, weekRules, WeekExercise } from "@/lib/week1Program";
import styles from "./MikeWeek1App.module.css";

const AUTH_KEY = "mike-authenticated";
const LOG_KEY = "mike-yusuf-week1-logs-v1";
const CHECKIN_KEY = "mike-yusuf-checkins-v2";
const RACE_DATE = new Date("2026-09-19T09:00:00+03:00");

type ExerciseLog = {
  status: "pending" | "complete" | "partial" | "skipped";
  weight: string;
  time: string;
  distance: string;
  reps: string;
  pace: string;
  rpe: string;
  painBefore: string;
  painAfter: string;
  note: string;
};

type Checkin = {
  date: string;
  weight: string;
  waist: string;
  sleep: string;
  sleepQuality: string;
  energy: string;
  backPain: string;
};

const emptyLog: ExerciseLog = { status: "pending", weight: "", time: "", distance: "", reps: "", pace: "", rpe: "", painBefore: "", painAfter: "", note: "" };
const emptyCheckin: Checkin = { date: new Date().toISOString().slice(0, 10), weight: "", waist: "", sleep: "", sleepQuality: "", energy: "", backPain: "" };

function todayKey() {
  return ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][new Date().getDay()];
}

function countdown() {
  const diff = Math.max(0, RACE_DATE.getTime() - Date.now());
  return { days: Math.floor(diff / 86400000), hours: Math.floor((diff / 3600000) % 24), minutes: Math.floor((diff / 60000) % 60) };
}

export default function MikeWeek1App() {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"home" | "program" | "checkin">("home");
  const [dayKey, setDayKey] = useState(todayKey());
  const [logs, setLogs] = useState<Record<string, ExerciseLog>>({});
  const [checkin, setCheckin] = useState<Checkin>(emptyCheckin);
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [clock, setClock] = useState(countdown());
  const [message, setMessage] = useState("");

  useEffect(() => {
    setAuthenticated(localStorage.getItem(AUTH_KEY) === "true");
    try { setLogs(JSON.parse(localStorage.getItem(LOG_KEY) || "{}")); } catch { localStorage.removeItem(LOG_KEY); }
    try { setCheckins(JSON.parse(localStorage.getItem(CHECKIN_KEY) || "[]")); } catch { localStorage.removeItem(CHECKIN_KEY); }
    setReady(true);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setClock(countdown()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const selectedDay = week1Program.find((day) => day.key === dayKey) || week1Program[0];
  const allExercises = week1Program.flatMap((day) => day.exercises);
  const completed = allExercises.filter((exercise) => logs[exercise.id]?.status === "complete").length;
  const partial = allExercises.filter((exercise) => logs[exercise.id]?.status === "partial").length;
  const adherence = Math.round(((completed + partial * 0.5) / allExercises.length) * 100);
  const latest = checkins[0];
  const painAlert = Object.values(logs).some((log) => Number(log.painAfter) > 3) || Number(checkin.backPain) > 3;

  const dayProgress = useMemo(() => {
    const score = selectedDay.exercises.reduce((sum, exercise) => {
      const status = logs[exercise.id]?.status;
      return sum + (status === "complete" ? 1 : status === "partial" ? 0.5 : 0);
    }, 0);
    return Math.round((score / selectedDay.exercises.length) * 100);
  }, [logs, selectedDay]);

  function login(event: FormEvent) {
    event.preventDefault();
    const expected = process.env.NEXT_PUBLIC_MIKE_PIN;
    if (!expected) return setError("Sistem PIN'i Vercel'de tanımlanmamış.");
    if (pin !== expected) return setError("PIN doğru değil.");
    localStorage.setItem(AUTH_KEY, "true");
    setAuthenticated(true);
    setError("");
  }

  function updateLog(id: string, patch: Partial<ExerciseLog>) {
    const next = { ...logs, [id]: { ...(logs[id] || emptyLog), ...patch } };
    setLogs(next);
    localStorage.setItem(LOG_KEY, JSON.stringify(next));
  }

  function saveCheckin(event: FormEvent) {
    event.preventDefault();
    const next = [checkin, ...checkins.filter((item) => item.date !== checkin.date)];
    setCheckins(next);
    localStorage.setItem(CHECKIN_KEY, JSON.stringify(next));
    setMessage("Günlük check-in kaydedildi.");
    window.setTimeout(() => setMessage(""), 2500);
  }

  if (!ready) return <main className={styles.loading}>MIKE hazırlanıyor...</main>;

  if (!authenticated) return (
    <main className={styles.loginShell}>
      <form className={styles.loginCard} onSubmit={login}>
        <div className={styles.logo}>M</div>
        <p className={styles.eyebrow}>YUSUF BEZENG · HYROX PERFORMANCE</p>
        <h1>MIKE</h1>
        <p>19 Eylül yolculuğunda her antrenmanı kaydet, sonraki haftayı verilerin şekillendirsin.</p>
        <label>Kişisel PIN<input value={pin} onChange={(e) => setPin(e.target.value)} inputMode="numeric" type="password" /></label>
        {error && <span className={styles.error}>{error}</span>}
        <button type="submit">SİSTEME GİR</button>
      </form>
    </main>
  );

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div><p className={styles.eyebrow}>MIKE · HAFTA 1</p><h1>Günaydın, Yusuf.</h1></div>
        <button className={styles.ghost} onClick={() => { localStorage.removeItem(AUTH_KEY); setAuthenticated(false); }}>Çıkış</button>
      </header>

      {painAlert && <div className={styles.alert}><strong>Bel uyarısı:</strong> Ağrı 3/10 üzerine çıktı. Yükü azalt, hareketi ağrısız varyasyona çevir veya antrenmanı sonlandır.</div>}

      {tab === "home" && <>
        <section className={styles.hero}>
          <article><p className={styles.eyebrow}>19 EYLÜL 2026</p><h2>Yarışa kalan</h2><div className={styles.count}><strong>{clock.days}<span>gün</span></strong><strong>{clock.hours}<span>saat</span></strong><strong>{clock.minutes}<span>dk</span></strong></div></article>
          <article><p className={styles.eyebrow}>HAFTA 1 UYUMU</p><h2>{adherence}%</h2><div className={styles.progress}><span style={{ width: `${adherence}%` }} /></div><p>{completed} tamamlandı · {partial} kısmi</p></article>
        </section>
        <section className={styles.metrics}>
          <article><span>Son kilo</span><strong>{latest?.weight ? `${latest.weight} kg` : "—"}</strong></article>
          <article><span>Son bel</span><strong>{latest?.waist ? `${latest.waist} cm` : "—"}</strong></article>
          <article><span>Son uyku</span><strong>{latest?.sleep ? `${latest.sleep} saat` : "—"}</strong></article>
          <article><span>Bel durumu</span><strong>{latest?.backPain ? `${latest.backPain}/10` : "—"}</strong></article>
        </section>
        <section className={styles.note}><div className={styles.logo}>M</div><div><p className={styles.eyebrow}>MIKE'IN NOTU</p><p>Bu hafta amaç kendini zorlamak değil; ağrısız ve kaliteli hareketle sağlam temel oluşturmak.</p></div></section>
        <section className={styles.rules}><p className={styles.eyebrow}>HAFTA 1 KURALLARI</p><div>{weekRules.map((rule) => <span key={rule}>✓ {rule}</span>)}</div></section>
        <DayPanel day={selectedDay} logs={logs} updateLog={updateLog} progress={dayProgress} />
      </>}

      {tab === "program" && <section>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>BEL DOSTU GERİ DÖNÜŞ</p><h2>1. Hafta Programı</h2></div><strong>{dayProgress}%</strong></div>
        <div className={styles.dayTabs}>{week1Program.map((day) => <button key={day.key} className={day.key === dayKey ? styles.activeDay : ""} onClick={() => setDayKey(day.key)}><span>{day.short}</span><small>{day.theme}</small></button>)}</div>
        <DayPanel day={selectedDay} logs={logs} updateLog={updateLog} progress={dayProgress} />
      </section>}

      {tab === "checkin" && <section>
        <div className={styles.sectionHead}><div><p className={styles.eyebrow}>TOPARLANMA VERİLERİ</p><h2>Günlük Check-in</h2></div></div>
        <form className={styles.checkin} onSubmit={saveCheckin}>
          <label>Tarih<input type="date" value={checkin.date} onChange={(e) => setCheckin({ ...checkin, date: e.target.value })} /></label>
          <label>Kilo (kg)<input type="number" step="0.1" value={checkin.weight} onChange={(e) => setCheckin({ ...checkin, weight: e.target.value })} /></label>
          <label>Bel (cm)<input type="number" step="0.1" value={checkin.waist} onChange={(e) => setCheckin({ ...checkin, waist: e.target.value })} /></label>
          <label>Uyku (saat)<input type="number" step="0.1" value={checkin.sleep} onChange={(e) => setCheckin({ ...checkin, sleep: e.target.value })} /></label>
          <label>Uyku kalitesi<input type="number" min="1" max="10" value={checkin.sleepQuality} onChange={(e) => setCheckin({ ...checkin, sleepQuality: e.target.value })} /></label>
          <label>Enerji<input type="number" min="1" max="10" value={checkin.energy} onChange={(e) => setCheckin({ ...checkin, energy: e.target.value })} /></label>
          <label>Bel ağrısı<input type="number" min="0" max="10" value={checkin.backPain} onChange={(e) => setCheckin({ ...checkin, backPain: e.target.value })} /></label>
          <button type="submit">CHECK-IN KAYDET</button>{message && <p>{message}</p>}
        </form>
        <div className={styles.history}>{checkins.slice(0, 7).map((item) => <article key={item.date}><strong>{item.date}</strong><span>{item.weight || "—"} kg</span><span>{item.sleep || "—"} saat uyku</span><span>Bel {item.backPain || "—"}/10</span></article>)}</div>
      </section>}

      <nav className={styles.nav}>
        <button className={tab === "home" ? styles.activeNav : ""} onClick={() => setTab("home")}>⌂<span>Ana Sayfa</span></button>
        <button className={tab === "program" ? styles.activeNav : ""} onClick={() => setTab("program")}>◫<span>Program</span></button>
        <button className={tab === "checkin" ? styles.activeNav : ""} onClick={() => setTab("checkin")}>＋<span>Check-in</span></button>
      </nav>
    </main>
  );
}

function DayPanel({ day, logs, updateLog, progress }: { day: (typeof week1Program)[number]; logs: Record<string, ExerciseLog>; updateLog: (id: string, patch: Partial<ExerciseLog>) => void; progress: number }) {
  return <section className={styles.dayPanel}>
    <div className={styles.sectionHead}><div><p className={styles.eyebrow}>{day.label.toUpperCase()}</p><h2>{day.theme}</h2><span>{day.duration}</span></div><strong>{progress}%</strong></div>
    <div className={styles.exerciseList}>{day.exercises.map((exercise, index) => <ExerciseCard key={exercise.id} exercise={exercise} index={index} log={logs[exercise.id] || emptyLog} update={(patch) => updateLog(exercise.id, patch)} />)}</div>
  </section>;
}

function ExerciseCard({ exercise, index, log, update }: { exercise: WeekExercise; index: number; log: ExerciseLog; update: (patch: Partial<ExerciseLog>) => void }) {
  const labels: Record<string, string> = { weight: "Ağırlık (kg)", time: "Süre", distance: "Mesafe", reps: "Gerçek tekrar/set", pace: "Tempo / split" };
  return <article className={styles.exercise}>
    <div className={styles.exerciseTop}><div className={styles.number}>{log.status === "complete" ? "✓" : index + 1}</div><div><span>{exercise.category}</span><h3>{exercise.title}</h3><p>{exercise.target}</p>{exercise.note && <small>{exercise.note}</small>}</div></div>
    <div className={styles.statuses}>{(["complete", "partial", "skipped"] as const).map((status) => <button key={status} className={log.status === status ? styles.selectedStatus : ""} onClick={() => update({ status })}>{status === "complete" ? "Tamamlandı" : status === "partial" ? "Kısmi" : "Atlandı"}</button>)}</div>
    <div className={styles.logGrid}>{exercise.inputs?.map((input) => <label key={input}>{labels[input]}<input value={log[input]} onChange={(e) => update({ [input]: e.target.value })} /></label>)}<label>RPE<input type="number" min="1" max="10" value={log.rpe} onChange={(e) => update({ rpe: e.target.value })} /></label><label>Bel önce<input type="number" min="0" max="10" value={log.painBefore} onChange={(e) => update({ painBefore: e.target.value })} /></label><label>Bel sonra<input type="number" min="0" max="10" value={log.painAfter} onChange={(e) => update({ painAfter: e.target.value })} /></label></div>
    <label className={styles.noteInput}>Yusuf'un notu<textarea value={log.note} onChange={(e) => update({ note: e.target.value })} placeholder="Teknik, tempo, ağrı veya his..." /></label>
  </article>;
}
