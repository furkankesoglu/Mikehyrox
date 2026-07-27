export type AthleteLevel = "return" | "beginner" | "intermediate" | "advanced";
export type RiskLevel = "low" | "moderate" | "high";

export type StationKnowledge = {
  id: string;
  order: number;
  name: string;
  raceDose: string;
  menOpen: string;
  menPro: string;
  primaryDemand: string[];
  whyTrain: string;
  technique: string[];
  commonErrors: string[];
  regressions: string[];
  progressions: string[];
  levelDose: Record<AthleteLevel, string>;
  backRisk: RiskLevel;
  backNotes: string;
};

export const raceFormat = {
  name: "HYROX Singles",
  structure: "8 × 1 km koşu; her koşudan sonra sabit sırada bir istasyon",
  totalRunning: "8 km",
  raceDate: "2026-09-19",
  targetDivision: "Men Open",
  menOpen: {
    ski: "1000 m",
    sledPush: "50 m · 152 kg (kızak dahil)",
    sledPull: "50 m · 103 kg (kızak dahil)",
    burpeeBroadJump: "80 m",
    row: "1000 m",
    farmersCarry: "200 m · 2×24 kg",
    lunges: "100 m · 20 kg sandbag",
    wallBalls: "100 tekrar · 6 kg",
  },
  menPro: {
    ski: "1000 m",
    sledPush: "50 m · 202 kg (kızak dahil)",
    sledPull: "50 m · 153 kg (kızak dahil)",
    burpeeBroadJump: "80 m",
    row: "1000 m",
    farmersCarry: "200 m · 2×32 kg",
    lunges: "100 m · 30 kg sandbag",
    wallBalls: "100 tekrar · 9 kg",
  },
};

