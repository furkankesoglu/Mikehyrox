"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { week1Program, WeekExercise } from "../lib/week1Program";
import { generateProgram } from "../lib/programEngine";
import styles from "./MikeCoachSystem.module.css";

type Log={status:"pending"|"complete"|"partial"|"skipped";weight:string;time:string;distance:string;reps:string;pace:string;rpe:string;painBefore:string;painAfter:string;note:string};
type SavedWorkout={id:string;week:number;date:string;dayKey:string;dayLabel:string;theme:string;savedAt:string;exercises:Array<{id:string;title:string;target:string;log:Log}>};
type Checkin={date:string;weight:string;waist:string;sleep:string;sleepQuality:string;energy:string;backPain:string};
type Program={id:string;weekNumber:number;title:string;rationale:string;status:"approved"|"draft"|"rejected";createdAt:string;days:Array<{day:string;theme:string;exercises:Array<{title:string;prescription:string;reason:string;safetyNote:string}>}>};
type CloudState="loading"|"synced"|"local"|"error";
type CloudPayload={configured:boolean;workouts?:Array<Record<string,unknown>>;checkins?:Array<Record<string,unknown>>;programs?:Array<Record<string,unknown>>;error?:string};

const AUTH_KEY="mike-authenticated",DRAFT_KEY="mike-week1-drafts-v3",HISTORY_KEY="mike-workout-history-v1",CHECKIN_KEY="mike-checkins-v3",PROGRAM_KEY="mike-approved-programs-v1";
const emptyLog:Log={status:"pending",weight:"",time:"",distance:"",reps:"",pace:"",rpe:"",painBefore:"",painAfter:"",note:""};
const emptyCheckin:Checkin={date:new Date().toISOString().slice(0,10),weight:"",waist:"",sleep:"",sleepQuality:"",energy:"",backPain:""};
const dayKeys=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
const text=(value:unknown)=>value==null?"":String(value);
const workoutKey=(x:SavedWorkout)=>`${x.week}|${x.date}|${x.dayKey}`;
const programKey=(x:Program)=>`${x.weekNumber}|${x.status}`;
const mergeBy=<T,>(local:T[],cloud:T[],key:(item:T)=>string)=>Array.from(new Map([...cloud,...local].map(item=>[key(item),item])).values());

