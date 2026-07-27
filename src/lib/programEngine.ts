export type EngineLog = { status:string; rpe:string; painAfter:string };
export type EngineWorkout = { week:number; exercises:Array<{ title:string; target:string; log:EngineLog }> };
export type EngineCheckin = { sleep:string; energy:string; backPain:string };
export type GeneratedProgram = { weekNumber:number; title:string; rationale:string; days:Array<{day:string;theme:string;exercises:Array<{title:string;prescription:string;reason:string;safetyNote:string}>}> };

function avg(values:number[]){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0}
function nums(values:string[]){return values.map(Number).filter(n=>Number.isFinite(n)&&n>0)}

export function generateProgram(history:EngineWorkout[],checkins:EngineCheckin[],approvedCount:number):GeneratedProgram{
 const exercises=history.flatMap(w=>w.exercises);
 const completed=exercises.filter(e=>e.log.status==='complete').length;
 const partial=exercises.filter(e=>e.log.status==='partial').length;
 const adherence=exercises.length?Math.round(((completed+partial*.5)/exercises.length)*100):0;
 const rpe=avg(nums(exercises.map(e=>e.log.rpe)));
 const pain= Math.max(0,...nums([...exercises.map(e=>e.log.painAfter),...checkins.map(c=>c.backPain)]));
 const sleep=avg(nums(checkins.map(c=>c.sleep)));
 const energy=avg(nums(checkins.map(c=>c.energy)));
 const nextWeek=Math.max(2,approvedCount+2);
 let mode:'progress'|'hold'|'deload'='hold';
 if(pain>=4||adherence<60||sleep&&sleep<6) mode='deload';
 else if(adherence>=85&&rpe>0&&rpe<=7&&pain<=2&&(!energy||energy>=7)) mode='progress';
 const rationale=mode==='progress'?`Uyum %${adherence}, ortalama RPE ${rpe.toFixed(1)} ve düşük ağrı nedeniyle tek değişkende kontrollü ilerleme uygulandı.`:mode==='deload'?`Uyum %${adherence}, bel ağrısı ${pain}/10 ve toparlanma verileri nedeniyle hacim ve yük azaltıldı.`:`Uyum %${adherence}, ortalama RPE ${rpe?rpe.toFixed(1):'—'} ve ağrı ${pain}/10 olduğu için ana yapı korundu.`;
 const pct=mode==='progress'?'+%5':mode==='deload'?'-%25':'aynı';
 const zone2=mode==='progress'?'30 dk':mode==='deload'?'20 dk':'25 dk';
 const run=mode==='progress'?'6.5 km':mode==='deload'?'4 km':'6 km';
 const sled=mode==='progress'?'7 × 20 m':mode==='deload'?'4 × 20 m':'6 × 20 m';
 return {weekNumber:nextWeek,title:`Bel Dostu HYROX Gelişim — ${mode==='progress'?'İlerleme':mode==='deload'?'Toparlanma':'Stabilizasyon'}`,rationale,days:[
  {day:'Pazartesi',theme:'Aerobik taban + core',exercises:[{title:'Assault Bike Zone 2',prescription:zone2,reason:'Aerobik kapasiteyi düşük darbe ile geliştirir.',safetyNote:'Bel ağrısı artarsa süreyi kısalt.'},{title:'McGill Big 3',prescription:'3 tur',reason:'Gövde dayanıklılığı ve bracing kalitesi.',safetyNote:'Ağrısız aralıkta çalış.'}]},
  {day:'Salı',theme:'Alt vücut + HYROX kuvveti',exercises:[{title:'Back Squat',prescription:`4 × 6 · yük ${pct}`,reason:'Bacak kuvveti ve sled/wall ball aktarımı.',safetyNote:'Failure yok; bel nötr.'},{title:'Sled Push',prescription:sled,reason:'Yarışa özgü yatay kuvvet.',safetyNote:'Ağrı 3/10 üstünde yük azalt.'},{title:'Farmer Carry',prescription:'4 × 40 m',reason:'Kavrama, gövde stabilitesi ve taşıma ekonomisi.',safetyNote:'Kısa ve kontrollü adım.'}]},
  {day:'Çarşamba',theme:'Zone 2 koşu',exercises:[{title:'Rahat Koşu',prescription:run,reason:'HYROX performansının temel koşu kapasitesini geliştirir.',safetyNote:'Bel veya bacağa yayılan ağrıda dur.'}]},
  {day:'Perşembe',theme:'Üst vücut + SkiErg',exercises:[{title:'Bench Press + Chest Supported Row',prescription:'4 × 6 / 4 × 10',reason:'İtiş-çekiş kuvveti ve omuz dayanıklılığı.',safetyNote:'Bel desteğini koru.'},{title:'SkiErg',prescription:mode==='progress'?'7 × 250 m':'6 × 250 m',reason:'SkiErg tekniği ve güç dayanıklılığı.',safetyNote:'Belden kırılma yerine kalça kapanışı.'}]},
  {day:'Cuma',theme:'HYROX devresi',exercises:[{title:'Row + Wall Ball + Lunge + Sled + Carry',prescription:mode==='deload'?'2 tur':'3 tur',reason:'İstasyon geçişleri ve yorgunluk altında ritim.',safetyNote:'Teknik bozulursa turu sonlandır.'}]},
  {day:'Cumartesi',theme:'Kombine Zone 2',exercises:[{title:'Bike + Koşu + Mobilite',prescription:mode==='progress'?'35 + 20 + 10 dk':'30 + 20 + 10 dk',reason:'Dayanıklılık ve düşük yoğunlukta hacim.',safetyNote:'Toplam RPE 5’i geçmesin.'}]},
  {day:'Pazar',theme:'Tam dinlenme',exercises:[{title:'Opsiyonel yürüyüş',prescription:'20 dk',reason:'Aktif toparlanma.',safetyNote:'Ağrısızsa uygula.'}]}
 ]};
}
