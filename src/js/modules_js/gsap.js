

function wrapLetters(element) {
   function wrapper(element) {
      const words = element.innerHTML.trim().split(' ');
      const wordWrap = words.map(item => { return item.split('').map(e => { return `<span class="letter">${e}</span>` }).join('') })
      element.innerHTML = `<span class="word">${wordWrap.join('</span>&#32;<span class="word"> ')}</span> `
      element.after(' ');
      return element;
   }
   const nodelist = Array.from(element.childNodes)
   let accumulator = document.createElement('div');
   nodelist.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
         let span = document.createElement('span')
         const text = node.textContent;
         span.append(text);
         accumulator.append(wrapper(span))
      } else {
         accumulator.append(wrapper(node))
      }
   })
   element.innerHTML = accumulator.innerHTML
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

function initScroll(s, c) {
   smoother = ScrollSmoother.create({
      wrapper: s,
      content: c,
      smooth: isPC ? 1 : 0,
      normalizeScroll: isPC ? true : false,
   })
   if (isPC && smoother) smoother.paused(true);
}

// about, анимация текста блюр
function addAboutAnimation(element, id, trigger, scroller) {
   wrapLetters(element);
   tl_about[id] = gsap.timeline({
      scrollTrigger: {
         trigger: trigger,
         scroller: MIN1024.matches ? scroller : document.body,
         start: "top top",
         end: `bottom top`,
         pin: true,
         scrub: true,
         pinType: isPC ? "transform" : "fixed",
         onUpdate: (self) => {
            if (!MIN1024.matches) return;
            if (Number(self.progress.toFixed(4)) == 0 && active_section === id) {
               progress[id].start = true;
               return;
            }
            if (Number(self.progress.toFixed(4)) == 1 && active_section === id) {
               progress[id].end = true;
               return;
            }
            progress[id].start = false;
            progress[id].end = false;
         },
      },
   })
   const ABOUT_LETTERS = element.querySelectorAll(`.letter`);
   ABOUT_LETTERS && ABOUT_LETTERS.forEach((e) => {
      tl_about[id].to(e, { color: '#ffffff', filter: 'blur(0)' })
   })
}

const ABOUT_TEXT_M = document.querySelector('.about-text-m');
if (ABOUT_TEXT_M) addAboutAnimation(ABOUT_TEXT_M, 'about_m', '.trigger-about-m', '#about_ms');
const ABOUT_TEXT_R = document.querySelector('.about-text-r');
if (ABOUT_TEXT_R) addAboutAnimation(ABOUT_TEXT_R, 'about_r', '.trigger-about-r', '#about_rs');


// services_m
const SERVICES_TITLE = document.querySelector('.services__title');
if (MIN1024.matches && SERVICES_TITLE) {
   tl_services.services_m = gsap.timeline({
      scrollTrigger: {
         trigger: SERVICES_TITLE,
         endTrigger: '.services-end-trigger',
         scroller: "#services_ms",
         start: "0% 0%",
         end: `100% 100%`,
         pin: true,
         // pinType: "fixed",
         // markers: {
         //    startColor: "green",
         //    endColor: "red",
         //    fontSize: "40px",
         //    fontWeight: "bold",
         //    indent: 20
         // },
         pinType: isPC ? "transform" : "fixed",
         pinSpacing: false,
         scrub: true,
         onUpdate: (self) => {
            if (!MIN1024.matches) return;
            if (Number(self.progress.toFixed(5)) < 0.01 && active_section === 'services_m') {
               progress.services_m.start = true;
               return;
            }
            if (Number(self.progress.toFixed(5)) > 0.99 && active_section === 'services_m') {
               progress.services_m.end = true;
               return;
            }
            progress.services_m.start = false;
            progress.services_m.end = false;
         },
      },
   })
}

if (!MIN1024.matches && SERVICES_TITLE) {
   gsap.utils.toArray(".services__card").forEach((item, index) => {
      gsap.from(item, {
         x: index % 2 === 0 ? '100vw' : '-100vw',
         duration: 0.8,
         ease: "power2.out",
         scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
         }
      });
   });
}


// partners_m, анимация текста блюр

const PARTNERS_TEXT = document.querySelector('.partners__text');
if (MIN1024.matches && PARTNERS_TEXT) {
   wrapLetters(PARTNERS_TEXT);
   let tl_mpt = gsap.timeline({
      scrollTrigger: {
         trigger: '.trigger-partners',
         scroller: "#partners_ms",
         start: "top top",
         end: `bottom top`,
         pin: true,
         pinType: isPC ? "transform" : "fixed",
         scrub: true,
         onUpdate: (self) => {
            if (!MIN1024.matches) return;
            if (Number(self.progress.toFixed(5)) == 0 && active_section === 'partners_m') {
               progress.partners_m.start = true;
               return;
            }
            if (Number(self.progress.toFixed(5)) == 1 && active_section === 'partners_m') {
               progress.partners_m.end = true;
               return;
            }
            progress.partners_m.start = false;
            progress.partners_m.end = false;
         },
      },
   })

   const PARTNERS_LETTERS = PARTNERS_TEXT.querySelectorAll(`.letter`);
   PARTNERS_LETTERS && PARTNERS_LETTERS.forEach((e) => {
      tl_mpt.to(e, { color: 'var(--color)', filter: 'blur(0)' })
   })
}


// прокрутка по якорям
// document.body.addEventListener('click', (event) => {
//    if (event.target.closest('[href^="#"]')) {
//       event.preventDefault();
//       let getName = event.target.closest('[href^="#"]').getAttribute('href');
//       closeHeaderMenu();
//       gsap.to(window, { scrollTo: getName, ease: "power2" })
//    }
// })

// markers: {
//    startColor: "green",
//    endColor: "red",
//    fontSize: "40px",
//    fontWeight: "bold",
//    indent: 20
// },