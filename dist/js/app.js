"use strict"

// window.addEventListener('load', (event) => {});

// desktop or mobile (mouse or touchscreen)
const isMobile = {
   Android: function () { return navigator.userAgent.match(/Android/i) },
   BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
   iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
   Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
   Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
   any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
   }
};
const isPC = !isMobile.any();
if (isPC) { document.body.classList.add('_pc') } else { document.body.classList.add('_touch') };

// media queries
const MIN1024 = window.matchMedia('(min-width: 1024px)');
const MIN768 = window.matchMedia('(min-width: 768px)');
const DOC = document;
const TRANSITION_TIME = 1500;
let active_section;

DOC.body.style.setProperty('--tr-time', TRANSITION_TIME / 1000 + 's')

// variables
const SECTIONS = DOC.querySelectorAll('.section');
const COOKIE = DOC.querySelector('.cookie');
// const LINE_M = DOC.querySelector('.line-m');

const HEADER = DOC.getElementById('header');
const START = DOC.getElementById('start');
const FIRST_M = DOC.getElementById('first_m');
const ABOUT_M = DOC.getElementById('about_m');
const FEATURES_M = DOC.getElementById('features_m');
const SERVICES_M = DOC.getElementById('services_m');
const PROJECTS_M = DOC.getElementById('projects_m');
const PARTNERS_M = DOC.getElementById('partners_m');
const CONTACTS_M = DOC.getElementById('contacts_m');


// const HORIZOMTAL_1 = DOC.querySelector('.horizomtal-1');

// function throttle(callee, timeout) {
//    let timer = null;
//    return function perform(...args) {
//       if (timer) return;
//       timer = setTimeout(() => {
//          callee(...args);
//          clearTimeout(timer);
//          timer = null;
//       }, timeout)
//    }
// }

// ** ======================= RESIZE ======================  ** //
// window.addEventListener('resize', () => {})


// ** ======================= CLICK ======================  ** //
DOC.documentElement.addEventListener("click", (event) => {
   if (event.target.closest('.cookie__agree')) {
      COOKIE.remove()
   }
   // управление меню
   if (event.target.closest('.header__button')) { toggleMenu() }
   if (!event.target.closest('.header__button') && !event.target.closest('.header__nav-list')) { closeMenu() }
   // навигация
   if (event.target.closest('.next-mebel')) {
      hiddenStartScreen();
      nextMebel();
   }
   if (event.target.closest('.next-mebel-about')) { nextMebelAbout() }
   // меню
   if (event.target.closest('.to-start')) { showStartScreen() }
   if (event.target.closest('.to-about-m')) { nextMebelAbout() }
   if (event.target.closest('.to-features-m')) { nextMebelFeatures() }
   if (event.target.closest('.to-services-m')) { nextMebelServices() }
   if (event.target.closest('.to-projects-m')) { nextMebelProjects() }
   if (event.target.closest('.to-partners-m')) { nextMebelPartners() }
   if (event.target.closest('.to-contacts-m')) { nextMebelContacts() }

   // отключить скролл слайдера
   if (event.target.closest('.projects__info')) {
      PROJECTS_M_SWIPER_ITEM.mousewheel.disable();
   }
   // включить скролл слайдера
   if (event.target.closest('.modal--projects')) {
      PROJECTS_M_SWIPER_ITEM.mousewheel.enable();
   }
})


let startProgressAboutM = false;
let endProgressAboutM = false;
let startProgressFeaturesM = false;
let endProgressFeaturesM = false;
let startProgressProjectM = false;
let endProgressProjectM = false;
let startProgressServicesM = false;
let endProgressServicesM = false;





window.addEventListener('wheel', function (event) {
   if (active_section == 'about_m' && startProgressAboutM && event.deltaY < 0) {
      prevMebel()
   }
   if (active_section == 'about_m' && endProgressAboutM && event.deltaY > 0) {
      nextMebelFeatures()
   }
   if (active_section == 'features_m' && startProgressFeaturesM && event.deltaY < 0) {
      prevMebelAbout();
   }
   if (active_section == 'features_m' && endProgressFeaturesM && event.deltaY > 0) {
      nextMebelServices();
   }
   if (active_section == 'projects_m' && startProgressProjectM && event.deltaY < 0) {
      prevMebelServices()
   }
   if (active_section == 'projects_m' && endProgressProjectM && event.deltaY > 0) {
      nextMebelPartners();
   }
   if (active_section == 'services_m' && startProgressServicesM && event.deltaY < 0) {
      prevMebelFeatures()
   }
   if (active_section == 'services_m' && endProgressServicesM && event.deltaY > 0) {
      nextMebelProjects()
   }
});



