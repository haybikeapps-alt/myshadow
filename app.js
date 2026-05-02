const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
const uid=()=>crypto.randomUUID?crypto.randomUUID():'xxxx-xxxx-xxxx'.replace(/x/g,()=>(Math.random()*16|0).toString(16));
const today=()=>new Date().toISOString().split('T')[0];
const pad=n=>String(n).padStart(2,'0');
const HARI=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const BULAN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const SN=['subuh','dzuhur','ashar','maghrib','isya'];
const SL={subuh:'Subuh',dzuhur:'Dzuhur',ashar:'Ashar',maghrib:'Maghrib',isya:'Isya'};
const SI=[
{key:'qobliyahSubuh',label:'Qobliyah Subuh',steps:[0,2]},
{key:"ba'diyahDzuhur",label:"Ba'diyah Dzuhur",steps:[0,2]},
{key:'dhuha',label:'Dhuha',steps:[0,2,4,8]},
{key:'tahajud',label:'Tahajud',steps:[0,2,4,8]},
{key:'witir',label:'Witir',steps:[0,1,3]}
];
const SC=[null,'ontime','late','missed'];
const DC=[
{id:'c1',name:'Makanan',type:'expense',icon:'fa-utensils',cls:'cm'},
{id:'c2',name:'Transportasi',type:'expense',icon:'fa-car',cls:'ct'},
{id:'c3',name:'Belanja',type:'expense',icon:'fa-bag-shopping',cls:'cb'},
{id:'c4',name:'Tagihan',type:'expense',icon:'fa-file-invoice',cls:'cg'},
{id:'c5',name:'Hiburan',type:'expense',icon:'fa-gamepad',cls:'ch'},
{id:'c6',name:'Kesehatan',type:'expense',icon:'fa-heart-pulse',cls:'ck'},
{id:'c7',name:'Pendidikan',type:'expense',icon:'fa-book',cls:'cp'},
{id:'c8',name:'Gaji',type:'income',icon:'fa-briefcase',cls:'ck'},
{id:'c9',name:'Freelance',type:'income',icon:'fa-laptop',cls:'cp'},
{id:'c10',name:'Lainnya',type:'income',icon:'fa-ellipsis',cls:'cx'}
];
const DA=[
{id:'a1',name:'Tunai',type:'cash',balance:450000,color:'#34D399',icon:'fa-money-bill-wave'},
{id:'a2',name:'Bank BCA',type:'bank',balance:2750000,color:'#60A5FA',icon:'fa-building-columns'},
{id:'a3',name:'GoPay',type:'ewallet',balance:320000,color:'#A78BFA',icon:'fa-mobile-screen'}
];
function fmtRp(n){return'Rp '+Math.abs(n).toLocaleString('id-ID')}
function fmtDate(d){const dt=new Date(d);return HARI[dt.getDay()]+', '+dt.getDate()+' '+BULAN[dt.getMonth()]+' '+dt.getFullYear()}
function fmtShort(d){const dt=new Date(d);return dt.getDate()+'/'+(dt.getMonth()+1)}
function daysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.toISOString().split('T')[0]}
function getWeekDates(){const dates=[];const now=new Date();const day=now.getDay();const mon=new Date(now);mon.setDate(now.getDate()-(day===0?6:day-1));for(let i=0;i<7;i++){const d=new Date(mon);d.setDate(mon.getDate()+i);dates.push(d.toISOString().split('T')[0])}return dates}
function calcPT(dateStr){const d=new Date(dateStr+'T00:00:00');const start=new Date(d.getFullYear(),0,0);const diff=d-start;const doy=Math.floor(diff/864e5);const lat=-6.2,lng=106.8,tz=7;const dec=23.45*Math.sin(2*Math.PI/365*(doy-81));const dr=dec*Math.PI/180;const lr=lat*Math.PI/180;const B=2*Math.PI/365*(doy-81);const EoT=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B);const sn=12-(lng-tz*15)/15+EoT/60;const cosH=Math.max(-1,Math.min(1,(-Math.sin(-0.833*Math.PI/180)-Math.sin(lr)*Math.sin(dr))/(Math.cos(lr)*Math.cos(dr))));const HA=Math.acos(cosH)*180/Math.PI/15;const sr=sn-HA;const ss=sn+HA;const fmt=h=>{let hh=Math.floor(h);let mm=Math.round((h-hh)*60);if(mm>=60){hh++;mm=0}if(hh<0)hh+=24;return pad(hh)+':'+pad(mm)};return{subuh:fmt(sr-1.33),dzuhur:fmt(sn+0.08),ashar:fmt(sn+HA+0.55),maghrib:fmt(ss+0.05),isya:fmt(ss+1.3)}}
function showToast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2500)}
function getGreeting(){const h=new Date().getHours();if(h<4)return'Selamat malam';if(h<10)return'Selamat pagi';if(h<15)return'Selamat siang';if(h<18)return'Selamat sore';return'Selamat malam'}
