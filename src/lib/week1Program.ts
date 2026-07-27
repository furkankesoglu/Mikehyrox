export type WeekExercise = {
  id: string;
  category: string;
  title: string;
  target: string;
  note?: string;
};

export type WeekDay = {
  key: string;
  short: string;
  label: string;
  theme: string;
  duration: string;
  exercises: WeekExercise[];
};

export const weekRules = [
  "Her gün McGill Big 3 + 10 dk mobilite",
  "Ağır deadlift yok",
  "Bel ağrısı 3/10'u geçerse yükü azalt",
  "Failure yok",
  "Her tekrarda bracing uygula",
  "Antrenman sonrası 5-10 dk yürüyüş",
];

export const week1Program: WeekDay[] = [
  {
    key: "monday",
    short: "Pzt",
    label: "Pazartesi",
    theme: "Zone 2 + Core",
    duration: "55-65 dk",
    exercises: [
      { id: "mon-warm", category: "ISINMA", title: "Assault Bike + Mobilite", target: "5 dk Assault Bike; Cat-Camel x10; World's Greatest Stretch x5; 90/90 Hip x10; Glute Bridge 2x15" },
      { id: "mon-bike", category: "AEROBİK", title: "Assault Bike Zone 2", target: "25 dk · RPE 4-5" },
      { id: "mon-core", category: "CORE", title: "McGill Core", target: "McGill Curl Up 3x8; Side Plank 3x20 sn; Bird Dog 3x8; Pallof Press 3x12" },
    ],
  },
  {
    key: "tuesday",
    short: "Sal",
    label: "Salı",
    theme: "Alt Vücut + Sled",
    duration: "75-90 dk",
    exercises: [
      { id: "tue-ski", category: "ISINMA", title: "Hafif SkiErg", target: "10 dk" },
      { id: "tue-squat", category: "KUVVET", title: "Back Squat", target: "4x6 · yaklaşık %60" },
      { id: "tue-bss", category: "KUVVET", title: "Bulgarian Split Squat", target: "3x8" },
      { id: "tue-rdl", category: "KUVVET", title: "Romanian Deadlift", target: "3x10 · hafif", note: "Bel nötr; ağrıda hareketi kes." },
      { id: "tue-step", category: "KUVVET", title: "Step Up", target: "3x10" },
      { id: "tue-sled", category: "HYROX", title: "Sled Push", target: "6x20 m · yarış ağırlığının yaklaşık %60'ı" },
      { id: "tue-carry", category: "HYROX", title: "Farmer Carry", target: "4x40 m" },
      { id: "tue-row", category: "BİTİRİŞ", title: "Rahat Row", target: "1500 m" },
    ],
  },
  {
    key: "wednesday",
    short: "Çar",
    label: "Çarşamba",
    theme: "Zone 2 Koşu",
    duration: "45-60 dk",
    exercises: [
      { id: "wed-run", category: "KOŞU", title: "Rahat Koşu", target: "6 km · Zone 2" },
      { id: "wed-mob", category: "MOBİLİTE", title: "Koşu Sonrası Mobilite", target: "Cobra; Child Pose; Hip Flexor Stretch; Piriformis Stretch" },
    ],
  },
  {
    key: "thursday",
    short: "Per",
    label: "Perşembe",
    theme: "Üst Vücut + SkiErg",
    duration: "65-80 dk",
    exercises: [
      { id: "thu-bench", category: "KUVVET", title: "Bench Press", target: "4x6" },
      { id: "thu-row", category: "KUVVET", title: "Chest Supported Row", target: "4x10" },
      { id: "thu-press", category: "KUVVET", title: "Shoulder Press", target: "3x10 · hafif" },
      { id: "thu-pulldown", category: "KUVVET", title: "Lat Pulldown", target: "3x12" },
      { id: "thu-ski", category: "SKIERG", title: "SkiErg Teknik Intervaller", target: "6x250 m · teknik odaklı" },
    ],
  },
  {
    key: "friday",
    short: "Cum",
    label: "Cuma",
    theme: "HYROX Devresi",
    duration: "55-70 dk",
    exercises: [
      { id: "fri-circuit", category: "DEVRE", title: "3 Tur HYROX Devresi", target: "500 m Row + 20 Wall Ball + 20 m Sandbag/DB Lunge + 20 m Sled Push + 20 m Farmer Carry; turlar arası 3 dk" },
    ],
  },
  {
    key: "saturday",
    short: "Cmt",
    label: "Cumartesi",
    theme: "Kombine Zone 2",
    duration: "60 dk",
    exercises: [
      { id: "sat-bike", category: "AEROBİK", title: "Assault Bike Zone 2", target: "30 dk" },
      { id: "sat-run", category: "KOŞU", title: "Zone 2 Koşu", target: "20 dk" },
      { id: "sat-mob", category: "MOBİLİTE", title: "Mobilite", target: "10 dk" },
    ],
  },
  {
    key: "sunday",
    short: "Paz",
    label: "Pazar",
    theme: "Tam Dinlenme",
    duration: "Dinlenme",
    exercises: [
      { id: "sun-rest", category: "TOPARLANMA", title: "Tam Dinlenme", target: "İsteğe bağlı 20 dk rahat yürüyüş" },
    ],
  },
];