// управление
function openMenu() {
   DOC.body.classList.add('menu-open');
}
function closeMenu() {
   DOC.body.classList.remove('menu-open');
}
function toggleMenu() {
   DOC.body.classList.toggle('menu-open');
}

// функции навигации по блокам
function hiddenStartScreen() {
   START.classList.add('offset-left');
}
function showStartScreen() {
   hideActiveSections_R();
   showSection_LR(START)
}
function nextMebel() {
   FIRST_M.classList.add('active');
}
function prevMebel() {
   showSection_LR(FIRST_M);
   hideActiveSections_R();
   if (smoother) smoother.paused(true);
}
function nextMebelAbout() {
   initScroll("#about_s", "#about_c");
   hideActiveSections_L()
   showSection_RL(ABOUT_M);
   setTimeout(() => { if (smoother) smoother.paused(false) }, TRANSITION_TIME)
}
function prevMebelAbout() {
   initScroll("#about_s", "#about_c");
   hideActiveSections_R();
   showSection_LR(ABOUT_M);
   setTimeout(() => { if (smoother) smoother.paused(false) }, TRANSITION_TIME)
}
function nextMebelFeatures() {
   hideActiveSections_L()
   showSection_RL(FEATURES_M);
}
function prevMebelFeatures() {
   hideActiveSections_R()
   showSection_LR(FEATURES_M);
}
function nextMebelServices() {
   initScroll("#services_m", "#services_c");
   hideSections_L();
   showSection_RL(SERVICES_M);
   setTimeout(() => { if (smoother) smoother.paused(false) }, TRANSITION_TIME)
}
function prevMebelServices() {
   initScroll("#services_m", "#services_c");
   hideActiveSections_R();
   showSection_LR(SERVICES_M);
   setTimeout(() => { if (smoother) smoother.paused(false) }, TRANSITION_TIME)
}
function nextMebelProjects() {
   hideSections_L();
   showSection_RL(PROJECTS_M);
}
function prevMebelProjects() {
   hideActiveSections_R();
   showSection_LR(PROJECTS_M);
}
function nextMebelPartners() {
   initScroll("#partners_s", "#partners_c");
   hideSections_L();
   showSection_RL(PARTNERS_M);
   setTimeout(() => { if (smoother) smoother.paused(false) }, TRANSITION_TIME)
}
function nextMebelContacts() {
   hideSections_L();
   showSection_RL(CONTACTS_M);
}

// ************* служебные функции ******************

// показать без анимации
function showSectionNotAnimated(item) {
   item.style.transition = 'all 0s';
   item.classList.remove('offset-left');
   item.classList.remove('offset-right');
   requestAnimationFrame(() => {
      active_section = item.id;
      item.style.transition = '';
      item.classList.add('active');
   })
}

// подготовить, вернуть в область видимости не анимировать
function prepareScreen(item) {
   // возвращает экрам, не делает активным
   item.style.transition = 'all 0s';
   item.classList.remove('offset-left');
   item.classList.remove('offset-right');
   requestAnimationFrame(() => {
      item.style.transition = '';
   })
}

// показать секуию с анимацией справа налево
function showSection_RL(item) {
   closeMenu();
   item.style.transition = 'all 0s';
   item.classList.remove('offset-left');
   item.classList.add('offset-right');
   requestAnimationFrame(() => {
      active_section = item.id;
      item.style.transition = '';
      item.classList.remove('offset-right');
      item.classList.add('active');
      // console.log(item);
   })
}
// показать секуию с анимацией слева направо
function showSection_LR(item) {
   closeMenu();
   item.style.transition = 'all 0s';
   item.classList.remove('offset-right');
   item.classList.add('offset-left');
   requestAnimationFrame(() => {
      active_section = item.id;
      item.style.transition = '';
      item.classList.remove('offset-left');
      item.classList.add('active');
      // console.log(item);
   })
}

