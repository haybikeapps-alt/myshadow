const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const uid=()=>crypto.randomUUID?crypto.randomUUID():'x'.repeat(8)+Date.now().toString(36);
const today=()=>new Date().toISOString().split('T')[0];
const pad=n=>String(n).padStart(2,'0');
const HARI=['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
const HS=['Min','Sen','Sel','Rab','Kam','Jum','Sab'];
const BULAN=['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
const BS=['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const SN=['subuh','dzuhur','ashar','maghrib','isya'];
const SL={subuh:'Subuh',dzuhur:'Dzuhur',ashar:'Ashar',maghrib:'Maghrib',isya:'Isya'};
const SI=[
{key:'qobliyahSubuh',label:'Qobliyah Subuh',steps:[0,2],max:2,w:3},
{key:"ba'diyahDzuhur",label:"Ba'diyah Dzuhur",steps:[0,2],max:2,w:2},
{key:'dhuha',label:'Dhuha',steps:[0,2,4,8,12],max:12,w:3},
{key:'tahajud',label:'Tahajud',steps:[0,2,4,8,12],max:12,w:3},
{key:'witir',label:'Witir',steps:[0,1,3,5,7,9],max:9,w:2}
];
const PUASA=[
{key:'senin_kamis',label:'Senin-Kamis'},
{key:'ayyamul_bidh',label:'Ayyamul Bidh'},
{key:'daud',label:'Puasa Daud'},
{key:'syawal',label:'6 Syawal'},
{key:'arafah',label:'Arafah'},
{key:'asyura',label:'Asyura'},
{key:'lainnya',label:'Lainnya'}
];
const STC=[null,'ontime','late','missed'];
const DC=[
{id:'c1',name:'Makanan',type:'expense',icon:'fa-utensils',cls:'cm'},
{id:'c2',name:'Transportasi',type:'expense',icon:'fa-car',cls:'ct'},
{id:'c3',name:'Belanja',type:'expense',icon:'fa-bag-shopping',cls:'cb'},
{id:'c4',name:'Tagihan',type:'expense',icon:'fa-file-invoice-dollar',cls:'cg'},
{id:'c5',name:'Hiburan',type:'expense',icon:'fa-film',cls:'chh'},
{id:'c6',name:'Kesehatan',type:'expense',icon:'fa-heart-pulse',cls:'ck'},
{id:'c7',name:'Pendidikan',type:'expense',icon:'fa-graduation-cap',cls:'cp'},
{id:'c8',name:'Sedekah',type:'expense',icon:'fa-hand-holding-heart',cls:'cs'},
{id:'c9',name:'Gaji',type:'income',icon:'fa-briefcase',cls:'ci'},
{id:'c10',name:'Freelance',type:'income',icon:'fa-laptop-code',cls:'cf'},
{id:'c11',name:'Investasi',type:'income',icon:'fa-chart-line',cls:'cv'},
{id:'c12',name:'Lainnya',type:'both',icon:'fa-ellipsis',cls:'cx'}
];
const DA=[
{id:'a1',name:'Dompet',type:'cash',balance:350000,color:'#34D399',icon:'fa-wallet'},
{id:'a2',name:'Bank Mandiri',type:'bank',balance:4200000,color:'#60A5FA',icon:'fa-building-columns'},
{id:'a3',name:'GoPay',type:'ewallet',balance:180000,color:'#A78BFA',icon:'fa-mobile-screen'},
{id:'a4',name:'Tabungan',type:'bank',balance:8500000,color:'#F59E0B',icon:'fa-piggy-bank'}
];
function fmtRp(n){const a=Math.abs(n);if(a>=1e9)return(n<0?'-':'')+'Rp '+(a/1e9).toFixed(1).replace('.0','')+'M';if(a>=1e6)return(n<0?'-':'')+'Rp '+(a/1e6).toFixed(1).replace('.0','')+'jt';return(n<0?'-':'')+'Rp '+a.toLocaleString('id-ID')}
function fmtDate(d){const t=new Date(d);return HARI[t.getDay()]+', '+t.getDate()+' '+BULAN[t.getMonth()]+' '+t.getFullYear()}
function fmtShort(d){const t=new Date(d);return t.getDate()+' '+BS[t.getMonth()]}
function daysAgo(n){const d=new Date();d.setDate(d.getDate()-n);return d.toISOString().split('T')[0]}
function weekDates(){const r=[],n=new Date(),dy=n.getDay(),m=new Date(n);m.setDate(n.getDate()-(dy===0?6:dy-1));for(let i=0;i<7;i++){const d=new Date(m);d.setDate(m.getDate()+i);r.push(d.toISOString().split('T')[0])}return r}
function monthKey(d){const t=new Date(d);return t.getFullYear()+'-'+pad(t.getMonth()+1)}
function greeting(){const h=new Date().getHours();if(h<4)return'Selamat malam';if(h<10)return'Selamat pagi';if(h<15)return'Selamat siang';if(h<18)return'Selamat sore';return'Selamat malam'}
function prayerTimes(ds){const d=new Date(ds+'T00:00:00'),s=new Date(d.getFullYear(),0,0),df=d-s,doy=Math.floor(df/864e5),lat=-6.2,lng=106.8,tz=7,dec=23.45*Math.sin(2*Math.PI/365*(doy-81)),dr=dec*Math.PI/180,lr=lat*Math.PI/180,B=2*Math.PI/365*(doy-81),E=9.87*Math.sin(2*B)-7.53*Math.cos(B)-1.5*Math.sin(B),sn=12-(lng-tz*15)/15+E/60,cH=Math.max(-1,Math.min(1,(-Math.sin(-.833*Math.PI/180)-Math.sin(lr)*Math.sin(dr))/(Math.cos(lr)*Math.cos(dr)))),HA=Math.acos(cH)*180/Math.PI/15,sr=sn-HA,ss=sn+HA,f=h=>{let hh=Math.floor(h),mm=Math.round((h-hh)*60);if(mm>=60){hh++;mm=0}if(hh<0)hh+=24;return pad(hh)+':'+pad(mm)};return{subuh:f(sr-1.33),dzuhur:f(sn+.08),ashar:f(sn+HA+.55),maghrib:f(ss+.05),isya:f(ss+1.3)}}
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2600)}
function seed(st){
for(let i=1;i<=14;i++){const d=daysAgo(i),w={sholatWajib:{},sholatSunnah:{},amal:{infaq:0,tadarus:0},puasa:null,dzikir:{pagi:false,petang:false}};
SN.forEach(n=>{const r=Math.random();w.sholatWajib[n]=r<.48?'ontime':r<.76?'late':r<.88?'missed':null});
SI.forEach(s=>{w.sholatSunnah[s.key]=s.steps[Math.floor(Math.random()*s.steps.length)]});
if(Math.random()>.5)w.amal.infaq=[1e4,15e3,2e4,25e3,5e4,75e3,1e5][Math.floor(Math.random()*7)];
if(Math.random()>.45)w.amal.tadarus=[1,1,2,2,3,4,5][Math.floor(Math.random()*7)];
const dw=new Date(d).getDay();if((dw===1||dw===4)&&Math.random()>.25)w.puasa='senin_kamis';
if(Math.random()>.55)w.dzikir.pagi=true;if(Math.random()>.55)w.dzikir.petang=true;st.worship[d]=w}
const tx=[{c:'c1',d:['Makan siang','Sarapan','Kopi','Grocery'],mn:12e3,mx:85e3},{c:'c2',d:['Gojek','Grab','Bensin','Parkir'],mn:5e3,mx:45e3},{c:'c3',d:['Belanja bulanan','Kebutuhan rumah'],mn:5e4,mx:3e5},{c:'c4',d:['Listrik','Internet','Air','Pulsa'],mn:5e4,mx:3e5},{c:'c5',d:['Nonton','Langganan'],mn:15e3,mx:75e3},{c:'c6',d:['Obat','Vitamin'],mn:2e4,mx:15e4},{c:'c7',d:['Buku','Kursus online'],mn:5e4,mx:3e5},{c:'c8',d:['Infaq masjid','Sedekah','Donasi'],mn:1e4,mx:1e5},{c:'c9',d:['Gaji bulanan'],mn:4e6,mx:8e6,tp:'income'},{c:'c10',d:['Project web','Desain','Konsultasi'],mn:5e5,mx:5e6,tp:'income'},{c:'c11',d:['Dividen','Bunga'],mn:1e5,mx:1e6,tp:'income'}];
for(let i=0;i<14;i++){const d=daysAgo(i),cnt=Math.floor(Math.random()*4)+1;for(let j=0;j<cnt;j++){const t=tx[Math.floor(Math.random()*tx.length)],desc=t.d[Math.floor(Math.random()*t.d.length)],amt=Math.floor(Math.random()*(t.mx-t.mn))+t.mn,acc=st.accounts[Math.floor(Math.random()*st.accounts.length)];st.transactions.push({id:uid(),type:t.tp||'expense',amount:amt,accountId:acc.id,categoryId:t.c,description:desc,date:d,createdAt:new Date(d+'T'+pad(8+Math.floor(Math.random()*12))+':'+pad(Math.floor(Math.random()*60))+':00').toISOString()})}}
st.transactions.push({id:uid(),type:'income',amount:65e5,accountId:'a2',categoryId:'c9',description:'Gaji bulanan',date:daysAgo(10),createdAt:daysAgo(10)+'T08:00:00'});
st.transactions.push({id:uid(),type:'transfer',amount:5e5,accountId:'a2',toAccountId:'a3',categoryId:null,description:'Top up GoPay',date:daysAgo(2),createdAt:daysAgo(2)+'T10:00:00'});
st.budgets={};st.budgets[monthKey(today())]={c1:15e5,c2:5e5,c3:1e6,c4:8e5,c5:3e5,c6:2e5,c7:3e5,c8:5e5};
}
