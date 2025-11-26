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
   showSection_LR(START);
   setTimeout(() => { prepareScreen(FIRST_M) }, TRANSITION_TIME)
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
   section.classList.remove('active');
}
// прячет активную секцию навправо
function hideActiveSections_R() {
   if (smoother) smoother.paused(true);
   const section = DOC.querySelector('.section.active');
   if (!section) return;
   section.classList.add('offset-right');
   section.classList.remove('active');
}






