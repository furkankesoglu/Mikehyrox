import Link from "next/link";

const stations = [
  { name: "1.000 m SkiErg", why: "Üst gövde çekiş dayanıklılığı, kalça kapanışı ve aerobik güç.", beginner: "4–6 × 250 m, teknik odaklı, RPE 5–6.", intermediate: "4–6 × 500 m, kontrollü split, RPE 6–8.", back: "Bel nötr; kollarla çekmek yerine kalça ve latları birlikte kullan. Ağrı artarsa süreyi kısalt." },
  { name: "Sled Push", why: "Yatay kuvvet, quadriceps dayanıklılığı ve yarışa özgü güç.", beginner: "Kısa 10–20 m setler, yarış yükünün yaklaşık %40–60'ı.", intermediate: "4–8 × 20 m; teknik bozulmadan yük veya mesafe artır.", back: "Gövdeyi kilitle, kalçayı aşırı yükseltme. Ağrı 3/10 üzerindeyse yükü azalt." },
  { name: "Sled Pull", why: "Arka zincir, kavrama ve geriye doğru kuvvet üretimi.", beginner: "4–6 × 10–15 m, kontrollü adım.", intermediate: "4–8 × 20 m, yarışa yakın yükler kademeli.", back: "Belden çekme; ipi gövdeye yakın tut, kısa adımlarla ilerle." },
  { name: "Burpee Broad Jump", why: "Tam vücut dayanıklılığı, yere iniş-kalkış ekonomisi ve yatay sıçrama.", beginner: "Teknik bloklar: 4–6 × 5 tekrar.", intermediate: "10–20 m tekrarlar; yorgunluk altında ritim.", back: "Kontrollü iniş ve nötr gövde. Bel semptomu varsa step-back burpee veya düşük hacim." },
  { name: "1.000 m RowErg", why: "Aerobik güç, çekiş dayanıklılığı ve pacing becerisi.", beginner: "4–6 × 250 m veya 3 × 500 m.", intermediate: "4–6 × 500 m ya da 1.000 m testler.", back: "Bel yerine bacak-kalça-kol sırasını koru; aşırı geriye yatma." },
  { name: "Farmer Carry", why: "Kavrama, core stabilitesi, postür ve yürüyüş ekonomisi.", beginner: "4 × 20–40 m, orta yük.", intermediate: "4–6 × 40 m, yarış yüküne kademeli yaklaşım.", back: "Kaburgaları aşağıda, yükleri eşit, kısa kontrollü adım." },
  { name: "Sandbag Lunge / DB alternatifi", why: "Tek bacak kuvveti, kalça dayanıklılığı ve yarışa özgü lunge kapasitesi.", beginner: "3–4 × 10–20 m hafif yük.", intermediate: "4–6 × 20 m; yük ve hacim tek tek artırılır.", back: "Kısa adım, dik gövde. Yusuf için enseye dumbbell ancak ağrısız ve kontrollü." },
  { name: "Wall Ball", why: "Squat dayanıklılığı, ritim, omuz dayanıklılığı ve final istasyonu toleransı.", beginner: "5–10 tekrar setleriyle toplam 30–50.", intermediate: "10–25 tekrar setleriyle toplam 50–100.", back: "Derinliği ağrısız aralıkta tut; gövde çökmesine izin verme." },
];

const methods = [
  ["Zone 2", "Aerobik taban ve toparlanma. Konuşma temposu, çoğunlukla RPE 3–5. Haftalık koşu ve erg hacminin temelidir."],
  ["Tempo / Threshold", "Sürdürülebilir yüksek efor ve laktat yönetimi. Genelde RPE 6–8; kısa bloklarla başlanır."],
  ["Interval", "Koşu ve erg hızını geliştirir. Hızdan önce eşit split ve teknik kalite aranır."],
  ["Kuvvet", "Sled, carry, lunge ve wall ball için kuvvet rezervi oluşturur. Failure zorunlu değildir; progresyon kontrollüdür."],
  ["Compromised Running", "İstasyon sonrası koşmayı öğretir. Başlangıçta kısa koşu + düşük hacimli istasyon eşleşmeleri kullanılır."],
  ["Simülasyon", "Pacing, geçiş ve yarış stratejisini test eder. Tam simülasyon sık yapılmaz; yarış yaklaştıkça özgüllük artar."],
];