export default function MikeCoachSystem(){
 const [ready,setReady]=useState(false),[authenticated,setAuthenticated]=useState(false),[pin,setPin]=useState(""),[error,setError]=useState("");
 const [tab,setTab]=useState<"program"|"history"|"checkin"|"engine">("program");
 const [dayKey,setDayKey]=useState(dayKeys[new Date().getDay()]);
 const [drafts,setDrafts]=useState<Record<string,Log>>({}),[history,setHistory]=useState<SavedWorkout[]>([]),[checkins,setCheckins]=useState<Checkin[]>([]),[programs,setPrograms]=useState<Program[]>([]);
 const [checkin,setCheckin]=useState<Checkin>(emptyCheckin),[message,setMessage]=useState(""),[pending,setPending]=useState<Program|null>(null),[cloud,setCloud]=useState<CloudState>("loading");

 useEffect(()=>{
  setAuthenticated(localStorage.getItem(AUTH_KEY)==="true");
  let localHistory:SavedWorkout[]=[],localCheckins:Checkin[]=[],localPrograms:Program[]=[];
  try{
   setDrafts(JSON.parse(localStorage.getItem(DRAFT_KEY)||"{}"));
   localHistory=JSON.parse(localStorage.getItem(HISTORY_KEY)||"[]");
   localCheckins=JSON.parse(localStorage.getItem(CHECKIN_KEY)||"[]");
   localPrograms=JSON.parse(localStorage.getItem(PROGRAM_KEY)||"[]");
   setHistory(localHistory);setCheckins(localCheckins);setPrograms(localPrograms);
  }catch{}
  setReady(true);

  fetch("/api/sync",{cache:"no-store"}).then(async response=>{
   const data:CloudPayload=await response.json();
   if(!data.configured){setCloud("local");return;}
   if(!response.ok||data.error)throw new Error(data.error||"Bulut okunamadı");
   const cloudHistory:SavedWorkout[]=(data.workouts||[]).map(row=>({id:text(row.id),week:Number(row.week_number)||1,date:text(row.workout_date),dayKey:text(row.day_key),dayLabel:text(row.day_label),theme:text(row.theme),savedAt:text(row.updated_at||row.created_at),exercises:(row.exercises as SavedWorkout["exercises"])||[]}));
   const cloudCheckins:Checkin[]=(data.checkins||[]).map(row=>({date:text(row.checkin_date),weight:text(row.weight_kg),waist:text(row.waist_cm),sleep:text(row.sleep_hours),sleepQuality:text(row.sleep_quality),energy:text(row.energy),backPain:text(row.back_pain)}));
   const cloudPrograms:Program[]=(data.programs||[]).map(row=>({id:text(row.id),weekNumber:Number(row.week_number),title:text(row.title),rationale:text(row.rationale),status:text(row.status) as Program["status"],createdAt:text(row.created_at),days:(row.program as Program["days"])||[]}));
   const mergedHistory=mergeBy(localHistory,cloudHistory,workoutKey);
   const mergedCheckins=mergeBy(localCheckins,cloudCheckins,x=>x.date);
   const mergedPrograms=mergeBy(localPrograms,cloudPrograms,programKey);
   setHistory(mergedHistory);setCheckins(mergedCheckins);setPrograms(mergedPrograms);
   localStorage.setItem(HISTORY_KEY,JSON.stringify(mergedHistory));localStorage.setItem(CHECKIN_KEY,JSON.stringify(mergedCheckins));localStorage.setItem(PROGRAM_KEY,JSON.stringify(mergedPrograms));
   const cloudWorkoutKeys=new Set(cloudHistory.map(workoutKey));
   const missing=localHistory.filter(x=>!cloudWorkoutKeys.has(workoutKey(x)));
   await Promise.all(missing.map(data=>fetch("/api/sync",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"workout",data})})));
   setCloud("synced");
  }).catch(()=>setCloud("error"));
 },[]);

 const day=week1Program.find(d=>d.key===dayKey)||week1Program[0];
 const dayLogs=useMemo(()=>Object.fromEntries(day.exercises.map(e=>[e.id,drafts[e.id]||emptyLog])),[day,drafts]);
 const cloudLabel=cloud==="synced"?"Bulut: Senkron":cloud==="loading"?"Bulut: Bağlanıyor":cloud==="error"?"Bulut: Hata · Yerel aktif":"Bulut: Kapalı · Yerel";
 function login(e:FormEvent){e.preventDefault();const expected=process.env.NEXT_PUBLIC_MIKE_PIN;if(!expected)return setError("PIN tanımlı değil.");if(pin!==expected)return setError("PIN doğru değil.");localStorage.setItem(AUTH_KEY,"true");setAuthenticated(true);setError("")}
 function patch(id:string,p:Partial<Log>){const next={...drafts,[id]:{...(drafts[id]||emptyLog),...p}};setDrafts(next);localStorage.setItem(DRAFT_KEY,JSON.stringify(next))}
 async function syncRecord(type:"workout"|"checkin"|"program",data:SavedWorkout|Checkin|Program){try{const response=await fetch("/api/sync",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type,data})});const result=await response.json();if(!result.configured){setCloud("local");return false}if(!response.ok)throw new Error(result.error||"Bulut kaydı başarısız");setCloud("synced");return true}catch{setCloud("error");return false}}
 async function saveWorkout(){const hasData=day.exercises.some(e=>(dayLogs[e.id]?.status||"pending")!=="pending");if(!hasData){setMessage("Önce en az bir hareketin durumunu gir.");return}const record:SavedWorkout={id:`w1-${day.key}-${Date.now()}`,week:1,date:new Date().toISOString().slice(0,10),dayKey:day.key,dayLabel:day.label,theme:day.theme,savedAt:new Date().toISOString(),exercises:day.exercises.map(e=>({id:e.id,title:e.title,target:e.target,log:dayLogs[e.id]}))};const next=[record,...history.filter(r=>workoutKey(r)!==workoutKey(record))];setHistory(next);localStorage.setItem(HISTORY_KEY,JSON.stringify(next));setMessage(`${day.label} antrenmanı kaydediliyor...`);const synced=await syncRecord("workout",record);setMessage(`${day.label} antrenmanı ${synced?"buluta ve cihaza":"cihaza"} işlendi.`);setTimeout(()=>setMessage(""),2800)}
 async function saveCheckin(e:FormEvent){e.preventDefault();const next=[checkin,...checkins.filter(c=>c.date!==checkin.date)];setCheckins(next);localStorage.setItem(CHECKIN_KEY,JSON.stringify(next));setMessage("Check-in kaydediliyor...");const synced=await syncRecord("checkin",checkin);setMessage(`Check-in ${synced?"buluta ve cihaza":"cihaza"} kaydedildi.`);setTimeout(()=>setMessage(""),2400)}
 function buildProgram(){if(history.length===0){setMessage("Yeni hafta üretmek için önce en az bir antrenman kaydı gerekli.");return}const generated=generateProgram(history,checkins,programs.filter(p=>p.status==="approved").length);setPending({...generated,id:`program-${Date.now()}`,status:"draft",createdAt:new Date().toISOString()});setMessage("Yeni hafta taslağı kural motoruyla oluşturuldu.")}
 async function approve(){if(!pending)return;const approved={...pending,status:"approved" as const};const next=[approved,...programs.filter(p=>programKey(p)!==programKey(approved))];setPrograms(next);localStorage.setItem(PROGRAM_KEY,JSON.stringify(next));setPending(null);setMessage(`${approved.weekNumber}. hafta programı kaydediliyor...`);const synced=await syncRecord("program",approved);setMessage(`${approved.weekNumber}. hafta programı ${synced?"buluta ve sisteme":"cihaza"} eklendi.`)}
 function reject(){setPending(null);setMessage("Taslak reddedildi. Yeni verilerle tekrar oluşturabilirsin.")}
 if(!ready)return <main className={styles.center}>MIKE hazırlanıyor...</main>;
 if(!authenticated)return <main className={styles.center}><form className={styles.login} onSubmit={login}><b>MIKE</b><h1>Yusuf Bezeng</h1><label>Kişisel PIN<input type="password" value={pin} onChange={e=>setPin(e.target.value)}/></label>{error&&<p>{error}</p>}<button>GİRİŞ</button></form></main>;
 return <main className={styles.shell}>
  <header><div><small>MIKE · RULE-BASED COACH</small><h1>Yusuf’un HYROX Merkezi</h1></div><div className={styles.profile}><span>183 cm</span><span>91 kg</span><span>Bel geçmişi: yüksek öncelik</span><span>{cloudLabel}</span></div></header>
  <button className={styles.engineShortcut} type="button" onClick={()=>setTab("engine")}><strong>YENİ HAFTA MOTORUNU AÇ</strong><span>Geçmiş antrenmanları, RPE, uyku ve bel verilerini analiz ederek taslak program oluştur.</span></button>
  {message&&<div className={styles.toast}>{message}</div>}
  {tab==="program"&&<section><div className={styles.heading}><div><small>HAFTA 1</small><h2>Program ve Antrenman Kaydı</h2></div><button className={styles.save} onClick={saveWorkout}>ANTRENMANI KAYDET</button></div><div className={styles.days}>{week1Program.map(d=><button className={d.key===dayKey?styles.active:""} key={d.key} onClick={()=>setDayKey(d.key)}>{d.short}<span>{d.theme}</span></button>)}</div><div className={styles.exerciseList}>{day.exercises.map((e,i)=><Exercise key={e.id} exercise={e} index={i} log={dayLogs[e.id]} patch={p=>patch(e.id,p)}/>)}</div><button className={`${styles.save} ${styles.bottomSave}`} onClick={saveWorkout}>BU GÜNÜ SİSTEME İŞLE</button></section>}
  {tab==="history"&&<section><div className={styles.heading}><div><small>KAYDEDİLEN VERİLER</small><h2>Gün Gün Geçmiş</h2></div><strong>{history.length} kayıt</strong></div>{history.length===0?<div className={styles.empty}>Henüz kaydedilmiş antrenman yok.</div>:history.map(r=><details className={styles.history} key={r.id}><summary><b>Hafta {r.week} · {r.dayLabel}</b><span>{new Date(r.savedAt).toLocaleString("tr-TR")}</span></summary>{r.exercises.map(x=><article key={x.id}><b>{x.title}</b><span>Hedef: {x.target}</span><span>{x.log.status} · RPE {x.log.rpe||"—"} · Bel {x.log.painAfter||"—"}/10</span><p>{x.log.note||"Not yok"}</p></article>)}</details>)}</section>}
  {tab==="checkin"&&<section><div className={styles.heading}><div><small>TOPARLANMA</small><h2>Günlük Check-in</h2></div></div><form className={styles.checkin} onSubmit={saveCheckin}>{([['date','Tarih'],['weight','Kilo'],['waist','Bel çevresi'],['sleep','Uyku'],['sleepQuality','Uyku kalitesi'],['energy','Enerji'],['backPain','Bel ağrısı']] as const).map(([k,l])=><label key={k}>{l}<input type={k==='date'?'date':'number'} value={checkin[k]} onChange={e=>setCheckin({...checkin,[k]:e.target.value})}/></label>)}<button className={styles.save}>CHECK-IN KAYDET</button></form></section>}
  {tab==="engine"&&<section><div className={styles.heading}><div><small>YAPAY ZEKÂ YOK</small><h2>Yeni Hafta Motoru</h2></div><button className={styles.save} onClick={buildProgram}>YENİ HAFTA TASLAĞI OLUŞTUR</button></div><div className={styles.empty}>Sistem; antrenman uyumu, RPE, bel ağrısı, uyku ve enerji verilerini sabit HYROX kurallarıyla analiz eder. Taslak doğrudan aktif olmaz; önce onayın gerekir.</div>{pending&&<ProgramDraft p={pending} approve={approve} reject={reject}/>}<div className={styles.approved}><h3>Onaylanan programlar</h3>{programs.length===0?<p>Henüz yok.</p>:programs.map(p=><article key={p.id}><b>Hafta {p.weekNumber}: {p.title}</b><span>{p.rationale}</span>{p.days.map(d=><details key={d.day}><summary>{d.day} · {d.theme}</summary>{d.exercises.map((e,i)=><p key={i}>{e.title}: {e.prescription}</p>)}</details>)}</article>)}</div></section>}
  <nav>{([['program','Program'],['history','Geçmiş'],['checkin','Check-in'],['engine','Yeni Hafta']] as const).map(([k,l])=><button className={tab===k?styles.navActive:""} key={k} onClick={()=>setTab(k)}>{l}</button>)}</nav>
 </main>
}

