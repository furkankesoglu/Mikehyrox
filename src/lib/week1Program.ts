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
  "Güç hareketlerinde hız belirgin düşerse seti bitir",
  "Olimpik kaldırış önce; metcon sonra",
  "Ağır konsantrik squat ile yüksek hacimli eksantrik squat aynı güne yığılmaz",
  "Antrenman sonrası 5-10 dk yürüyüş",
];

export const week1Program: WeekDay[] = [
  {
    key: "monday",
    short: "Pzt",
    label: "Pazartesi",
    theme: "Toparlanma + Aerobik Taban",
    duration: "50-60 dk",
    exercises: [
      { id: "mon-warm", category: "ISINMA", title: "Assault Bike + Mobilite", target: "5 dk Assault Bike; Cat-Camel x10; World's Greatest Stretch x5; 90/90 Hip x10; Glute Bridge 2x15" },
      { id: "mon-bike", category: "AEROBİK", title: "Assault Bike Zone 2", target: "25-30 dk · RPE 4-5" },
      { id: "mon-core", category: "CORE", title: "McGill Core", target: "McGill Curl Up 3x8; Side Plank 3x20 sn; Bird Dog 3x8; Pallof Press 3x12" },
    ],
  },
  {
    key: "tuesday",
    short: "Sal",
    label: "Salı",
    theme: "Olimpik Güç + Konsantrik Kuvvet + Sled",
    duration: "80-95 dk",
    exercises: [
      { id: "tue-warm", category: "ISINMA", title: "Bike + Barbell Complex", target: "6-8 dk kolay bike + empty bar clean drill 2-3 tur" },
      { id: "tue-clean", category: "OLİMPİK GÜÇ", title: "Power Clean", target: "4x3 · yaklaşık %60-70 1RM · her tekrar hızlı", note: "Teknik bozulursa Hang Power Clean veya Clean Pull'a dön." },
      { id: "tue-jerk", category: "OLİMPİK GÜÇ", title: "Power Jerk", target: "4x2-3 · RPE 6-7", note: "Dip dik; belden hiper-ekstansiyon yok." },
      { id: "tue-pin", category: "KONSANTRİK KUVVET", title: "Concentric-only Pin Squat", target: "4x3 · dead-stop · RPE 7-8", note: "Ağır ama hızlı; failure yok. Pin yüksekliği paralel civarı." },
      { id: "tue-sled", category: "KOŞU GÜCÜ", title: "Resisted Sled Push", target: "6x15-20 m · güçlü ve hızlı itiş · tam dinlenme" },
      { id: "tue-burpee", category: "HYROX BURPEE", title: "Burpee Broad Jump Power Block", target: "5x5 tekrar veya 5x10-15 m · kalite odaklı · set arası 90-120 sn" },
      { id: "tue-carry", category: "HYROX", title: "Farmer Carry", target: "4x40 m" },
    ],
  },
  {
    key: "wednesday",
    short: "Çar",
    label: "Çarşamba",
    theme: "Zone 2 Koşu + Stride",
    duration: "50-65 dk",
    exercises: [
      { id: "wed-run", category: "KOŞU", title: "Rahat Koşu", target: "5-6 km · Zone 2" },
      { id: "wed-stride", category: "HIZ", title: "Strides", target: "4-6x15 sn kontrollü hızlı koşu · tam yürüyüş dinlenme", note: "Sprint değil; gevşek ve teknik." },
      { id: "wed-mob", category: "MOBİLİTE", title: "Koşu Sonrası Mobilite", target: "Hip Flexor; Piriformis; Calf; 90/90" },
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
      { id: "thu-press", category: "KUVVET", title: "Shoulder Press", target: "3x8 · kontrollü" },
      { id: "thu-pulldown", category: "KUVVET", title: "Lat Pulldown", target: "3x12" },
      { id: "thu-ski", category: "SKIERG", title: "SkiErg Teknik Intervaller", target: "6x250 m · teknik odaklı" },
    ],
  },
  {
    key: "friday",
    short: "Cum",
    label: "Cuma",
    theme: "Eksantrik Alt Vücut + HYROX Teknik",
    duration: "70-85 dk",
    exercises: [
      { id: "fri-ecc-squat", category: "EKSANTRİK KUVVET", title: "Eccentric Tempo Back Squat", target: "4x5 · 3 sn iniş + kontrollü dip + hızlı kalkış · RPE 6-7", note: "Amaç kontrol ve kaliteli eksantrik yük; aşırı yavaş tempo veya failure yok." },
      { id: "fri-bss", category: "TEK BACAK", title: "Bulgarian Split Squat", target: "3x8 / bacak" },
      { id: "fri-step", category: "KOŞU DESTEK", title: "Step Up", target: "3x8 / bacak · kontrollü iniş, güçlü kalkış" },
      { id: "fri-wall", category: "HYROX", title: "Wall Ball Teknik", target: "4x12-15 · ritim ve nefes" },
      { id: "fri-lunge", category: "HYROX", title: "Walking Lunge", target: "4x20 m · orta yük" },
      { id: "fri-row", category: "BİTİRİŞ", title: "Rahat Row", target: "1200-1500 m · RPE 5" },
    ],
  },
  {
    key: "saturday",
    short: "Cmt",
    label: "Cumartesi",
    theme: "HYROX Devresi + Burpee Ekonomisi",
    duration: "60-75 dk",
    exercises: [
      { id: "sat-tech", category: "TEKNİK", title: "Burpee Broad Jump Teknik", target: "3x10 m · düşük yorgunlukta uzun ve ekonomik ritim" },
      { id: "sat-circuit", category: "DEVRE", title: "3 Tur HYROX Devresi", target: "500 m Row + 15 Wall Ball + 20 m Lunge + 20 m Sled Push + 20 m Farmer Carry + 10 m Burpee Broad Jump; turlar arası 3 dk" },
      { id: "sat-easy", category: "AEROBİK", title: "Kolay Bike Soğuma", target: "15-20 dk Zone 2" },
    ],
  },
  {
    key: "sunday",
    short: "Paz",
    label: "Pazar",
    theme: "Tam Dinlenme",
    duration: "Dinlenme",
    exercises: [
      { id: "sun-rest", category: "TOPARLANMA", title: "Tam Dinlenme", target: "İsteğe bağlı 20-30 dk rahat yürüyüş + mobilite" },
    ],
  },
];
