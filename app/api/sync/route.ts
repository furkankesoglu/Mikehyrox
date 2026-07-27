import { NextRequest, NextResponse } from "next/server";

const ATHLETE_KEY = "yusuf-bezeng";

function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

async function supabase(path: string, init?: RequestInit) {
  const cfg = config();
  if (!cfg) throw new Error("SUPABASE_NOT_CONFIGURED");
  const response = await fetch(`${cfg.url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`SUPABASE_${response.status}: ${detail}`);
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function GET() {
  if (!config()) return NextResponse.json({ configured: false });
  try {
    const [workouts, checkins, programs] = await Promise.all([
      supabase(`workout_sessions?athlete_key=eq.${ATHLETE_KEY}&select=*&order=created_at.desc`),
      supabase(`daily_checkins?athlete_key=eq.${ATHLETE_KEY}&select=*&order=checkin_date.desc`),
      supabase(`weekly_programs?athlete_key=eq.${ATHLETE_KEY}&select=*&order=week_number.desc`),
    ]);
    let activeWeek: number | null = null;
    try {
      const profiles = await supabase(`athlete_profiles?athlete_key=eq.${ATHLETE_KEY}&select=active_week&limit=1`);
      activeWeek = Number(profiles?.[0]?.active_week) || null;
    } catch {}
    return NextResponse.json({ configured: true, workouts, checkins, programs, activeWeek });
  } catch (error) {
    return NextResponse.json({ configured: true, error: error instanceof Error ? error.message : "Sync error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!config()) return NextResponse.json({ configured: false });
  try {
    const body = await request.json();
    if (body.type === "workout") {
      const item = body.data;
      const filter = `athlete_key=eq.${ATHLETE_KEY}&week_number=eq.${item.week}&workout_date=eq.${item.date}&day_key=eq.${item.dayKey}`;
      await supabase(`workout_sessions?${filter}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      await supabase("workout_sessions", {
        method: "POST",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ athlete_key: ATHLETE_KEY, week_number: item.week, workout_date: item.date, day_key: item.dayKey, day_label: item.dayLabel, theme: item.theme, exercises: item.exercises, updated_at: new Date().toISOString() }),
      });
    } else if (body.type === "checkin") {
      const item = body.data;
      await supabase("daily_checkins?on_conflict=athlete_key,checkin_date", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ athlete_key: ATHLETE_KEY, checkin_date: item.date, weight_kg: item.weight || null, waist_cm: item.waist || null, sleep_hours: item.sleep || null, sleep_quality: item.sleepQuality || null, energy: item.energy || null, back_pain: item.backPain || null }),
      });
    } else if (body.type === "program") {
      const item = body.data;
      await supabase("weekly_programs?on_conflict=athlete_key,week_number,status", {
        method: "POST",
        headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ athlete_key: ATHLETE_KEY, week_number: item.weekNumber, title: item.title, rationale: item.rationale, status: item.status, program: item.days, approved_at: item.status === "approved" ? new Date().toISOString() : null }),
      });
    } else if (body.type === "activeWeek") {
      const week = Number(body.data?.week);
      if (!Number.isInteger(week) || week < 1) return NextResponse.json({ error: "Invalid week" }, { status: 400 });
      await supabase(`athlete_profiles?athlete_key=eq.${ATHLETE_KEY}`, {
        method: "PATCH",
        headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ active_week: week, updated_at: new Date().toISOString() }),
      });
    } else if (body.type === "deleteWeek") {
      const week = Number(body.data?.week);
      if (!Number.isInteger(week) || week <= 1) return NextResponse.json({ error: "Week 1 cannot be deleted" }, { status: 400 });
      await Promise.all([
        supabase(`weekly_programs?athlete_key=eq.${ATHLETE_KEY}&week_number=eq.${week}`, { method: "DELETE", headers: { Prefer: "return=minimal" } }),
        supabase(`workout_sessions?athlete_key=eq.${ATHLETE_KEY}&week_number=eq.${week}`, { method: "DELETE", headers: { Prefer: "return=minimal" } }),
      ]);
    } else {
      return NextResponse.json({ error: "Unknown sync type" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, configured: true });
  } catch (error) {
    return NextResponse.json({ configured: true, error: error instanceof Error ? error.message : "Sync error" }, { status: 500 });
  }
}