function Exercise({exercise,index,log,patch}:{exercise:WeekExercise;index:number;log:Log;patch:(p:Partial<Log>)=>void}){return <article className={styles.exercise}><div className={styles.exTop}><i>{index+1}</i><div><small>{exercise.category}</small><h3>{exercise.title}</h3><p>{exercise.target}</p></div></div><div className={styles.status}>{(["complete","partial","skipped"] as const).map(s=><button type="button" className={log.status===s?styles.selected:""} onClick={()=>patch({status:s})} key={s}>{s==="complete"?"Tamamlandı":s==="partial"?"Kısmi":"Atlandı"}</button>)}</div><div className={styles.inputs}>{([['weight','Ağırlık'],['reps','Set/tekrar'],['time','Süre'],['distance','Mesafe'],['pace','Tempo/split'],['rpe','RPE'],['painBefore','Bel önce'],['painAfter','Bel sonra']] as const).map(([k,l])=><label key={k}>{l}<input value={log[k]} onChange={e=>patch({[k]:e.target.value})}/></label>)}</div><label className={styles.note}>Not<textarea value={log.note} onChange={e=>patch({note:e.target.value})}/></label></article>}
function ProgramDraft({p,approve,reject}:{p:Program;approve:()=>void;reject:()=>void}){return <section className={styles.draft}><small>ONAY BEKLEYEN KURAL MOTORU TASLAĞI</small><h2>Hafta {p.weekNumber}: {p.title}</h2><p>{p.rationale}</p>{p.days.map(d=><details key={d.day}><summary><b>{d.day}</b> · {d.theme}</summary>{d.exercises.map((e,i)=><article key={i}><b>{e.title} — {e.prescription}</b><p>{e.reason}</p><small>{e.safetyNote}</small></article>)}</details>)}<div><button className={styles.save} onClick={approve}>PROGRAMI ONAYLA</button><button className={styles.reject} onClick={reject}>REDDET</button></div></section>}
