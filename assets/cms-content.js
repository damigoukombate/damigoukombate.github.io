(async()=>{
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const cleanPhone=s=>String(s??'').replace(/[^+\d]/g,'');
 try{
  const settings=await fetch('content/settings.json?ts='+Date.now(),{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()});
  const parts=String(settings.name||'').trim().split(/\s+/); settings.brand_first=parts.shift()||''; settings.brand_last=parts.join(' ');
  settings.email_display='✉ '+(settings.email||''); settings.email_mailto='mailto:'+(settings.email||''); settings.email_subject=settings.email_mailto+'?subject=Prise%20de%20contact%20depuis%20le%20portfolio';
  settings.phone1_display='☎ '+(settings.phone1||''); settings.phone2_display='☎ '+(settings.phone2||''); settings.phone1_tel='tel:'+cleanPhone(settings.phone1); settings.phone2_tel='tel:'+cleanPhone(settings.phone2);
  settings.linkedin_display='in '+String(settings.linkedin||'').replace(/^https?:\/\/(www\.)?/,'').replace(/\/$/,'');
  document.querySelectorAll('[data-setting]').forEach(el=>{const v=settings[el.dataset.setting];if(v!=null)el.textContent=v});
  document.querySelectorAll('[data-setting-src]').forEach(el=>{const v=settings[el.dataset.settingSrc];if(v)el.src=v});
  document.querySelectorAll('[data-setting-href]').forEach(el=>{const v=settings[el.dataset.settingHref];if(v)el.href=v});
 }catch(e){console.warn('Settings CMS non chargés',e)}
 const render={
  experiences:x=>`<div class="timeline-item"><div class="date">${esc(x.date)}</div><div><h3>${esc(x.title)}</h3><p><strong>${esc(x.organization)}</strong></p><p>${esc(x.description)}</p>${x.skills?.length?`<div class="pill-row">${x.skills.map(s=>`<span class="pill">${esc(s)}</span>`).join('')}</div>`:''}</div></div>`,
  engagements:x=>`<div class="timeline-item"><div class="date">${esc(x.date)}</div><div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></div></div>`,
  formations:x=>`<div class="cert"><small>${esc(x.meta)}</small><b>${esc(x.title)}</b><span>${esc(x.details)}</span></div>`,
  expertises:x=>`<article class="card"><div class="icon">${esc(x.icon)}</div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`,
  distinctions:x=>`<div class="cert"><small>${esc(x.meta||x.date||'')}</small><b>${esc(x.title)}</b><span>${esc(x.details||x.description||'')}</span></div>`,
  international_events:x=>`<article class="card"><small>${esc(x.date||'')}</small><h3>${esc(x.title)}</h3><p>${esc(x.description||'')}</p></article>`
 };
 for(const el of document.querySelectorAll('[data-cms-list]')){const kind=el.dataset.cmsList;try{const data=await fetch(`content/${kind}.json?ts=${Date.now()}`,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()});data.sort((a,b)=>(a.order??999)-(b.order??999));if(render[kind])el.innerHTML=data.map(render[kind]).join('');}catch(e){console.warn(`CMS ${kind} non chargé`,e)}}
})();
