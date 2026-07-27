import { NextRequest, NextResponse } from "next/server";

const PROFILE = {
  name: "Yusuf Bezeng",
  heightCm: 183,
  weightKg: 91,
  raceDate: "2026-09-19",
  injury: "Ciddi bel sakatlığı geçmişi",
};

const HYROX_CONTEXT = `HYROX; 8 x 1 km koşu ve sırasıyla SkiErg, Sled Push, Sled Pull, Burpee Broad Jump, RowErg, Farmer Carry, Sandbag Lunge ve Wall Ball istasyonlarından oluşur. Program; aerobik taban, eşik/interval koşu, kuvvet, istasyon tekniği, compromised running, geçiş ve yarış simülasyonu bileşenlerini dengeler. Tek değişkenli progresyon uygula. Uyum >=%85, ortalama RPE <=7, uyku iyi ve ağrı <=2 ise hacim/yükte yaklaşık %5-8 artış düşünülebilir. Ağrı 3/10 üzerindeyse yük/hacmi azalt; 5/10 ve üzeri, yayılan ağrı, uyuşma veya güç kaybında program üretme, sağlık uzmanı değerlendirmesi öner. Failure zorunlu değildir. Yusuf için ağır deadlift ve yüksek yorgunluklu hinge agresif artırılmaz; bracing, McGill Big 3, teknik kalite ve ağrısız varyasyon önceliklidir.`;

const programSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    reply: { type: "string" },
    requiresApproval: { type: "boolean" },
    program: {
      anyOf: [
        { type: "null" },
        {
          type: "object",
          additionalProperties: false,
          properties: {
            weekNumber: { type: "integer" },
            title: { type: "string" },
            rationale: { type: "string" },
            days: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: false,
                properties: {
                  day: { type: "string" },
                  theme: { type: "string" },
                  exercises: {
                    type: "array",
                    items: {
                      type: "object",
                      additionalProperties: false,
                      properties: {
                        title: { type: "string" },
                        prescription: { type: "string" },
                        reason: { type: "string" },
                        safetyNote: { type: "string" },
                      },
                      required: ["title", "prescription", "reason", "safetyNote"],
                    },
                  },
                },
                required: ["day", "theme", "exercises"],
              },
            },
          },
          required: ["weekNumber", "title", "rationale", "days"],
        },
      ],
    },
  },
  required: ["reply", "requiresApproval", "program"],
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "OPENAI_API_KEY tanımlı değil." }, { status: 503 });

  const body = await request.json();
  const prompt = `Sen MIKE Coach'sun. Türkçe konuş. Tıbbi tanı koyma. Kullanıcı yeni hafta programı istediğinde geçmiş kayıtları, check-in verilerini, aktif programları ve HYROX bilgisini kullan. Programı taslak olarak üret ve mutlaka onay sor. Kullanıcı yalnızca soru soruyorsa program alanını null bırak.\n\nPROFİL:\n${JSON.stringify(PROFILE)}\n\nHYROX BİLGİSİ:\n${HYROX_CONTEXT}\n\nKULLANICI MESAJI:\n${body.message}\n\nANTRENMAN GEÇMİŞİ:\n${JSON.stringify(body.history || [])}\n\nCHECK-INLER:\n${JSON.stringify(body.checkins || [])}\n\nAKTİF/ONAYLI PROGRAMLAR:\n${JSON.stringify(body.programs || [])}`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5-mini",
      store: false,
      input: prompt,
      text: { format: { type: "json_schema", name: "mike_coach_response", strict: true, schema: programSchema } },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json({ error: "Koç servisi yanıt vermedi.", detail }, { status: 502 });
  }

  const data = await response.json();
  const outputText = data.output_text || data.output?.flatMap((item: any) => item.content || []).find((item: any) => item.type === "output_text")?.text;
  if (!outputText) return NextResponse.json({ error: "Koç yanıtı okunamadı." }, { status: 502 });

  try {
    return NextResponse.json(JSON.parse(outputText));
  } catch {
    return NextResponse.json({ error: "Koç yanıtı geçerli formatta değil." }, { status: 502 });
  }
}
