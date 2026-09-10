document.addEventListener('DOMContentLoaded', function(){
  AOS.init({duration:700,once:true});

  // Image modal: delegate clicks
  document.querySelectorAll('.gallery .gallery-item').forEach(img=>{
    img.addEventListener('click', e=>{
      const src = e.currentTarget.src;
      const modalImg = document.getElementById('modalImg');
      modalImg.src = src;
      const modal = new bootstrap.Modal(document.getElementById('imgModal'));
      modal.show();
    })
  })

  // Typing effect for hero subtitle
  const phrases = [
    'I craft cinematic stories.',
    'Director — Features, Commercials, Music Videos.',
    'Visual storytelling with emotional depth.'
  ];
  const typedEl = document.getElementById('typed');
  if(typedEl){
    let pIndex = 0, ch = 0, forward = true;
    const delay = ms=>new Promise(r=>setTimeout(r,ms));
    (async function loop(){
      const text = phrases[pIndex];
      if(forward){
        if(ch <= text.length){
          typedEl.textContent = text.slice(0,ch);
          ch++; await delay(60);
          loop();
        } else { forward=false; await delay(900); loop(); }
      } else {
        if(ch>=0){
          typedEl.textContent = text.slice(0,ch);
          ch--; await delay(30);
          loop();
        } else { forward=true; pIndex=(pIndex+1)%phrases.length; await delay(200); loop(); }
      }
    })();
  }

  // Smooth collapse on nav click for mobile
  document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', ()=>{
      const bsCollapse = document.querySelector('.navbar-collapse');
      if(bsCollapse.classList.contains('show')){
        new bootstrap.Collapse(bsCollapse).hide();
      }
    })
  })

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      const id = entry.target.id;
      const link = document.querySelector('.nav-link[href="#'+id+'"]');
      if(entry.isIntersecting){
        navLinks.forEach(l=>l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    })
  },{root:null,threshold:0.5});
  sections.forEach(s=>obs.observe(s));

  // Project card tilt
  document.querySelectorAll('.project-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      const cx = rect.width/2; const cy = rect.height/2;
      const dx = (x - cx) / cx; const dy = (y - cy) / cy;
      const tiltX = (dy * 8).toFixed(2); const tiltY = (dx * -8).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });
    card.addEventListener('mouseleave', ()=>{
      card.style.transform = '';
    });
  });

  // Showreel video modal control
  const openShowreel = document.getElementById('openShowreel');
  const videoModalEl = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  let videoModal;
  if(videoModalEl){
    videoModal = new bootstrap.Modal(videoModalEl);
    // cleanup on hide
    videoModalEl.addEventListener('hidden.bs.modal', ()=>{
      modalVideo.src = '';
    });
  }
  if(openShowreel){
    openShowreel.addEventListener('click', ()=>{
      // set YouTube embed (replace with your video ID)
      modalVideo.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1';
      if(videoModal) videoModal.show();
    });
  }

  // Contact form simple validation + mailto fallback
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if(!form.checkValidity()){
        form.classList.add('was-validated');
        return;
      }
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const msg = document.getElementById('message').value.trim();
      const subject = encodeURIComponent('Portfolio contact from '+name);
      const body = encodeURIComponent(msg + '\n\n' + name + '\n' + email);
      window.location.href = `mailto:Charanchandrakumar6@gmail.com?subject=${subject}&body=${body}`;
    })
  }
});