export default function KnowledgePage() {
  return (
    <main style={{ minHeight: "100vh", background: "#090b0d", color: "#f7f4ee", padding: "28px 18px 80px" }}>
      <div style={{ width: "min(1100px, 100%)", margin: "0 auto" }}>
        <Link href="/" style={{ display: "inline-block", color: "#ff5a1f", textDecoration: "none", marginBottom: 24, fontWeight: 800 }}>← MIKE'a dön</Link>
        <p style={{ color: "#ff5a1f", fontSize: 11, fontWeight: 900, letterSpacing: ".14em" }}>YUSUF BEZENG · KURAL TABANLI SİSTEM</p>
        <h1 style={{ fontSize: "clamp(38px, 7vw, 72px)", margin: "8px 0 12px", letterSpacing: "-.05em" }}>HYROX Bilgi Merkezi</h1>
        <p style={{ maxWidth: 780, color: "#a9b0b8", lineHeight: 1.65 }}>Bu sayfa MIKE'ın program oluştururken kullandığı sabit bilgi tabanını açıklar. Sistem yapay zekâ kullanmaz; yarış formatı, egzersiz amacı, seviye, toparlanma ve bel güvenliği kurallarına göre karar verir.</p>

        <section style={{ marginTop: 34 }}>
          <h2>Yarış yapısı</h2>
          <div style={{ padding: 20, border: "1px solid #252a30", borderRadius: 18, background: "#111418", lineHeight: 1.7 }}>
            HYROX yarışında 8 kez 1 km koşu yapılır. Her koşunun ardından sırasıyla SkiErg, Sled Push, Sled Pull, Burpee Broad Jump, RowErg, Farmer Carry, Sandbag Lunge ve Wall Ball gelir. Programda koşu kapasitesi ile istasyon gücü birlikte geliştirilir.
          </div>
        </section>

        <section style={{ marginTop: 34 }}>
          <h2>Antrenman yöntemleri</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 12 }}>
            {methods.map(([title, text]) => <article key={title} style={{ padding: 18, border: "1px solid #252a30", borderRadius: 18, background: "#111418" }}><h3 style={{ marginTop: 0 }}>{title}</h3><p style={{ color: "#a9b0b8", lineHeight: 1.55, marginBottom: 0 }}>{text}</p></article>)}
          </div>
        </section>

        <section style={{ marginTop: 34 }}>
          <h2>İstasyon kütüphanesi</h2>
          <div style={{ display: "grid", gap: 14 }}>
            {stations.map((station) => <article key={station.name} style={{ padding: 20, border: "1px solid #252a30", borderRadius: 18, background: "linear-gradient(145deg,#171b20,#0d1013)" }}>
              <h3 style={{ marginTop: 0, fontSize: 22 }}>{station.name}</h3>
              <p><strong style={{ color: "#ff5a1f" }}>Neden:</strong> {station.why}</p>
              <p><strong>Başlangıç / dönüş:</strong> {station.beginner}</p>
              <p><strong>Orta seviye:</strong> {station.intermediate}</p>
              <p style={{ marginBottom: 0 }}><strong style={{ color: "#ff8b63" }}>Bel güvenliği:</strong> {station.back}</p>
            </article>)}
          </div>
        </section>

        <section style={{ marginTop: 34, padding: 20, border: "1px solid #ff5a1f", borderRadius: 18, background: "rgba(255,90,31,.09)" }}>
          <h2 style={{ marginTop: 0 }}>Program karar kuralları</h2>
          <p>Uyum yüksek, RPE kontrollü, uyku yeterli ve bel ağrısı 0–2 ise sistem yalnızca bir değişkeni küçük oranda artırır.</p>
          <p>Bel ağrısı 3/10 üzerine çıkarsa yük veya hacim azaltılır; 5/10 ve üzeri veya yayılan ağrı, uyuşma ya da güç kaybında yeni program üretilmez.</p>
          <p style={{ marginBottom: 0 }}>Yusuf'un ciddi bel sakatlığı geçmişi nedeniyle ağır deadlift, failure ve ani hacim artışı sistem tarafından varsayılan olarak engellenir.</p>
        </section>
      </div>
    </main>
  );
}