// прячет секции влево
function hideSections_L() {
   if (smoother) smoother.paused(true);
   SECTIONS.forEach(e => {
      e.classList.remove('offset-right', 'active');
      e.classList.add('offset-left');
   })
}
// прячет активную секцию налево
function hideActiveSections_L() {
   if (smoother) smoother.paused(true);
   const section = DOC.querySelector('.section.active');
   if (!section) return;
   section.classList.add('offset-left');
   section.classList.remove('act ive');
}
// прячет активную секцию навправо
function hideActiveSections_R() {
   if (smoother) smoother.paused(true);
   const section = DOC.querySelector('.section.active');
   if (!section) return;
   section.classList.add('offset-right');
   section.classList.remove('active');
}







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
/* открывает, закрывает модальные окна. */
/*
добавить классы
js-modal-hidden - родительский контейнер модального окна который скрывается и показывается, задать стили скрытия
js-modal-visible - задать стили открытия
js-modal-close - кнопка закрытия модального окна находится внутри js-modal-hidde
кнопка открытия, любая:
js-modal-open - кнопка открытия модального окна
data-modal_open="id" - id модального окна
если надо что бы окно закрывалось при клике на пустое место (фон), добавляется атрибут js-modal-stop-close.
js-modal-stop-close - атрибут указывает на поле, при клике на которое не должно происходить закрытие окна, 
т.е. контейнер контента, при этом внешний родительский контейнет помечается атрибутом js-modal-close.
допускается дополнительно кнопка закрытия внутри js-modal-stop-close.
*/
document.addEventListener('click', (event) => {
   if (event.target.closest('.js-modal-open')) { openModal(event) }
   if (event.target.closest('.js-modal-close')) { testModalStopClose(event) }
})
function openModal(event) {
   let id = event.target.closest('.js-modal-open').dataset.modal_open;
   if (typeof id !== "undefined") { initOpenModal(id) };
}
function testModalStopClose(event) {
   if (event.target.closest('.js-modal-stop-close') &&
      event.target.closest('.js-modal-stop-close') !==
      event.target.closest('.js-modal-close').closest('.js-modal-stop-close')) {
      return
   }
   closeModal(event);
}
function closeModal(event) {
   event.target.closest('.js-modal-hidden').classList.remove('js-modal-visible');
   activeScrollCloseModal();
}
// функция закрытия модального окна (передать id модального окна)
function initCloseModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.remove('js-modal-visible');
   }
   activeScrollCloseModal();
}
// функция открытия модального окна (передать id модального окна)
function initOpenModal(id) {
   if (document.querySelector(`#${id}`)) {
      document.querySelector(`#${id}`).classList.add('js-modal-visible');
      document.body.classList.add('body-overflow')
   }
}
function activeScrollCloseModal() {
   if (!document.querySelector('.js-modal-visible')) {
      document.body.classList.remove('body-overflow');
   }
}


const FEATURES_M_SWIPER = FEATURES_M.querySelector('.swiper');
const FEATURES_M_LIST_TEXT = document.querySelectorAll('.features--text');
const FEATURES_M_TEXT_BUTTON_PREV = document.querySelectorAll('.features__button.prev span');
const FEATURES_M_TEXT_BUTTON_NEXT = document.querySelectorAll('.features__button.next span');

//  ========== features_m ============
let proggressFeaturesM = 0;
var featuresMSwiper = new Swiper(FEATURES_M_SWIPER, {
   //   allowTouchMove: false,
   direction: "vertical",
   spaceBetween: 20,
   speed: 700,
   slidesPerView: 1.1,
   mousewheel: {
      enabled: true,
      eventsTarget: '.features'
   },
   navigation: {
      nextEl: FEATURES_M_SWIPER.querySelector(".next"),
      prevEl: FEATURES_M_SWIPER.querySelector(".prev"),
   },
   pagination: {
      el: document.querySelector('.features__pagination'),
      type: 'bullets',
      clickable: true,
   },
   on: {
      progress: function (swiper, progress) {
         proggressFeaturesM = progress;
      },
      transitionStart: function (swiper) {
         FEATURES_M_LIST_TEXT.forEach((e, i) => e.classList.toggle('active', swiper.activeIndex == i));
         FEATURES_M_TEXT_BUTTON_PREV.forEach((e, i) => e.classList.toggle('active', swiper.activeIndex == i));
         FEATURES_M_TEXT_BUTTON_NEXT.forEach((e, i) => e.classList.toggle('active', swiper.activeIndex == i));
      },
      transitionEnd: function (swiper) {
         if (proggressFeaturesM == 0) {
            startProgressFeaturesM = true;
         }
         if (proggressFeaturesM == 1) {
            endProgressFeaturesM = true;
         }
         if (proggressFeaturesM > 0 && proggressFeaturesM < 1) {
            startProgressFeaturesM = false;
            endProgressFeaturesM = false;
         }
      },
   }
});

