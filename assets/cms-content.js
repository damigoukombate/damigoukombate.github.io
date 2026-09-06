(async()=>{
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 try{const settings=await fetch('content/settings.json',{cache:'no-store'}).then(r=>r.json()); document.querySelectorAll('[data-setting]').forEach(el=>{const v=settings[el.dataset.setting]; if(v!=null) el.textContent=v}); document.querySelectorAll('[data-setting-src]').forEach(el=>{const v=settings[el.dataset.settingSrc]; if(v) el.src=v});}catch(e){console.warn('Settings CMS non chargés',e)}
 const render={
  experiences:x=>`<div class="timeline-item"><div class="date">${esc(x.date)}</div><div><h3>${esc(x.title)}</h3><p><strong>${esc(x.organization)}</strong></p><p>${esc(x.description)}</p>${x.skills?.length?`<div class="pill-row">${x.skills.map(s=>`<span class="pill">${esc(s)}</span>`).join('')}</div>`:''}</div></div>`,
  engagements:x=>`<div class="timeline-item"><div class="date">${esc(x.date)}</div><div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></div></div>`,
  formations:x=>`<div class="cert"><small>${esc(x.meta)}</small><b>${esc(x.title)}</b><span>${esc(x.details)}</span></div>`,
  expertises:x=>`<article class="card"><div class="icon">${esc(x.icon)}</div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`
 };
 for(const el of document.querySelectorAll('[data-cms-list]')){const kind=el.dataset.cmsList; try{const data=await fetch(`content/${kind}.json`,{cache:'no-store'}).then(r=>r.json()); data.sort((a,b)=>(a.order??999)-(b.order??999)); el.innerHTML=data.map(render[kind]).join('');}catch(e){console.warn(`CMS ${kind} non chargé`,e)}}
})();
