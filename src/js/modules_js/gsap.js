var smoother;

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

function initScroll(wrapper, content) {
   smoother = ScrollSmoother.create({
      wrapper: wrapper,
      content: content,
      smooth: 1,
      normalizeScroll: true,
   })
   smoother.paused(true);
}


// about_m, анимация текста блюр
const ABOUT_TEXT = document.querySelector('.about__text');
wrapLetters(ABOUT_TEXT);
let tl_mat = gsap.timeline({
   scrollTrigger: {
      trigger: '.trigger-about',
      start: "top top",
      end: `bottom top`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
         if (Number(self.progress.toFixed(5)) == 0 && active_section === 'about_m') {
            startProgressAboutM = true;
            return;
         }
         if (Number(self.progress.toFixed(5)) == 1 && active_section === 'about_m') {
            endProgressAboutM = true;
            return;
         }
         startProgressAboutM = false;
         endProgressAboutM = false;
      },
   },
})

const ABOUT_LETTERS = ABOUT_TEXT.querySelectorAll(`.letter`);
ABOUT_LETTERS && ABOUT_LETTERS.forEach((e) => {
   tl_mat.to(e, { color: '#ffffff', filter: 'blur(0)' })
})


// services_m
let tl_services = gsap.timeline({
   scrollTrigger: {
      trigger: ".services__title",
      endTrigger: '.services-end-trigger',
      scroller: "#services_m",
      start: "0% 0%",
      end: `100% 100%`,
      pin: true,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => {
         if (Number(self.progress.toFixed(5)) < 0.01 && active_section === 'services_m') {
            startProgressServicesM = true;
            return;
         }
         if (Number(self.progress.toFixed(5)) > 0.99 && active_section === 'services_m') {
            endProgressServicesM = true;
            return;
         }
         startProgressServicesM = false;
         endProgressServicesM = false;
      },
   },
})


// partners_m, анимация текста блюр
const PARTNERS_TEXT = document.querySelector('.partners__text');
wrapLetters(PARTNERS_TEXT);
let tl_mpt = gsap.timeline({
   scrollTrigger: {
      trigger: '.trigger-partners',
      scroller: "#partners_s",
      start: "top top",
      end: `bottom top`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
         if (Number(self.progress.toFixed(5)) == 0 && active_section === 'partners_m') {
            prevMebelProjects()
         }
         if (Number(self.progress.toFixed(5)) == 1 && active_section === 'partners_m') {
            nextMebelContacts()
         }
      },
   },
})

const PARTNERS_LETTERS = PARTNERS_TEXT.querySelectorAll(`.letter`);
PARTNERS_LETTERS && PARTNERS_LETTERS.forEach((e) => {
   tl_mpt.to(e, { color: 'var(--color)', filter: 'blur(0)' })
})



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