// ========== projects_m ==========
const PROJECTS_M_SWIPER = PROJECTS_M.querySelector('.swiper');
let proggressProjectsM = 0;
let PROJECTS_M_SWIPER_ITEM;
function initSwiperProjectM() {
   PROJECTS_M_SWIPER_ITEM = new Swiper(PROJECTS_M_SWIPER, {
      spaceBetween: 50,
      speed: 700,
      slidesPerView: 2.5,
      grabCursor: true,
      mousewheel: {
         enabled: true,
         eventsTarget: '.projects__body'
      },
      scrollbar: {
         el: ".projects__swiper-pagination-body",
         draggable: true,
      },
      on: {
         init: function () {
            if (this.isBeginning == this.isEnd) {
               startProgressProjectM = true;
               endProgressProjectM = true;
            }
         },
         progress: function (swiper, progress) {
            proggressProjectsM = progress;
         },
         transitionEnd: function (swiper) {
            if (proggressProjectsM == 0) {
               startProgressProjectM = true;
            }
            if (proggressProjectsM == 1) {
               endProgressProjectM = true;
            }
            if (proggressProjectsM > 0 && proggressProjectsM < 1) {
               startProgressProjectM = false;
               endProgressProjectM = false;
            }
         },
      }
   });
}
initSwiperProjectM();

const PROJECTS_BUTTONS = DOC.querySelector('.projects__buttons');
const PROJECTS_BUTTONS_LIST = DOC.querySelectorAll('.projects__button');
const listSlides = DOC.querySelectorAll('.projects__slide');
function updateProjectSwiperM() {
   PROJECTS_M_SWIPER_ITEM.destroy(true, true);
   initSwiperProjectM();
}
function changeButtonsActive(button) {
   PROJECTS_BUTTONS_LIST.forEach(e => { e.classList.toggle('active', e === button) })
}
PROJECTS_BUTTONS.addEventListener('click', (event) => {
   if (event.target.closest('.projects__button')) {
      const button = event.target.closest('.projects__button');
      const valueFilter = button.dataset.filter;
      if (!valueFilter) return;
      if (valueFilter === 'all' || valueFilter === '') {
         listSlides.forEach(e => { e.classList.remove('hidden') })
         updateProjectSwiperM();
         changeButtonsActive(button);
         return;
      }
      listSlides.forEach(e => {
         const filter = e.dataset.filter;
         e.classList.toggle('hidden', valueFilter !== filter);
      })
      updateProjectSwiperM();
      changeButtonsActive(button);
   }
})



/* пример инициализации слайдера */
// if (document.querySelector('.swiper')) {
//    const swiper = new Swiper('.swiper', {
//       keyboard: {
//          enabled: true,
//          onlyInViewport: true,
//       },
//       allowTouchMove: false,
//       loop: true,
//       spaceBetween: 10,
//       speed: 300,
//       slidesPerView: 2.5,
//       slidesPerView: 'auto', // количаство слайдеров без авто ширины
//       grabCursor: true,
//       initialSlide: 2,
//       centeredSlides: true,
//       effect: "fade",
//       breakpoints: {
//          1024: {
//             spaceBetween: 20,
//             slidesPerView: 3
//          },
//          768: {
//             slidesPerView: 2
//          }
//       },
//       navigation: {
//          nextEl: ".next",
//          prevEl: ".prev",
//       },
//       pagination: {
//          el: '.pagination__body',
//          type: 'bullets',
//          type: 'fraction',
//          clickable: true,
//       },
//       autoplay: {
//          delay: 2000,
//       },
//       virtual: {
//          enabled: true,
//       },
//       freeMode: {
//          enabled: true,
//          momentum: false // Отключаем инерцию для точного позиционирования
//       },
//    });
// }




/* создание и ликвидация состояния слайдера в зависимости от ширины вьюпорта */
// if (document.querySelector('.swiper')) {
//    let swiperState;
//    let swiper;
//    changeStateSlider();
//    window.addEventListener('resize', () => {
//       changeStateSlider();
//    })
//    function initswiper() {
//       swiper = new Swiper('.swiper', {
//          keyboard: {
//             enabled: true,
//             onlyInViewport: true,
//          },
//          allowTouchMove: true,
//          loop: false,
//          speed: 300,
//          slidesPerView: 1.3,
//          spaceBetween: 24,
//       });
//    }
//    function changeStateSlider() {
//       if (!MIN768.matches) {
//          if (!swiperState) {
//             swiperState = true;
//             initswiper();
//          }
//       } else {
//          if (swiperState) {
//             swiperState = false;
//             swiper.destroy(true, true);
//          }
//       }
//    }
// }