export const stations: StationKnowledge[] = [
  {
    id: "ski", order: 1, name: "SkiErg", raceDose: "1000 m", menOpen: "1000 m", menPro: "1000 m",
    primaryDemand: ["aerobik güç", "lat ve triseps dayanıklılığı", "gövde ritmi", "kalça kapanışı"],
    whyTrain: "İlk istasyonda gereksiz laktat üretmeden verimli güç oluşturmayı ve koşuya kontrollü dönmeyi öğretir.",
    technique: ["Kolları tek başına çekme; kalça kapanışıyla gücü başlat", "Tutarlı stroke rate ve split kullan", "İlk 200 m'de hedef splitten hızlı açılma"],
    commonErrors: ["Aşırı hızlı başlangıç", "Belden çökme", "Sadece kol kullanma"],
    regressions: ["10–20 dk kolay teknik", "6×250 m RPE 5–6", "Ayakta ağrı varsa kısa menzil teknik"],
    progressions: ["4×500 m", "3×750 m", "1000 m kontrollü test", "Koşu sonrası compromised SkiErg"],
    levelDose: { return: "10 dk kolay veya 6×250 m", beginner: "4×500 m RPE 6", intermediate: "3×750 m yarış split + 5–10 sn", advanced: "Koşu sonrası 1000 m yarış split" },
    backRisk: "moderate", backNotes: "Nötr gövde ve kalça hareketi korunur. Ağrı artarsa güç ve stroke rate düşürülür; fleksiyon altında zorlamaya izin verilmez."
  },
  {
    id: "sled-push", order: 2, name: "Sled Push", raceDose: "50 m", menOpen: "152 kg", menPro: "202 kg",
    primaryDemand: ["bacak kuvveti", "horizontal force", "bracing", "lokal kas dayanıklılığı"],
    whyTrain: "Yarıştaki en yüksek kuvvet gereksinimlerinden biridir; koşu bacakları yorgunken kuvvet üretimini geliştirir.",
    technique: ["Kısa ve sürekli adım", "Kaburgaları pelvis üzerinde tut", "Omuz ve kalçayı birlikte ilerlet"],
    commonErrors: ["Belin aşırı çukurlaşması", "Çok uzun adım", "İlk şeritte tükenme"],
    regressions: ["Boş/çok hafif kızak teknik", "%40–60 yarış yükü", "10–15 m kısa tekrar"],
    progressions: ["Mesafeyi artır", "Dinlenmeyi azalt", "Yükü %5–10 artır", "Koşu sonrası yarış yükü"],
    levelDose: { return: "4–6×15–20 m, %40–60", beginner: "6×20 m, %60–70", intermediate: "5×25 m, %75–90", advanced: "50 m yarış yükü ve compromised tekrar" },
    backRisk: "high", backNotes: "Yusuf için yalnız ağrısız teknikle ilerler. Ağrı >3/10, yayılım, uyuşma veya güç kaybında durdurulur; yük artırılmaz."
  },
  {
    id: "sled-pull", order: 3, name: "Sled Pull", raceDose: "50 m", menOpen: "103 kg", menPro: "153 kg",
    primaryDemand: ["posterior chain", "sırt ve biseps", "grip", "geriye yürüme koordinasyonu"],
    whyTrain: "İpi verimli toplarken gövdeyi sabit tutmayı ve aralıksız çekiş ritmini geliştirir.",
    technique: ["İpi düzenli topla", "Kalçayı geriye oturt, gövdeyi sabit tut", "İpin üzerinde durma"],
    commonErrors: ["Belden ani çekiş", "Kollarla tek seferde asılma", "İp karmaşası"],
    regressions: ["Cable backward walk", "Hafif kızak", "Kısa şerit"],
    progressions: ["Yük artışı", "50 m kesintisiz", "Koşu sonrası uygulama"],
    levelDose: { return: "4×15 m hafif", beginner: "6×15–20 m", intermediate: "4×25 m", advanced: "50 m yarış yükü" },
    backRisk: "high", backNotes: "Ani lomber fleksiyon/rotasyondan kaçınılır. Bracing bozulduğunda set biter."
  },
  {
    id: "burpee", order: 4, name: "Burpee Broad Jump", raceDose: "80 m", menOpen: "80 m", menPro: "80 m",
    primaryDemand: ["tam vücut dayanıklılığı", "ritim", "yatay sıçrama", "nabız yönetimi"],
    whyTrain: "Yüksek nabız altında hareket ekonomisini ve koşuya yeniden geçiş becerisini geliştirir.",
    technique: ["Tekrarlanabilir sıçrama mesafesi", "Göğüs yere temas standardını koru", "Kalkışta nefesi kontrol et"],
    commonErrors: ["İlk metrelerde aşırı uzun sıçrama", "Düzensiz ayak yerleşimi", "Belden kontrolsüz düşme"],
    regressions: ["Step-back burpee", "Burpee + kısa ileri adım", "5–10 m teknik blok"],
    progressions: ["20 m tekrarlar", "Dinlenmeyi azalt", "Koşu sonrası 40–80 m"],
    levelDose: { return: "4×5 kontrollü step-back", beginner: "4×10 m", intermediate: "4×20 m", advanced: "80 m yarış ritmi" },
    backRisk: "moderate", backNotes: "Bel semptomunda step-back ve küçük sıçrama kullanılır; ağrılı zemine iniş tekrarlanmaz."
  },
  {
    id: "row", order: 5, name: "RowErg", raceDose: "1000 m", menOpen: "1000 m", menPro: "1000 m",
    primaryDemand: ["aerobik güç", "bacak itişi", "çekiş ritmi", "posterior chain dayanıklılığı"],
    whyTrain: "Yarışın ikinci yarısında enerji maliyetini kontrol ederek yüksek fakat sürdürülebilir güç üretmeyi öğretir.",
    technique: ["Bacak-gövde-kol sırası", "Dönüşte kol-gövde-bacak", "İlk 200 m kontrollü"],
    commonErrors: ["Erken kol çekişi", "Aşırı yüksek stroke rate", "Belden yuvarlanma"],
    regressions: ["10 dk teknik", "6×250 m", "Düşük damper kontrollü çekiş"],
    progressions: ["4×500 m", "2×1000 m", "Koşu sonrası 1000 m"],
    levelDose: { return: "10–15 dk rahat", beginner: "4×500 m RPE 6", intermediate: "3×750 m", advanced: "1000 m yarış split / compromised" },
    backRisk: "moderate", backNotes: "Catch pozisyonunda bel yuvarlanmaz. Semptom artarsa stroke uzunluğu ve güç düşürülür."
  },
  {
    id: "carry", order: 6, name: "Farmers Carry", raceDose: "200 m", menOpen: "2×24 kg", menPro: "2×32 kg",
    primaryDemand: ["grip", "lateral core", "üst sırt", "yürüyüş ekonomisi"],
    whyTrain: "Koşu yorgunluğunda postürü ve tutuşu koruyarak kesintisiz ilerlemeyi geliştirir.",
    technique: ["Kaburgalar aşağıda", "Kısa hızlı adım", "Ağırlıkları sallama"],
    commonErrors: ["Yana eğilme", "Omuzları kulaklara çekme", "Gereksiz hızlı başlangıç"],
    regressions: ["Suitcase carry", "Hafif çift DB", "20–40 m tekrar"],
    progressions: ["Mesafe artışı", "Yük artışı", "Daha az bırakma", "Koşu sonrası 200 m"],
    levelDose: { return: "4×20–40 m hafif", beginner: "4×40 m", intermediate: "4×50 m yarışa yakın", advanced: "200 m yarış yükü" },
    backRisk: "moderate", backNotes: "Asimetri varsa suitcase carry düşük yükte kullanılabilir. Ağrıya rağmen taşıma yapılmaz."
  },
  {
    id: "lunge", order: 7, name: "Sandbag Lunge", raceDose: "100 m", menOpen: "20 kg", menPro: "30 kg",
    primaryDemand: ["tek taraflı bacak dayanıklılığı", "kalça stabilitesi", "bracing", "denge"],
    whyTrain: "Yarış sonunda yüksek lokal yorgunlukta adım kalitesini ve gövde kontrolünü sürdürmeyi geliştirir.",
    technique: ["Arka diz kontrollü temas", "Ayak-diz-kalça hizası", "Kısa dengeli adım"],
    commonErrors: ["Dizin içe kaçması", "Belin rotasyonu", "Aşırı uzun adım"],
    regressions: ["Bodyweight reverse lunge", "Split squat", "Hafif DB back-rack"],
    progressions: ["Mesafe", "Yük", "Kesintisiz adım", "Koşu sonrası 100 m"],
    levelDose: { return: "3×8/yan bodyweight veya hafif DB", beginner: "4×20 m hafif", intermediate: "4×25 m yarışa yakın", advanced: "100 m yarış yükü" },
    backRisk: "high", backNotes: "Sandbag yoksa enseye tek DB yerine iki DB back-rack dengeli tercih edilir. Bel ağrısında reverse lunge/split squat'a dönülür."
  },
  {
    id: "wall-ball", order: 8, name: "Wall Ball", raceDose: "100 tekrar", menOpen: "6 kg", menPro: "9 kg",
    primaryDemand: ["squat dayanıklılığı", "omuz dayanıklılığı", "ritim", "nefes yönetimi"],
    whyTrain: "Final istasyonunda yorgunken squat standardını, hedef isabetini ve set bölme stratejisini geliştirir.",
    technique: ["Kalça diz seviyesinin altına", "Topu göğüste karşıla", "Önceden set planı yap"],
    commonErrors: ["No-rep derinliği", "Topu çok öne atma", "Plansız tükenme"],
    regressions: ["4 kg top", "Box squat + throw", "5–10 tekrar setleri"],
    progressions: ["Toplam tekrar artışı", "Set arası dinlenme azalması", "6 kg ile yarış setleri", "Koşu sonrası 100"],
    levelDose: { return: "5×8–10, 4 kg", beginner: "5×15, 4–6 kg", intermediate: "5×20, 6 kg", advanced: "100 tekrar yarış stratejisi" },
    backRisk: "moderate", backNotes: "Derinlik ağrısız aralıkla sınırlanır; yorgunlukta lomber ekstansiyon artarsa set durur."
  },
];

