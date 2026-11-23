document.documentElement.classList.add('js');
const menuBtn=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
menuBtn?.addEventListener('click',()=>{const opening=menuBtn.getAttribute('aria-expanded')!=='true';menuBtn.setAttribute('aria-expanded',String(opening));nav.classList.toggle('is-open',opening);});
const workToggle=document.querySelector('.work-toggle');
workToggle?.addEventListener('click',()=>{const parent=workToggle.closest('.nav-work');const opening=!parent.classList.contains('is-open');parent.classList.toggle('is-open',opening);workToggle.setAttribute('aria-expanded',String(opening));});
// hover menu
if(workToggle){
 const parent=workToggle.closest('.nav-work');
 const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
 parent.addEventListener('pointerenter',()=>{if(finePointer.matches){parent.classList.add('is-open');workToggle.setAttribute('aria-expanded','true')}});
 parent.addEventListener('pointerleave',()=>{if(finePointer.matches){parent.classList.remove('is-open');workToggle.setAttribute('aria-expanded','false')}});
 parent.addEventListener('keydown',event=>{if(event.key==='Escape'){parent.classList.remove('is-open');workToggle.setAttribute('aria-expanded','false');workToggle.focus()}});
}

const progress=document.querySelector('.reading-progress');
let pending=false;
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?100*scrollY/max:0)+'%';pending=false;}
window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(updateProgress)}},{passive:true});updateProgress();
if('IntersectionObserver' in window){const io=new IntersectionObserver((entries,obs)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');obs.unobserve(e.target)}})},{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('is-visible'))}
const dlg=document.querySelector('#lightbox');const lightImg=dlg?.querySelector('img');const lightCaption=dlg?.querySelector('p');
// load gallery photos
document.querySelectorAll('.photo-tile').forEach(tile=>{
  const src=tile.dataset.photoSrc;
  const art=tile.querySelector('.photo-art');
  if(src&&art){
    const probe=new Image();
    probe.onload=()=>{const img=document.createElement('img');img.src=src;img.alt=tile.getAttribute('aria-label')?.replace('View travel photograph: ','')||'Travel photograph';img.loading='lazy';art.replaceChildren(img);tile.dataset.loaded='true';};
    probe.src=src;
  }
  tile.addEventListener('click',()=>{
    if(tile.dataset.loaded!=='true'){alert('This photograph has not been added to the photography folder yet.');return;}
    openLightbox(src,tile.getAttribute('aria-label')||'Portfolio photograph',tile.querySelector('.photo-caption')?.textContent||'');
  });
});
dlg?.querySelector('.lightbox-close')?.addEventListener('click',()=>dlg.close());dlg?.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});
document.querySelectorAll('[data-setup]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();alert('Replace this placeholder with your actual '+el.dataset.setup+' URL before publishing.')}));

// poetry reader
document.querySelectorAll('.poem-open').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.poem)?.showModal()));
document.querySelectorAll('.poem-dialog').forEach(dialog=>{
  dialog.querySelectorAll('.poem-close,.poem-close-text').forEach(button=>button.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});
});

// shared image viewer
function openLightbox(src,alt,caption){if(!dlg||!lightImg||!lightCaption)return;lightImg.src=src;lightImg.alt=alt;lightCaption.textContent=caption;dlg.showModal();}
document.querySelectorAll('[data-lightbox-src]').forEach(button=>button.addEventListener('click',()=>openLightbox(button.dataset.lightboxSrc,button.getAttribute('aria-label')||'Research poster',button.dataset.lightboxCaption||'')));

// burch presentation viewer
const slideDialog=document.querySelector('#burch-slides');
if(slideDialog){
  const slideImage=slideDialog.querySelector('.slide-viewer-stage img');
  const slideCount=slideDialog.querySelector('.slide-viewer-count');
  const totalSlides=11;
  let currentSlide=0;
  function showSlide(next){
    currentSlide=(next+totalSlides)%totalSlides;
    slideImage.src=`assets/sample-work/burch/slide-${String(currentSlide+1).padStart(2,'0')}.jpg`;
    slideImage.alt=`Burch Fellowship research presentation, slide ${currentSlide+1} of ${totalSlides}`;
    slideCount.textContent=`Slide ${currentSlide+1} of ${totalSlides}`;
  }
  document.querySelectorAll('[data-slideshow-open]').forEach(button=>button.addEventListener('click',()=>{showSlide(0);slideDialog.showModal()}));
  slideDialog.querySelector('.slide-viewer-close').addEventListener('click',()=>slideDialog.close());
  slideDialog.querySelector('.slide-viewer-prev').addEventListener('click',()=>showSlide(currentSlide-1));
  slideDialog.querySelector('.slide-viewer-next').addEventListener('click',()=>showSlide(currentSlide+1));
  slideDialog.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();showSlide(currentSlide-1)}
    if(event.key==='ArrowRight'){event.preventDefault();showSlide(currentSlide+1)}
  });
  slideDialog.addEventListener('click',event=>{if(event.target===slideDialog)slideDialog.close()});
}

// infographic viewer
const infographicDialog=document.querySelector('#infographic-viewer');
document.querySelectorAll('[data-infographic-open]').forEach(button=>button.addEventListener('click',()=>{if(!infographicDialog)return;const img=infographicDialog.querySelector('img');if(img){img.src=button.dataset.infographicSrc||'assets/images/arts-infographic.png';img.alt=button.dataset.infographicAlt||'Full infographic';}infographicDialog.showModal();}));
infographicDialog?.querySelector('.infographic-close')?.addEventListener('click',()=>infographicDialog.close());
infographicDialog?.addEventListener('click',event=>{if(event.target===infographicDialog)infographicDialog.close()});
