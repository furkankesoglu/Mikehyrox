import { AthleteLevel, stations } from "./hyroxKnowledge";

export type ExerciseResult = {
  stationId?: string;
  status: "complete" | "partial" | "skipped" | "pending";
  rpe?: number;
  painBefore?: number;
  painAfter?: number;
  targetValue?: number;
  actualValue?: number;
};

export type ReadinessInput = {
  averageSleep: number;
  averageSleepQuality: number;
  averageEnergy: number;
  averageBackPain: number;
  adherence: number;
  neurologicalSymptoms?: boolean;
};

export type ProgressionDecision = "progress" | "hold" | "reduce" | "replace" | "medical-review";

export type EngineDecision = {
  decision: ProgressionDecision;
  volumeMultiplier: number;
  intensityMultiplier: number;
  reasons: string[];
  constraints: string[];
};

export type AthleteProfile = {
  name: string;
  heightCm: number;
  weightKg: number;
  level: AthleteLevel;
  seriousBackInjuryHistory: boolean;
  division: "men-open" | "men-pro";
};

export const yusufProfile: AthleteProfile = {
  name: "Yusuf Bezeng",
  heightCm: 183,
  weightKg: 91,
  level: "return",
  seriousBackInjuryHistory: true,
  division: "men-open",
};

function avg(values: number[]) {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

export function decideWeeklyLoad(readiness: ReadinessInput, results: ExerciseResult[]): EngineDecision {
  const reasons: string[] = [];
  const constraints: string[] = [];

  if (readiness.neurologicalSymptoms) {
    return {
      decision: "medical-review",
      volumeMultiplier: 0,
      intensityMultiplier: 0,
      reasons: ["Nörolojik alarm bulgusu bildirildi."],
      constraints: ["Yeni program üretilmez; sağlık profesyoneli değerlendirmesi gerekir."],
    };
  }

  const painValues = results.map((r) => r.painAfter || 0).filter(Boolean);
  const avgPain = painValues.length ? avg(painValues) : readiness.averageBackPain;
  const maxPain = Math.max(readiness.averageBackPain, ...results.map((r) => r.painAfter || 0));
  const completed = results.filter((r) => r.status === "complete").length;
  const partial = results.filter((r) => r.status === "partial").length;
  const scoredAdherence = results.length ? ((completed + partial * 0.5) / results.length) * 100 : readiness.adherence;
  const rpes = results.map((r) => r.rpe || 0).filter(Boolean);
  const avgRpe = rpes.length ? avg(rpes) : 0;

  if (maxPain > 5) {
    reasons.push("Bel ağrısı 5/10 üzerinde.");
    constraints.push("Yüksek riskli hinge, sled ve yüklü lunge çıkarılır.");
    constraints.push("Sadece ağrısız aerobik, yürüyüş ve klinik olarak tolere edilen stabilizasyon seçenekleri kullanılır.");
    return { decision: "replace", volumeMultiplier: 0.6, intensityMultiplier: 0.5, reasons, constraints };
  }

  if (maxPain > 3 || avgPain > 3) {
    reasons.push("Bel ağrısı güvenlik eşiğini aştı.");
    constraints.push("Yük/mesafe/yoğunluk %20–40 azaltılır.");
    constraints.push("Sled, RDL ve yüklü lunge yalnız ağrısız varyasyonla yapılır.");
    return { decision: "reduce", volumeMultiplier: 0.7, intensityMultiplier: 0.7, reasons, constraints };
  }

  if (readiness.averageSleep < 6 || readiness.averageEnergy < 5 || scoredAdherence < 60) {
    if (readiness.averageSleep < 6) reasons.push("Ortalama uyku 6 saatin altında.");
    if (readiness.averageEnergy < 5) reasons.push("Ortalama enerji düşük.");
    if (scoredAdherence < 60) reasons.push("Haftalık uyum %60'ın altında.");
    constraints.push("Yeni yoğunluk eklenmez; temel hafta sadeleştirilerek tekrar edilir.");
    return { decision: "reduce", volumeMultiplier: 0.8, intensityMultiplier: 0.85, reasons, constraints };
  }

  if (scoredAdherence >= 85 && avgRpe > 0 && avgRpe <= 7 && maxPain <= 2 && readiness.averageSleep >= 7) {
    reasons.push("Yüksek uyum, yönetilebilir RPE, iyi uyku ve düşük ağrı birlikte sağlandı.");
    constraints.push("Aynı hafta yalnız bir ana değişken artırılır.");
    constraints.push("Dönüş seviyesinde artış %5–8 ile sınırlandırılır.");
    return { decision: "progress", volumeMultiplier: 1.06, intensityMultiplier: 1.04, reasons, constraints };
  }

  reasons.push("Performans kabul edilebilir fakat net progresyon koşulları tam karşılanmadı.");
  constraints.push("Hacim ve yoğunluk korunur; teknik kalite ve veri toplama sürdürülür.");
  return { decision: "hold", volumeMultiplier: 1, intensityMultiplier: 1, reasons, constraints };
}

export function decideExerciseProgression(result: ExerciseResult) {
  const station = result.stationId ? stations.find((s) => s.id === result.stationId) : undefined;
  const pain = result.painAfter || 0;
  const rpe = result.rpe || 0;

  if (pain > 5) return { decision: "replace" as const, change: "Ağrısız regresyona geç veya hareketi çıkar.", station };
  if (pain > 3) return { decision: "reduce" as const, change: "Yük/mesafe/yoğunluğu %20–40 azalt.", station };
  if (result.status === "skipped") return { decision: "hold" as const, change: "Seviyeyi artırma; kaçırılma nedenine göre aynı dozu yeniden planla.", station };
  if (result.status === "partial" || rpe >= 9) return { decision: "hold" as const, change: "Aynı hedefi koru veya seti küçük parçalara böl.", station };
  if (result.status === "complete" && rpe > 0 && rpe <= 7 && pain <= 2) return { decision: "progress" as const, change: "Tek değişkende %5–8 kontrollü artış yap.", station };
  return { decision: "hold" as const, change: "Aynı dozda teknik ve veri kalitesini geliştir.", station };
}

export function phaseForWeeksToRace(weeks: number) {
  if (weeks <= 1) return { phase: "race-week", focus: "Tazelik, kısa aktivasyon, yeni uyaran yok." };
  if (weeks <= 3) return { phase: "peak", focus: "Yarış pacing'i, kısa özgül bloklar, hacim azaltma." };
  if (weeks <= 8) return { phase: "specific", focus: "Compromised running, istasyon splitleri, kontrollü simülasyon." };
  return { phase: "base", focus: "Aerobik taban, temel kuvvet, ağrısız hareket kalitesi." };
}
