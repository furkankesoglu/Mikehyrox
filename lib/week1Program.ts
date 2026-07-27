export type InputKind = "weight" | "time" | "distance" | "reps" | "pace";

export type WeekExercise = {
  id: string;
  category: string;
  title: string;
  target: string;
  note?: string;
  inputs?: InputKind[];
};

export type WeekDay = {
  key: string;
  short: string;
  label: string;
  theme: string;
  duration: string;
  recovery?: boolean;
  exercises: WeekExercise[];
};

export const week1Program: WeekDay[] = [
  {
    key: "monday", short: "Pzt", label: "Pazartesi", theme: "Bel Dostu Motor + Core", duration: "50–60 dk",
    exercises: [
      { id: "mon-warm", category: "ISINMA", title: "Assault Bike + Mobilite", target: "5 dk bike · Cat-Camel 10 · World's Greatest Stretch 5 · 90/90 Hip 10 · Glute Bridge 2×15", inputs: ["time"] },
      { id: "mon-bike", category: "ZONE 2", title: "Assault Bike", target: "25 dk · RPE 4–5", inputs: ["time"] },
      { id: "mon-curl", category: "CORE", title: "McGill Curl Up", target: "3×8", inputs: ["reps"] },
      { id: "mon-side", category: "CORE", title: "Side Plank", target: "3×20 sn", inputs: ["time"] },
      { id: "mon-bird", category: "CORE", title: "Bird Dog", target: "3×8", inputs: ["reps"] },
      { id: "mon-pallof", category: "CORE", title: "Pallof Press", target: "3×12", inputs: ["weight", "reps"] },
    ],
  },
  {
    key: "tuesday", short: "Sal", label: "Salı", theme: "Alt Vücut + Sled", duration: "75–90 dk",
    exercises: [
      { id: "tue-ski", category: "ISINMA", title: "Hafif SkiErg", target: "10 dk", inputs: ["time", "distance"] },
      { id: "tue-squat", category: "KUVVET", title: "Back Squat", target: "4×6 · %60", inputs: ["weight", "reps"] },
      { id: "tue-bss", category: "KUVVET", title: "Bulgarian Split Squat", target: "3×8", inputs: ["weight", "reps"] },
      { id: "tue-rdl", category: "KUVVET", title: "Romanian Deadlift", target: "3×10 · Hafif", note: "Bel pozisyonunu koru; ağrı artarsa dur.", inputs: ["weight", "reps"] },
      { id: "tue-step", category: "KUVVET", title: "Step Up", target: "3×10", inputs: ["weight", "reps"] },
      { id: "tue-sled", category: "HYROX", title: "Sled Push", target: "6×20 m · %60 yarış ağırlığı", inputs: ["weight", "time", "distance"] },
      { id: "tue-carry", category: "HYROX", title: "Farmer Carry", target: "4×40 m", inputs: ["weight", "time", "distance"] },
      { id: "tue-row", category: "BİTİRİŞ", title: "Rahat Row", target: "1500 m", inputs: ["time", "distance", "pace"] },
    ],
  },
  {
    key: "wednesday", short: "Çar", label: "Çarşamba", theme: "Zone 2 Koşu", duration: "Koşu + mobilite",
    exercises: [
      { id: "wed-run", category: "KOŞU", title: "Rahat Koşu", target: "6 km · Zone 2", inputs: ["time", "distance", "pace"] },
      { id: "wed-mob", category: "MOBİLİTE", title: "Bel ve Kalça Mobilitesi", target: "Cobra · Child Pose · Hip Flexor Stretch · Piriformis Stretch", inputs: ["time"] },
    ],
  },
  {
    key: "thursday", short: "Per", label: "Perşembe", theme: "Üst Vücut + SkiErg", duration: "70–80 dk",
    exercises: [
      { id: "thu-bench", category: "KUVVET", title: "Bench Press", target: "4×6", inputs: ["weight", "reps"] },
      { id: "thu-row", category: "KUVVET", title: "Chest Supported Row", target: "4×10", inputs: ["weight", "reps"] },
      { id: "thu-press", category: "KUVVET", title: "Shoulder Press", target: "3×10 · Hafif", inputs: ["weight", "reps"] },
      { id: "thu-pull", category: "KUVVET", title: "Lat Pulldown", target: "3×12", inputs: ["weight", "reps"] },
      { id: "thu-ski", category: "SKIERG", title: "Teknik Interval", target: "6×250 m", note: "Teknik ve ritim öncelikli.", inputs: ["time", "distance", "pace"] },
    ],
  },
  {
    key: "friday", short: "Cum", label: "Cuma", theme: "HYROX Devresi", duration: "3 tur",
    exercises: [
      { id: "fri-row", category: "DEVRE", title: "Row", target: "500 m × 3", inputs: ["time", "distance", "pace"] },
      { id: "fri-wall", category: "DEVRE", title: "Wall Ball", target: "20 tekrar × 3", inputs: ["weight", "reps"] },
      { id: "fri-lunge", category: "DEVRE", title: "DB Ense Lunge", target: "20 m × 3", note: "Sandbag alternatifi.", inputs: ["weight", "time", "distance"] },
      { id: "fri-sled", category: "DEVRE", title: "Sled Push", target: "20 m × 3", inputs: ["weight", "time", "distance"] },
      { id: "fri-carry", category: "DEVRE", title: "Farmer Carry", target: "20 m × 3", inputs: ["weight", "time", "distance"] },
      { id: "fri-rest", category: "DİNLENME", title: "Tur Arası Dinlenme", target: "3 dk", inputs: ["time"] },
    ],
  },
  {
    key: "saturday", short: "Cmt", label: "Cumartesi", theme: "Uzun Aerobik Kombinasyon", duration: "60 dk",
    exercises: [
      { id: "sat-bike", category: "ZONE 2", title: "Assault Bike", target: "30 dk", inputs: ["time"] },
      { id: "sat-run", category: "ZONE 2", title: "Koşu", target: "20 dk", inputs: ["time", "distance", "pace"] },
      { id: "sat-mob", category: "MOBİLİTE", title: "Mobilite", target: "10 dk", inputs: ["time"] },
    ],
  },
  {
    key: "sunday", short: "Paz", label: "Pazar", theme: "Tam Dinlenme", duration: "Dinlenme", recovery: true,
    exercises: [
      { id: "sun-rest", category: "TOPARLANMA", title: "Tam Dinlenme", target: "İsteğe bağlı 20 dk yürüyüş", inputs: ["time", "distance"] },
    ],
  },
];

export const weekRules = [
  "Her gün McGill Big 3 + 10 dk mobilite.",
  "Ağır deadlift yok.",
  "Bel ağrısı 3/10'u geçerse yükü azalt.",
  "Failure yok.",
  "Her tekrarda bracing uygula.",
  "Antrenman sonrası 5–10 dk yürüyüş.",
];
