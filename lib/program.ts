export type ProgramItem = {
  id: string;
  category: string;
  title: string;
  detail: string;
  prescription: string;
};

export type ProgramDay = {
  key: string;
  short: string;
  label: string;
  dateLabel: string;
  theme: string;
  duration: string;
  status: "training" | "recovery";
  items: ProgramItem[];
};

export const weeklyProgram: ProgramDay[] = [
  {
    key: "monday",
    short: "Pzt",
    label: "Pazartesi",
    dateLabel: "BUILD DAY",
    theme: "Alt vücut kuvveti + motor",
    duration: "75 dk",
    status: "training",
    items: [
      { id: "mon-warm", category: "ISINMA", title: "Assault Bike", detail: "Rahat tempo, son 2 dakika kademeli hızlan.", prescription: "8 dk" },
      { id: "mon-trap", category: "KUVVET", title: "Trap Bar Deadlift", detail: "Teknik bozulmadan kontrollü tekrarlar.", prescription: "4 × 6" },
      { id: "mon-sled", category: "HYROX", title: "Sled Push + Pull", detail: "20 m itiş, 20 m çekiş. Bel pozisyonunu koru.", prescription: "4 tur" },
      { id: "mon-run", category: "KOŞU", title: "1 km Kontrollü Tekrar", detail: "Her tekrar aynı split, aralarda 2 dk yürüme.", prescription: "3 × 1 km" },
      { id: "mon-core", category: "CORE", title: "Dead Bug + Side Plank", detail: "Nefes ve gövde kontrolü odaklı.", prescription: "3 tur" },
    ],
  },
  {
    key: "tuesday",
    short: "Sal",
    label: "Salı",
    dateLabel: "ENGINE DAY",
    theme: "Aerobik taban + ergometre",
    duration: "65 dk",
    status: "training",
    items: [
      { id: "tue-run", category: "KOŞU", title: "Zone 2 Koşu", detail: "Konuşma temposunda, nabız kontrolüyle.", prescription: "35 dk" },
      { id: "tue-ski", category: "SKIERG", title: "SkiErg Teknik", detail: "Ritmi bozmadan güçlü kalça kapanışı.", prescription: "5 × 500 m" },
      { id: "tue-upper", category: "KUVVET", title: "Üst Gövde Devresi", detail: "DB press, cable row, shoulder carry.", prescription: "4 tur" },
    ],
  },
  {
    key: "wednesday",
    short: "Çar",
    label: "Çarşamba",
    dateLabel: "RECOVERY",
    theme: "Aktif toparlanma + mobilite",
    duration: "40 dk",
    status: "recovery",
    items: [
      { id: "wed-spin", category: "TOPARLANMA", title: "Spin Bike", detail: "Çok rahat tempo, bacakları aç.", prescription: "25 dk" },
      { id: "wed-mob", category: "MOBİLİTE", title: "Kalça + Ayak Bileği", detail: "Ağrısız hareket aralığında çalış.", prescription: "15 dk" },
    ],
  },
  {
    key: "thursday",
    short: "Per",
    label: "Perşembe",
    dateLabel: "POWER DAY",
    theme: "Kuvvet dayanıklılığı",
    duration: "75 dk",
    status: "training",
    items: [
      { id: "thu-row", category: "ROWERG", title: "RowErg Interval", detail: "Çekiş gücü sabit, son 100 m kontrollü artır.", prescription: "6 × 500 m" },
      { id: "thu-squat", category: "KUVVET", title: "Front Squat", detail: "Olimpik bar ile temiz ve kontrollü tekrar.", prescription: "4 × 8" },
      { id: "thu-lunge", category: "HYROX", title: "DB Back-Rack Lunge", detail: "Sandbag alternatifi; kısa ve dengeli adım.", prescription: "4 × 20 m" },
      { id: "thu-wall", category: "HYROX", title: "Wall Ball", detail: "Setleri bölmeden önce ritim bul.", prescription: "5 × 20" },
    ],
  },
  {
    key: "friday",
    short: "Cum",
    label: "Cuma",
    dateLabel: "RUN QUALITY",
    theme: "Koşu ekonomisi + hız",
    duration: "60 dk",
    status: "training",
    items: [
      { id: "fri-warm", category: "ISINMA", title: "Koşu Drilleri", detail: "A-skip, diz çekme, kısa strides.", prescription: "12 dk" },
      { id: "fri-int", category: "KOŞU", title: "400 m Interval", detail: "Hızlı ama kontrollü; formu koru.", prescription: "8 × 400 m" },
      { id: "fri-carry", category: "HYROX", title: "Farmer Carry", detail: "Omuzlar aşağıda, kısa hızlı adımlar.", prescription: "5 × 40 m" },
    ],
  },
  {
    key: "saturday",
    short: "Cmt",
    label: "Cumartesi",
    dateLabel: "HYBRID DAY",
    theme: "Mini HYROX simülasyonu",
    duration: "85 dk",
    status: "training",
    items: [
      { id: "sat-run1", category: "SIMÜLASYON", title: "1 km Run + SkiErg", detail: "Geçiş süresini kısa tut.", prescription: "2 tur" },
      { id: "sat-run2", category: "SIMÜLASYON", title: "1 km Run + Sled", detail: "İtiş ve çekişi aynı turda tamamla.", prescription: "2 tur" },
      { id: "sat-run3", category: "SIMÜLASYON", title: "1 km Run + RowErg", detail: "Koşudan sonra ilk 200 m sakin başla.", prescription: "2 tur" },
      { id: "sat-finish", category: "FİNİŞ", title: "Wall Ball", detail: "Yarış yorgunluğunda ritim testi.", prescription: "60 tekrar" },
    ],
  },
  {
    key: "sunday",
    short: "Paz",
    label: "Pazar",
    dateLabel: "RESET",
    theme: "Tam dinlenme",
    duration: "Dinlenme",
    status: "recovery",
    items: [
      { id: "sun-walk", category: "OPSİYONEL", title: "Rahat Yürüyüş", detail: "Bel ve bacaklar iyiyse hafif hareket.", prescription: "20–30 dk" },
    ],
  },
];