export const supportingMethods = [
  { id: "zone2", name: "Zone 2", purpose: "Aerobik taban, toparlanma kapasitesi ve düşük maliyetli hacim", useWhen: "Haftada 2–3 kez; konuşma temposu/RPE 3–5", avoidWhen: "Bel semptomu koşuyla artıyorsa bike/erg alternatifi" },
  { id: "threshold", name: "Eşik/Tempo", purpose: "Yarış koşu temposunu ve laktat yönetimini geliştirmek", useWhen: "Temel hacim tolere edildiğinde haftada 1", avoidWhen: "Uyku düşük, ağrı artmış veya önceki sert seanstan toparlanmamışsa" },
  { id: "interval", name: "VO2/Interval", purpose: "Aerobik güç ve hızlı koşu ekonomisi", useWhen: "Orta/ileri seviyede haftada en fazla 1 ana seans", avoidWhen: "Dönüş haftasında, yüksek ağrı veya belirgin yorgunlukta" },
  { id: "strength", name: "Temel Kuvvet", purpose: "Sled, carry, lunge ve koşu ekonomisi için kuvvet rezervi", useWhen: "Haftada 2 gün, failure olmadan", avoidWhen: "Teknik bozulması veya nörolojik semptom" },
  { id: "compromised", name: "Compromised Running", purpose: "İstasyondan sonra koşu ritmini yeniden bulmak", useWhen: "Temel dönemden sonra, önce kısa bloklarla", avoidWhen: "Bel dönüşünün ilk aşaması veya istasyon tekniği oturmadan" },
  { id: "simulation", name: "Yarış Simülasyonu", purpose: "Pacing, geçiş ve istasyon stratejisini test etmek", useWhen: "Yarışa yaklaştıkça 2–4 haftada bir; tam simülasyon seyrek", avoidWhen: "Her hafta tam yarış yapmak; toparlanmayı bozar" },
];

