import Link from "next/link";
import { evidenceNotes, globalSafetyRules, raceFormat, stations, supportingMethods } from "@/lib/hyroxKnowledge";
import styles from "./page.module.css";

export default function KnowledgePage() {
  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div><p>MIKE · KURAL TABANI</p><h1>HYROX Bilgi Merkezi</h1><span>Yusuf Bezeng için sabit yarış bilgileri ve program kararlarının açıklaması.</span></div>
        <Link href="/">Programa dön</Link>
      </header>

      <section className={styles.hero}>
        <article><span>Yarış yapısı</span><strong>{raceFormat.structure}</strong></article>
        <article><span>Hedef kategori</span><strong>Men Open</strong></article>
        <article><span>Koşu toplamı</span><strong>{raceFormat.totalRunning}</strong></article>
        <article><span>Yarış tarihi</span><strong>19 Eylül 2026</strong></article>
      </section>

      <section className={styles.section}>
        <div className={styles.title}><p>RESMÎ YARIŞ SIRASI</p><h2>8 istasyonun görevi ve antrenman mantığı</h2></div>
        <div className={styles.grid}>
          {stations.map((station) => (
            <article className={styles.card} key={station.id}>
              <div className={styles.cardHead}><b>{station.order}</b><div><span>{station.raceDose}</span><h3>{station.name}</h3></div></div>
              <dl><div><dt>Men Open</dt><dd>{station.menOpen}</dd></div><div><dt>Neden?</dt><dd>{station.whyTrain}</dd></div><div><dt>Bel riski</dt><dd>{station.backRisk}</dd></div></dl>
              <h4>Teknik</h4><ul>{station.technique.map((x) => <li key={x}>{x}</li>)}</ul>
              <h4>Sık hata</h4><ul>{station.commonErrors.map((x) => <li key={x}>{x}</li>)}</ul>
              <h4>Yusuf — dönüş seviyesi</h4><p>{station.levelDose.return}</p>
              <h4>İlerleme yolu</h4><p>{station.progressions.join(" → ")}</p>
              <div className={styles.warning}>{station.backNotes}</div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.title}><p>ANTRENMAN YÖNTEMLERİ</p><h2>Hangi yöntem ne zaman kullanılır?</h2></div>
        <div className={styles.methods}>{supportingMethods.map((method) => <article key={method.id}><h3>{method.name}</h3><p><b>Amaç:</b> {method.purpose}</p><p><b>Kullan:</b> {method.useWhen}</p><p><b>Kaçın:</b> {method.avoidWhen}</p></article>)}</div>
      </section>

      <section className={styles.twoCol}>
        <article><div className={styles.title}><p>GÜVENLİK MOTORU</p><h2>Değiştirilemez kurallar</h2></div><ul>{globalSafetyRules.map((rule) => <li key={rule}>{rule}</li>)}</ul></article>
        <article><div className={styles.title}><p>KANIT ÇERÇEVESİ</p><h2>Sistem neye dayanıyor?</h2></div><ul>{evidenceNotes.map((note) => <li key={note}>{note}</li>)}</ul></article>
      </section>

      <footer>MIKE yapay zekâ kullanmaz. Haftalık program, girilen performans ve toparlanma verilerine uygulanan şeffaf kurallarla üretilir.</footer>
    </main>
  );
}
