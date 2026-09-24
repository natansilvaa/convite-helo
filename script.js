const screens = [...document.querySelectorAll('.screen')];
const hearts = document.querySelector('.hearts');

function show(n){
  screens.forEach((s,i)=>s.classList.toggle('active', i===n));
  window.scrollTo(0,0);
}

// Decorative floating hearts
for(let i=0;i<22;i++){
  const h=document.createElement('span');
  h.className='heart';
  h.textContent = Math.random() > .25 ? '♥' : '💙';
  h.style.left=(Math.random()*94+2)+'%';
  h.style.animationDelay=(-Math.random()*8)+'s';
  h.style.animationDuration=(6+Math.random()*6)+'s';
  h.style.fontSize=(15+Math.random()*19)+'px';
  hearts.appendChild(h);
}

// Playful "não" button: it escapes both mouse and touch.
const noBtn=document.getElementById('noBtn');
const teaser=document.getElementById('teaser');
let noCount=0;

function moveNo(){
  noCount++;
  teaser.textContent = noCount===1 ? 'TEM CERTEZA? 👀' : noCount===2 ? 'PENSA BEM... 🥺' : 'POR FAVOR!! 😭';
  const parent=noBtn.parentElement;
  const rect=parent.getBoundingClientRect();
  const maxX=Math.max(0, rect.width-noBtn.offsetWidth);
  const x=(Math.random()*maxX)-maxX/2;
  const y=(Math.random()*34)-17;
  noBtn.style.transform=`translate(${x}px,${y}px) rotate(${Math.random()*12-6}deg)`;
}
['mouseenter','pointerdown','touchstart'].forEach(evt=>noBtn.addEventListener(evt,(e)=>{
  e.preventDefault();
  moveNo();
}));

document.getElementById('yesBtn').onclick=()=>show(3);
document.getElementById('yesBtn2').onclick=()=>show(3);
document.getElementById('yesBtn3').onclick=()=>show(3);
document.getElementById('nextDate').onclick=()=>show(4);

const dateInput=document.getElementById('date');
const timeInput=document.getElementById('time');
const dateError=document.getElementById('dateError');
const today=new Date();
today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
dateInput.min=today.toISOString().slice(0,10);

let selectedFood='';
let selectedVibe='';

function setupChoices(containerId, onSelect){
  const box=document.getElementById(containerId);
  box.querySelectorAll('.choice').forEach(btn=>{
    btn.onclick=()=>{
      box.querySelectorAll('.choice').forEach(x=>x.classList.remove('selected'));
      btn.classList.add('selected');
      onSelect(btn.dataset.value);
    };
  });
}
setupChoices('foodChoices',v=>{
  selectedFood=v;
  const b=document.getElementById('foodNext');
  b.classList.remove('disabled'); b.textContent='PRÓXIMO 💙';
});
setupChoices('vibeChoices',v=>{
  selectedVibe=v;
  const b=document.getElementById('vibeNext');
  b.classList.remove('disabled'); b.textContent='CONFIRMAR 💙';
});

document.getElementById('dateNext').onclick=()=>{
  if(!dateInput.value || !timeInput.value){
    dateError.textContent='Escolhe a data e o horário primeiro ❤️';
    return;
  }
  dateError.textContent='';
  show(5);
};

document.getElementById('foodNext').onclick=()=>{
  if(!selectedFood) return;
  show(6);
};

document.getElementById('vibeNext').onclick=()=>{
  if(!selectedVibe) return;
  renderSummary();
  show(7);
};

function formatDate(value){
  const [y,m,d]=value.split('-');
  return `${d}/${m}/${y}`;
}
function renderSummary(){
  document.getElementById('summary').innerHTML = `
    📅 <b>${formatDate(dateInput.value)}</b><br>
    🕖 <b>${timeInput.value}</b><br>
    🍽️ <b>${selectedFood}</b><br>
    ✨ <b>${selectedVibe}</b>
  `;
}

document.getElementById('whatsappBtn').onclick=()=>{
  const number='5592984730368';
  const msg =
`Oi! 💙 Eu disse SIM para o nosso date! 🥰

📅 Data: ${formatDate(dateInput.value)}
🕖 Horário: ${timeInput.value}
🍽️ Comida: ${selectedFood}
✨ Vibe: ${selectedVibe}

Agora é só combinar os detalhes. ❤️`;
  window.open(`https://wa.me/${number}?text=${encodeURIComponent(msg)}`,'_blank','noopener');
};