export const globalSafetyRules = [
  "Bel ağrısı 0–2/10 ve seans sonrası başlangıç seviyesine dönüyorsa plan korunabilir.",
  "Ağrı 3/10'u geçerse aynı gün yük/mesafe/yoğunluk %20–40 azaltılır veya ağrısız varyasyona geçilir.",
  "Bacağa yayılan ağrı, uyuşma, güç kaybı, idrar/bağırsak değişikliği gibi bulgularda antrenman motoru program üretmez; sağlık değerlendirmesi ister.",
  "Failure zorunlu değildir; Yusuf'un dönüş döneminde 2–4 tekrar rezervi hedeflenir.",
  "Bir haftada aynı değişkende genellikle tek progresyon yapılır: yük veya hacim veya yoğunluk.",
  "Sert koşu, ağır alt gövde ve ağır sled günleri arka arkaya yerleştirilmez.",
  "Yarışa özgüllük zamanla artar; erken dönemde genel kapasite ve ağrısız teknik önceliklidir.",
];

export const evidenceNotes = [
  "HYROX resmi formatı: 8×1 km koşu ve sabit sırada 8 fonksiyonel istasyon.",
  "HYROX üzerine ilk fizyoloji çalışmaları performansın koşu/aerobik kapasite ağırlıklı olduğunu; istasyon gücü ve pacing'in de belirleyici olduğunu gösterir.",
  "Concurrent training kuvvet ve dayanıklılığı birlikte geliştirebilir; yüksek alt gövde yüklerini ve koşu yoğunluğunu akıllı dağıtmak gerekir.",
  "WHO kronik bel ağrısında yapılandırılmış egzersiz programlarını destekler; tek bir mucize hareket yerine kişiye göre kademeli ve sürdürülebilir yaklaşım gerekir.",
  "ACSM 2026: süreklilik, büyük kas gruplarının düzenli çalıştırılması ve zaman içinde kademeli ilerleme; gereksiz karmaşıklıktan daha önemlidir.",
];
