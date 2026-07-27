# MIKE — HYROX Coach

19 Eylül 2026 HYROX yarışı için kişisel antrenman takip uygulaması.

## Sprint 1

- Tek kullanıcılı PIN girişi
- Dashboard
- HYROX geri sayımı
- Günün antrenmanı
- Kalıcı checkbox sistemi (localStorage)
- Mike'ın günlük notu
- Mobil öncelikli arayüz

## Yerel kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

Varsayılan PIN: `1909`

PIN değiştirmek için `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_MIKE_PIN=YENI_PIN
```

## Vercel

Repo Vercel'e bağlandığında Next.js otomatik algılanır. Ortam değişkeni olarak `NEXT_PUBLIC_MIKE_PIN` eklenebilir.

## Sonraki sprint

Supabase ile kalıcı veri, haftalık takvim, kilo-bel-uyku kayıtları ve program yönetimi.
