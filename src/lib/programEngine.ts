export type EngineLog = { status:string; rpe:string; painAfter:string };
export type EngineWorkout = { week:number; exercises:Array<{ title:string; target:string; log:EngineLog }> };
export type EngineCheckin = { sleep:string; energy:string; backPain:string };
export type GeneratedProgram = { weekNumber:number; title:string; rationale:string; days:Array<{day:string;theme:string;exercises:Array<{title:string;prescription:string;reason:string;safetyNote:string}>}> };

function avg(values:number[]){return values.length?values.reduce((a,b)=>a+b,0)/values.length:0}
function nums(values:string[]){return values.map(Number).filter(n=>Number.isFinite(n)&&n>0)}
function includesAny(text:string,terms:string[]){const t=text.toLocaleLowerCase('tr-TR');return terms.some(x=>t.includes(x))}

export function generateProgram(history:EngineWorkout[],checkins:EngineCheckin[],approvedCount:number):GeneratedProgram{
 const exercises=history.flatMap(w=>w.exercises);
 const completed=exercises.filter(e=>e.log.status==='complete').length;
 const partial=exercises.filter(e=>e.log.status==='partial').length;
 const adherence=exercises.length?Math.round(((completed+partial*.5)/exercises.length)*100):0;
 const rpe=avg(nums(exercises.map(e=>e.log.rpe)));
 const pain=Math.max(0,...nums([...exercises.map(e=>e.log.painAfter),...checkins.map(c=>c.backPain)]));
 const sleep=avg(nums(checkins.map(c=>c.sleep)));
 const energy=avg(nums(checkins.map(c=>c.energy)));
 const recent=history.slice(-3).flatMap(w=>w.exercises).filter(e=>e.log.status==='complete'||e.log.status==='partial');
 const recentOlympic=recent.some(e=>includesAny(e.title,['clean','jerk','snatch','olimpik']));
 const recentCrossfit=recent.some(e=>includesAny(e.title,['crossfit','metcon','wod','burpee','thruster']));
 const nextWeek=Math.max(2,approvedCount+2);
 let mode:'progress'|'hold'|'deload'='hold';
 if(pain>=4||adherence<60||sleep&&sleep<6) mode='deload';
 else if(adherence>=85&&rpe>0&&rpe<=7&&pain<=2&&(!energy||energy>=7)) mode='progress';
 const rationaleBase=mode==='progress'?`Uyum %${adherence}, ortalama RPE ${rpe.toFixed(1)} ve düşük ağrı nedeniyle kontrollü ilerleme.`:mode==='deload'?`Uyum %${adherence}, bel ağrısı ${pain}/10 ve toparlanma verileri nedeniyle yük/hacim azaltıldı.`:`Uyum %${adherence}, ortalama RPE ${rpe?rpe.toFixed(1):'—'} ve ağrı ${pain}/10 olduğu için ana yapı korundu.`;
 const rationale=`${rationaleBase} Program; olimpik güç, konsantrik starting strength, ayrı eksantrik squat, resisted sprint ve burpee broad jump ekonomisini haftaya dağıtır.${recentOlympic&&recentCrossfit?' Son kayıtlarda olimpik/CrossFit yükü görüldüğü için ilk ağır alt-vücut teması geciktirilir.':''}`;
 const clean=mode==='deload'?'3 × 2 · teknik · %50-60':mode==='progress'?'5 × 2 · %65-75':'4 × 3 · %60-70';
 const jerk=mode==='deload'?'3 × 2 · teknik':mode==='progress'?'5 × 2 · RPE 7':'4 × 2-3 · RPE 6-7';
 const pin=mode==='deload'?'3 × 3 · RPE 6':'4 × 3 · RPE 7-8';
 const ecc=mode==='deload'?'3 × 4 · 3 sn iniş · RPE 5-6':'4 × 5 · 3 sn iniş · RPE 6-7';
 const zone2=mode==='progress'?'30 dk':mode==='deload'?'20-25 dk':'25-30 dk';
 const run=mode==='progress'?'6-7 km':mode==='deload'?'4-5 km':'5-6 km';
 const sled=mode==='progress'?'7 × 15-20 m':mode==='deload'?'4 × 15 m':'6 × 15-20 m';
 const powerDay={day:'Salı',theme:'Olimpik güç + konsantrik kuvvet + sprint gücü',exercises:[
  {title:'Power Clean',prescription:clean,reason:'Triple extension, yüksek güç ve RFD; sprint ivmelenmesine kuvvet aktarımı.',safetyNote:'Failure yok; teknik bozulursa Hang Power Clean veya Clean Pull.'},
  {title:'Power Jerk',prescription:jerk,reason:'Dip-drive patlayıcılığı ve alt-üst gövde kuvvet aktarımı.',safetyNote:'Belden hiper-ekstansiyon yok; ağrıda push press alternatifi.'},
  {title:'Concentric-only Pin Squat',prescription:pin,reason:'Dead-stop pozisyondan starting strength ve propulsif kuvvet.',safetyNote:'Ağır ama hızlı; bel ağrısı 3/10 üstünde yük azalt.'},
  {title:'Resisted Sled Push',prescription:sled,reason:'Yatay kuvvet ve erken ivmelenme; HYROX özgüllüğü.',safetyNote:'Formu öldürecek kadar yükleme yok.'},
  {title:'Burpee Broad Jump Power Block',prescription:mode==='deload'?'4 × 4':'5 × 5',reason:'Yere iniş-kalkış ekonomisi ve horizontal projection.',safetyNote:'Kalite odaklı; metcon temposuna dönüştürme.'}
 ]};
 const recoveryDay={day:'Pazartesi',theme:'Toparlanma + aerobik taban',exercises:[
  {title:'Assault Bike Zone 2',prescription:zone2,reason:'Önceki yüksek yoğunluklu günlerden toparlanırken aerobik tabanı korur.',safetyNote:'RPE 4-5.'},
  {title:'McGill Big 3 + mobilite',prescription:'3 tur + 10 dk',reason:'Bracing, trunk endurance ve bel toleransı.',safetyNote:'Ağrısız aralıkta çalış.'}
 ]};
 return {weekNumber:nextWeek,title:`HYROX Güç-Hız Entegrasyonu — ${mode==='progress'?'İlerleme':mode==='deload'?'Toparlanma':'Stabilizasyon'}`,rationale,days:[
  recoveryDay,
  powerDay,
  {day:'Çarşamba',theme:'Zone 2 koşu + stride',exercises:[{title:'Rahat Koşu',prescription:`${run} · Zone 2`,reason:'Aerobik kapasite ve koşu ekonomisi.',safetyNote:'Bel/bacağa yayılan ağrıda dur.'},{title:'Strides',prescription:mode==='deload'?'4 × 12 sn':'4-6 × 15 sn',reason:'Yorgunluk yaratmadan hız ve teknik teması.',safetyNote:'Maksimum sprint değil; tam yürüyüş dinlenme.'}]},
  {day:'Perşembe',theme:'Üst vücut + SkiErg',exercises:[{title:'Bench Press + Chest Supported Row',prescription:'4 × 6 / 4 × 10',reason:'İtiş-çekiş kuvveti ve üst gövde dayanıklılığı.',safetyNote:'Bel desteğini koru.'},{title:'SkiErg',prescription:mode==='progress'?'7 × 250 m':'6 × 250 m',reason:'SkiErg tekniği ve güç dayanıklılığı.',safetyNote:'Belden kırılma yerine kalça kapanışı.'}]},
  {day:'Cuma',theme:'Eksantrik alt vücut + HYROX teknik',exercises:[{title:'Eccentric Tempo Back Squat',prescription:ecc,reason:'Eksantrik kontrol, kuvvet absorpsiyonu ve sonraki konsantrik üretime zemin.',safetyNote:'3 sn kontrollü iniş; gereksiz aşırı yavaş tempo/failure yok.'},{title:'Bulgarian Split Squat',prescription:'3 × 8 / bacak',reason:'Tek bacak kuvveti ve koşu desteği.',safetyNote:'Pelvis ve gövde kontrolü.'},{title:'Wall Ball + Walking Lunge Teknik',prescription:'4 × 12-15 / 4 × 20 m',reason:'HYROX özgül ritim ve lokal dayanıklılık.',safetyNote:'Teknik bozulursa hacmi azalt.'}]},
  {day:'Cumartesi',theme:'HYROX devresi + burpee ekonomisi',exercises:[{title:'Burpee Broad Jump Teknik',prescription:'3 × 10 m',reason:'Düşük yorgunlukta mekanik ekonomi.',safetyNote:'Bel çökmesi yok.'},{title:'HYROX Devresi',prescription:mode==='deload'?'2 tur':'3 tur: 500 m Row + 15 Wall Ball + 20 m Lunge + 20 m Sled + 20 m Carry + 10 m Burpee Broad Jump',reason:'İstasyon geçişleri ve yarış özgül dayanıklılık.',safetyNote:'Teknik bozulursa turu sonlandır.'}]},
  {day:'Pazar',theme:'Tam dinlenme',exercises:[{title:'Opsiyonel yürüyüş + mobilite',prescription:'20-30 dk',reason:'Aktif toparlanma.',safetyNote:'Ağrısızsa uygula.'}]}
 ]};
}
