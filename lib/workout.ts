export type WorkoutItem = {
  id: string;
  category: string;
  title: string;
  prescription: string;
  detail: string;
};

export const todayWorkout: WorkoutItem[] = [
  {
    id: "warmup-bike",
    category: "ISINMA",
    title: "Assault Bike",
    prescription: "8 dakika",
    detail: "Rahat başla, son 2 dakikada ritmi yükselt.",
  },
  {
    id: "run-interval",
    category: "KOŞU",
    title: "1 km Tekrarları",
    prescription: "4 × 1 km",
    detail: "RPE 7/10 · Tekrarlar arası 2 dakika yürüyüş.",
  },
  {
    id: "ski-erg",
    category: "İSTASYON",
    title: "SkiErg",
    prescription: "4 × 500 m",
    detail: "Kontrollü ve eşit split. Dinlenme 90 saniye.",
  },
  {
    id: "sled-push",
    category: "KUVVET",
    title: "Sled Push",
    prescription: "6 × 15 m",
    detail: "Teknik bozulmadan güçlü ve kesintisiz itiş.",
  },
  {
    id: "wall-ball",
    category: "BİTİRİCİ",
    title: "Wall Ball",
    prescription: "5 × 15 tekrar",
    detail: "6 kg · Setler arası 60 saniye.",
  },
];
