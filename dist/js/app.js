"use strict"
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
try {
   const isMacOS = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
   if (isMacOS) {
      document.documentElement.classList.add('macos');
   }
} catch (e) {
   console.error(e);
}

// media queries
const MIN1024 = window.matchMedia('(min-width: 1024px)');
const DOC = document;
const TRANSITION_TIME = MIN1024.matches ? 1500 : 700;
let active_section;
DOC.body.style.setProperty('--tr-time', TRANSITION_TIME / 1000 + 's')

// variables
const SECTIONS = DOC.querySelectorAll('.section');
const COOKIE = DOC.querySelector('.cookie');
const HEADER = DOC.getElementById('header');
const MEBEL = DOC.getElementById('mebel');
const REMONT = DOC.getElementById('remont');
const START = DOC.getElementById('start');
const FIRST_M = DOC.getElementById('first_m');
const FIRST_R = DOC.getElementById('first_r');
const ABOUT_M = DOC.getElementById('about_m');
const ABOUT_R = DOC.getElementById('about_r');
const FEATURES_M = DOC.getElementById('features_m');
const FEATURES_R = DOC.getElementById('features_r');
const SERVICES_M = DOC.getElementById('services_m');
const PROJECTS_M = DOC.getElementById('projects_m');
const PROJECTS_R = DOC.getElementById('projects_r');
const PARTNERS_M = DOC.getElementById('partners_m');
const CONTACTS_M = DOC.getElementById('contacts_m');
const CONTACTS_R = DOC.getElementById('contacts_r');
const STAGES_R = DOC.getElementById('stages_r');
const PROCESS_R = DOC.getElementById('process_r');
const FORM_R = DOC.getElementById('form_r');
const FORM_M = DOC.getElementById('form_m');
let wheelDisabled = true;
let touchMoveDisabled = false;
let smoother = undefined;

// слайдеры и их прогресс
const SWIPERS = {
   features_m: {
      swiper: {},
      progress: 0
   },
   features_r: {
      swiper: {},
      progress: 0
   },
   projects_m: {
      swiper: {},
      progress: 0
   },
   projects_r: {
      swiper: {},
      progress: 0
   },
   process_r: {
      swiper: {},
      progress: 0
   },
   stages_r: {
      swiper: {},
      progress: 0
   }
}
// time line gsap
const tl_about = {
   about_m: {},
   about_r: {}
}
const tl_services = {
   services_m: {}
}
// для глобального отслеживания состояния начальной и конечной позиции прогресса
const progress = {
   about_m: {
      start: true,
      end: false
   },
   about_r: {
      start: true,
      end: false
   },
   features_m: {
      start: true,
      end: false
   },
   features_r: {
      start: true,
      end: false
   },
   projects_m: {
      start: true,
      end: false
   },
   projects_r: {
      start: true,
      end: false
   },
   services_m: {
      start: true,
      end: false
   },
   partners_m: {
      start: true,
      end: false
   },
   process_r: {
      start: true,
      end: false
   },
   stages_r: {
      start: true,
      end: false
   },
}

// ** ======================= CLICK ======================  ** //
DOC.documentElement.addEventListener("click", (event) => {
   if (event.target.closest('.cookie__agree')) {
      COOKIE.remove();
   }
   // управление меню
   if (event.target.closest('.header__button')) { toggleMenu() }
   if (!event.target.closest('.header__button') && !event.target.closest('.header__nav-list')) { closeMenu() }
   // навигация
   if (event.target.closest('.next-mebel')) {
      if (MIN1024.matches) {
         hideSections_L();
         showSectionNotAnimated(FIRST_M);
         hide_L(FIRST_R);
         hiddenStartScreen();
         activeMebelBranch();
         checkingActiveSection();
         return;
      }
      activeMebelBranch();
      hiddenStartScreen('mebel')
   }
   if (event.target.closest('.next-remont')) {
      if (MIN1024.matches) {
         hideSections_L();
         showSectionNotAnimated(FIRST_R);
         hide_L(FIRST_M)
         hiddenStartScreen();
         activeRemontBranch();
         checkingActiveSection();
         return;
      }
      activeRemontBranch();
      hiddenStartScreen('remont')
   }
   if (event.target.closest('.next-mebel-about')) { changeGsap_RL(ABOUT_M, '#about_ms', '#about_mc') }
   if (event.target.closest('.next-remont-about')) { changeGsap_RL(ABOUT_R, '#about_rs', '#about_rc') }
   // меню
   if (event.target.closest('[href^="#"] ')) {
      MIN1024.matches && event.preventDefault();
      closeMenu();
   }
   if (event.target.closest('.to-start')) {
      if (MIN1024.matches) {
         showStartScreen()
         return;
      }
      START.classList.remove('offset-left');
      closeMenu();
   }
   if (MIN1024.matches && event.target.closest('.to-about-m')) { changeGsap_RL(ABOUT_M, '#about_ms', '#about_mc') }
   if (MIN1024.matches && event.target.closest('.to-about-r')) { changeGsap_RL(ABOUT_R, '#about_rs', '#about_rc') }
   if (MIN1024.matches && event.target.closest('.to-features-m')) { change_RL(FEATURES_M) }
   if (MIN1024.matches && event.target.closest('.to-features-r')) { change_RL(FEATURES_R) }
   if (MIN1024.matches && event.target.closest('.to-services-m')) { changeGsap_RL(SERVICES_M, '#services_ms', '#services_mc') }
   if (MIN1024.matches && event.target.closest('.to-projects-m')) { change_RL(PROJECTS_M) }
   if (MIN1024.matches && event.target.closest('.to-projects-r')) { change_RL(PROJECTS_R) }
   if (MIN1024.matches && event.target.closest('.to-partners-m')) { changeGsap_RL(PARTNERS_M, '#partners_ms', '#partners_mc') }
   if (MIN1024.matches && event.target.closest('.to-contacts-m')) { change_RL(CONTACTS_M) }
   if (MIN1024.matches && event.target.closest('.to-contacts-r')) { change_RL(CONTACTS_R) }
   if (MIN1024.matches && event.target.closest('.to-stages-r')) { change_RL(STAGES_R) }
   if (MIN1024.matches && event.target.closest('.to-process-r')) { change_RL(PROCESS_R); }

   // переключение табов в контактах
   if (event.target.closest('.open-map')) { openMap(event) }
   if (event.target.closest('.open-form')) { closeMap(event) }
})

document.addEventListener('modal:open', () => {
   // отключить скролл слайдера
   if (isPC) {
      // console.log('projects swiper off');
      SWIPERS.projects_m.swiper.mousewheel.disable();
      SWIPERS.projects_r.swiper.mousewheel.disable();
      return;
   }
   touchMoveDisabled = true;
})
document.addEventListener('modal:close', () => {
   // включить скролл слайдера
   if (isPC) {
      // console.log('projects swiper on');
      SWIPERS.projects_m.swiper.mousewheel.enable();
      SWIPERS.projects_r.swiper.mousewheel.enable();
      return;
   }
   touchMoveDisabled = false;
})

function actionsNext() {
   if (active_section == 'about_m' && progress.about_m.end) {
      change_RL(FEATURES_M)
   }
   if (active_section == 'about_r' && progress.about_r.end) {
      change_RL(FEATURES_R)
   }
   if (active_section == 'features_m' && progress.features_m.end) {
      changeGsap_RL(SERVICES_M, '#services_ms', '#services_mc');
   }
   if (active_section == 'features_r' && progress.features_r.end) {
      change_RL(STAGES_R)
   }
   if (active_section == 'stages_r' && progress.stages_r.end) {
      change_RL(PROJECTS_R)
   }
   if (active_section == 'projects_m' && progress.projects_m.end) {
      changeGsap_RL(PARTNERS_M, '#partners_ms', '#partners_mc');
   }
   if (active_section == 'projects_r' && progress.projects_r.end) {
      change_RL(PROCESS_R);
   }
   if (active_section == 'services_m' && progress.services_m.end) {
      change_RL(PROJECTS_M)
   }
   if (active_section == 'partners_m' && progress.partners_m.end) {
      change_RL(CONTACTS_M)
   }

   if (active_section == 'process_r' && progress.process_r.end) {
      change_RL(CONTACTS_R)
   }
}


function actionsPrev() {
   if (active_section == 'about_m' && progress.about_m.start) {
      prevFirst(FIRST_M)
   }
   if (active_section == 'about_r' && progress.about_r.start) {
      prevFirst(FIRST_R);
   }
   if (active_section == 'features_m' && progress.features_m.start) {
      changeGsap_LR(ABOUT_M, '#about_ms', '#about_mc');
   }
   if (active_section == 'features_r' && progress.features_r.start) {
      changeGsap_LR(ABOUT_R, '#about_rs', '#about_rc');
   }
   if (active_section == 'stages_r' && progress.stages_r.start) {
      change_LR(FEATURES_R)
   }
   if (active_section == 'projects_m' && progress.projects_m.start) {
      changeGsap_LR(SERVICES_M, '#services_ms', '#services_mc')
   }
   if (active_section == 'projects_r' && progress.projects_r.start) {
      change_LR(STAGES_R)
   }
   if (active_section == 'services_m' && progress.services_m.start) {
      change_LR(FEATURES_M)
   }
   if (active_section == 'partners_m' && progress.partners_m.start) {
      change_LR(PROJECTS_M)
   }

   if (active_section == 'process_r' && progress.process_r.start) {
      change_LR(PROJECTS_R)
   }
   if (active_section == 'contacts_r') {
      change_LR(PROCESS_R);
   }
   if (active_section == 'contacts_m') {
      changeGsap_LR(PARTNERS_M, '#partners_ms', '#partners_mc');
   }
}

// wheel для смены экранов
if (isPC && MIN1024.matches) {
   // console.log('wheel active');
   window.addEventListener('wheel', function (event) {
      if (wheelDisabled) {
         event.preventDefault();
         return;
      }
      if (event.deltaY < 0) { actionsPrev() }
      if (event.deltaY > 0) { actionsNext() }
   }, { passive: false });
}

let startX = 0;
let startY = 0;
let threshold = 20;   // минимальное расстояние для определения жеста
if (!isPC && MIN1024.matches) {
   // console.log('touchMove active');

   DOC.addEventListener('touchstart', onTouchStart);
   DOC.addEventListener('touchend', onTouchEnd);

   function onTouchStart(event) {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
   }

   function onTouchEnd(event) {
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;
      detectGesture(endX, endY);
   }

   function detectGesture(endX, endY) {
      const diffX = endX - startX;
      const diffY = endY - startY;

      if (touchMoveDisabled) return; // отключение действий
      // Определяем направление
      if (Math.abs(diffX) > Math.abs(diffY)) {
         if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
               onSwipeRight();
            } else {
               onSwipeLeft();
            }
         }
      } else {
         if (Math.abs(diffY) > threshold) {
            if (diffY > 0) {
               onSwipeDown();
            } else {
               onSwipeUp();
            }
         }
      }
   }

   function onSwipeLeft() {
      actionsNext()
   }

   function onSwipeRight() {
      actionsPrev()
   }

   function onSwipeUp() {
      actionsNext()
   }

   function onSwipeDown() {
      actionsPrev()
   }
}

// управление прогрессом секциц
function gsapToStart(id) {
   if (smoother) {
      requestAnimationFrame(() => {
         smoother.scrollTo(0, false);
         if (progress[id]) {
            progress[id].start = true;
            progress[id].end = false;
         }
      })
   }
}
function gsapToEnd(id) {
   if (smoother) {
      requestAnimationFrame(() => {
         smoother.scrollTo(smoother.scrollTrigger.end, false);
         if (progress[id]) {
            progress[id].start = false;
            progress[id].end = true;
         }
      })
   }
}
function swiperToStart(id) {
   if (SWIPERS[id]) {
      SWIPERS[id].swiper.slideTo(0, 0);
   }
   if (progress[id]) {
      progress[id].start = true;
      progress[id].end = false;
   }
   checkingSliderLength(id)
}
function swiperToEnd(id) {
   if (SWIPERS[id]) {
      SWIPERS[id].swiper.slideTo(SWIPERS[id].swiper.slides.length - 1, 0);
   }
   if (progress[id]) {
      progress[id].start = false;
      progress[id].end = true;
   }
   checkingSliderLength(id)
}
function checkingSliderLength(id) {
   if (!SWIPERS[id]) return;
   if ((SWIPERS[id].swiper.isBeginning == true && SWIPERS[id].swiper.isEnd == true) == true) {
      const section = SWIPERS[id].swiper.el.closest(`#${id}`)
      offsetLabel(section, 0.5);
      setTimeout(() => {
         progress[id].start = true;
         progress[id].end = true;
      }, TRANSITION_TIME * 1.2)
   }
}
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
// пауза whill
function disabledWheel() {
   wheelDisabled = true;
   setTimeout(() => { wheelDisabled = false }, TRANSITION_TIME * 1.2)
}
// пауза thouch move
function disabledTouchMove() {
   touchMoveDisabled = true;
   setTimeout(() => { touchMoveDisabled = false }, TRANSITION_TIME * 1.2)
}
// переключение табов в контактах
function openMap(event) {
   const contacts = event.target.closest('.contacts');
   if (!contacts) return;
   const map = contacts.querySelector('.contacts__map');
   const form = contacts.querySelector('.contacts__form');
   if (map) map.style.display = 'block';
   if (form) form.style.display = 'none';
}
function closeMap(event) {
   const contacts = event.target.closest('.contacts');
   if (!contacts) return;
   const map = contacts.querySelector('.contacts__map');
   const form = contacts.querySelector('.contacts__form');
   if (map) map.style.display = 'none';
   if (form) form.style.display = 'block';
}
// маркировка направдения
function activeMebelBranch() {
   DOC.body.classList.add('mebel-branch');
   DOC.body.classList.remove('remont-branch');
   requestAnimationFrame(() => {
      tl_about.about_r.scrollTrigger.disable();
      tl_about.about_m.scrollTrigger.enable();
      tl_about.about_m.scrollTrigger.refresh();
      window.scrollTo(0, 0);
      // window.scrollTo({top: 0, behavior: 'instant'}); // без плавной прокрутки
   })
}
function activeRemontBranch() {
   DOC.body.classList.add('remont-branch');
   DOC.body.classList.remove('mebel-branch');
   requestAnimationFrame(() => {
      tl_about.about_m.scrollTrigger.disable();
      tl_about.about_r.scrollTrigger.enable();
      tl_about.about_r.scrollTrigger.refresh();
      window.scrollTo(0, 0);
      //  window.scrollTo({top: 0, behavior: 'instant'}); // без плавной прокрутки
   })
}
// функции навигации по блокам
function swowMebelMobile() {
   REMONT.classList.remove('active');
   MEBEL.classList.add('active');
}
function swowRemontMobile() {
   REMONT.classList.add('active');
   MEBEL.classList.remove('active');
}
function hiddenStartScreen(sectionName) {
   START.classList.add('offset-left');
   if (!MIN1024.matches) {
      if (sectionName && sectionName === 'mebel') swowMebelMobile();
      if (sectionName && sectionName === 'remont') swowRemontMobile();
   }
   window.scrollTo(0, 0);
}
function showStartScreen() {
   change_RL(START)
   setTimeout(() => {
      prepareScreen(FIRST_M);
      prepareScreen(FIRST_R);
   }, TRANSITION_TIME)
}
function prevFirst(element) {
   change_LR(element)
   if (isPC && smoother) smoother.paused(true);
}

function changeGsap_LR(element, s, c) {
   disabledWheel();
   setTimeout(() => {
      initScroll(s, c);
      gsapToEnd(element.id);
   }, TRANSITION_TIME * 0)
   change_LR(element);
   setTimeout(() => { if (isPC && smoother) smoother.paused(false) }, TRANSITION_TIME)
}
function changeGsap_RL(element, s, c) {
   disabledWheel();
   setTimeout(() => {
      initScroll(s, c);
      gsapToStart(element.id);
   }, TRANSITION_TIME * 0)
   change_RL(element);
   setTimeout(() => { if (isPC && smoother) smoother.paused(false) }, TRANSITION_TIME)
}
function change_LR(element) {
   if (isPC && MIN1024.matches) disabledWheel();
   if (!isPC && MIN1024.matches) disabledTouchMove();
   hideSections_R();
   swiperToEnd(element.id)
   showSection_LR(element);
}
function change_RL(element) {
   if (isPC && MIN1024.matches) disabledWheel();
   if (!isPC && MIN1024.matches) disabledTouchMove();
   hideSections_L()
   swiperToStart(element.id)
   showSection_RL(element);
}

// ************* служебные функции ******************

// показать без анимации
function showSectionNotAnimated(item) {
   item.style.transition = 'all 0s';
   item.classList.remove('offset-left');
   item.classList.remove('offset-right');
   active_section = item.id;
   requestAnimationFrame(() => {
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
   item.style.transition = 'all 0s';
   item.classList.remove('offset-left');
   item.classList.add('offset-right');
   active_section = item.id;
   requestAnimationFrame(() => {
      item.style.transition = '';
      item.classList.remove('offset-right');
      item.classList.add('active');
      checkingActiveSection();
   })
}
// показать секуию с анимацией слева направо
function showSection_LR(item) {
   item.style.transition = 'all 0s';
   item.classList.remove('offset-right');
   item.classList.add('offset-left');
   active_section = item.id;
   requestAnimationFrame(() => {
      item.style.transition = '';
      item.classList.remove('offset-left');
      item.classList.add('active');
      checkingActiveSection();
   })
}
function checkingActiveSection() {
   DOC.body.classList.toggle('first-screen-active', active_section === 'first_m' || active_section === 'first_r')
}
// прячет активную секцию налево
function hideSections_L() {
   if (isPC && smoother) smoother.paused(true);
   const section = DOC.querySelector('.section.active');
   if (!section) return;
   section.classList.add('offset-left');
   setTimeout(() => { section.classList.remove('active') }, TRANSITION_TIME)
}
// прячет активную секцию навправо
function hideSections_R() {
   if (isPC && smoother) smoother.paused(true);
   const section = DOC.querySelector('.section.active');
   if (!section) return;
   section.classList.remove('offset-left');
   section.classList.add('offset-right');
   setTimeout(() => { section.classList.remove('active') }, TRANSITION_TIME)
}
// прячет секцию налево
function hide_L(element) {
   element.classList.remove('offset-right');
   element.classList.add('offset-left');
}

// проверка заполнения форм
function checkingFormFilling(formItem) {
   formItem.addEventListener('submit', (event) => {
      event.preventDefault();
      let test = true;
      const inputs = formItem.querySelectorAll('.required');
      inputs.forEach((e) => {
         const value = e.querySelector('input').value.trim();
         if (!value) {
            e.classList.add('invalid');
            test = false;
         } else {
            e.classList.remove('invalid');
            e.classList.add('valid');
         }
      })
      if (test) formItem.submit();
   })
}

if (FORM_M) checkingFormFilling(FORM_M)
if (FORM_R) checkingFormFilling(FORM_R)

const inputsRequired = DOC.querySelectorAll('.required');
inputsRequired.forEach((e) => {
   const input = e.querySelector('input');
   input.addEventListener('input', (event) => {
      const value = event.target.value.trim();
      if (value.length > 0) {
         e.classList.remove('invalid');
         e.classList.add('valid');
      } else {
         e.classList.add('invalid');
         e.classList.remove('valid');
      }

   })
})


// перемещение блоков при адаптиве
// data-da=".class,3,768,min" 
// класс родителя куда перемещать
// порядковый номер в блоке куда перемещается начиная с 0 как индексы массива
// viewport
// min = min-width, max = max-width
// два перемещения: data-da=".class,3,768,min,.class2,1,1024,max"
const ARRAY_DATA_DA = document.querySelectorAll('[data-da]');
ARRAY_DATA_DA.forEach(function (e) {
   const dataArray = e.dataset.da.split(',');
   const addressMove = searchDestination(e, dataArray[0]);
   const addressMoveSecond = dataArray[4] && searchDestination(e, dataArray[4]);
   const addressParent = e.parentElement;
   const listChildren = addressParent.children;
   const direction = dataArray[3] || 'min';
   const directionSecond = dataArray[7] || 'min';
   const mediaQuery = window.matchMedia(`(${direction}-width: ${dataArray[2]}px)`);
   const mediaQuerySecond = dataArray[6] && window.matchMedia(`(${directionSecond}-width: ${dataArray[6]}px)`);
   for (let i = 0; i < listChildren.length; i++) { !listChildren[i].dataset.n && listChildren[i].setAttribute('data-n', `${i}`) };
   mediaQuery.matches && startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   if (mediaQuerySecond && mediaQuerySecond.matches) moving(e, dataArray[5], addressMoveSecond);
   mediaQuery.addEventListener('change', () => { startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) });
   if (mediaQuerySecond) mediaQuerySecond.addEventListener('change', () => {
      if (mediaQuerySecond.matches) { moving(e, dataArray[4], addressMoveSecond); return; };
      startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray);
   });
});

function startChange(mediaQuery, addressMove, e, listChildren, addressParent, dataArray) {
   if (mediaQuery.matches) { moving(e, dataArray[1], addressMove); return; }
   if (listChildren.length > 0) {
      for (let z = 0; z < listChildren.length; z++) {
         if (listChildren[z].dataset.n > e.dataset.n) {
            listChildren[z].before(e);
            break;
         } else if (z == listChildren.length - 1) {
            addressParent.append(e);
         }
      }
      return;
   }
   addressParent.prepend(e);
};

function searchDestination(e, n) {
   if (!e) return;
   if (e.classList.contains(n.slice(1))) { return e }
   if (e.parentElement && e.parentElement.querySelector(n)) { return e.parentElement.querySelector(n) };
   return searchDestination(e.parentElement, n);
}

function moving(e, order, addressMove) {
   if (order == "first") { addressMove.prepend(e); return; };
   if (order == "last") { addressMove.append(e); return; };
   if (addressMove.children[order]) { addressMove.children[order].before(e); return; }
   addressMove.append(e);
}



// gsap
function wrapLetters(element) {
   function wrapper(element) {
      const words = element.innerHTML.trim().split(' ');
      const wordWrap = words.map(item => { return item.split('').map(e => { return `<span class="letter">${e}</span>` }).join('') })
      element.innerHTML = `<span class="word">${wordWrap.join('</span>&#32;<span class="word"> ')}</span> `
      element.after(' ');
      return element;
   }
   const nodelist = Array.from(element.childNodes)
   let span = document.createElement('span');
   span.classList.add('letter');
   let accumulator = document.createElement('div');
   accumulator.append(span);
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
gsap.config({ force3D: false });
if (!isPC) {
   ScrollTrigger.config({
      autoRefreshEvents: "DOMContentLoaded,load", // Только эти события обновляют
      ignoreMobileResize: true, // Игнорировать ресайз на мобильных
   });
}

function initScroll(s, c) {
   if (smoother && smoother.vars.wrapper == s) return;
   smoother = ScrollSmoother.create({
      wrapper: s,
      content: c,
      smooth: isPC ? 1 : 0,
      normalizeScroll: isPC ? true : false,
      smoothTouch: 0.1, // Уменьшить для мобильных
      ignoreMobileResize: true,
   })
   // console.log('smoother init');

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
         ignoreMobileResize: true,
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
         // markers: {
         //    startColor: "green",
         //    endColor: "red",
         //    fontSize: "40px",
         //    fontWeight: "bold",
         //    indent: 20
         // },
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
const TRIGGER_LIST = document.querySelector('.trigger-services-list');
if (MIN1024.matches && SERVICES_TITLE && TRIGGER_LIST) {
   tl_services.services_m = gsap.timeline({
      scrollTrigger: {
         trigger: '.services-trigger',
         scroller: "#services_ms",
         start: "0% 0%",
         end: isPC ? '100% 100%' : '100% 99%',
         pin: '.services__title',
         pinType: isPC ? "transform" : "fixed",
         pinSpacing: false,
         scrub: true,
         // markers: {
         //    startColor: "green",
         //    endColor: "red",
         //    fontSize: "40px",
         //    fontWeight: "bold",
         //    indent: 20
         // },
         onUpdate: (self) => {
            // console.log(Number(self.progress.toFixed(5)));
            if (!MIN1024.matches) return;
            if (Number(self.progress.toFixed(5)) <= 0.01 && active_section === 'services_m') {
               progress.services_m.start = true;
               return;
            }
            if (Number(self.progress.toFixed(5)) >= 0.98 && active_section === 'services_m') {
               progress.services_m.end = true;
               return;
            }
            progress.services_m.start = false;
            progress.services_m.end = false;
         },
      },
   })
   if (!isPC && MIN1024.matches) tl_services.services_m.to(TRIGGER_LIST, { y: (TRIGGER_LIST.offsetHeight - SERVICES_TITLE.offsetHeight) * -1, ease: 'linear' })
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

if (!MIN1024.matches && DOC.querySelector('.stages__media')) {
   gsap.utils.toArray(".stages__media").forEach((item, index) => {
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
if (!MIN1024.matches && DOC.querySelector('.process__media')) {
   gsap.utils.toArray(".process__media").forEach((item, index) => {
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


// map
const mapContainer = document.querySelectorAll('.contacts__map');
const data = {
   coordinates: '37.541027, 55.807390 ',
}

function loadYMapsAPI() {
   return new Promise((resolve, reject) => {
      if (window.ymaps3) {
         resolve();
         // console.log(" API Яндекс Карт загружен");
         return;
      }
   });
}

async function initMap() {
   await loadYMapsAPI();
   await ymaps3.ready;
   const { YMap, YMapMarker, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

   const map_r = new YMap(
      mapContainer[1],
      {
         location: {
            center: data.coordinates.split(','),
            zoom: 17,
         }
      }, [
      new YMapDefaultSchemeLayer(),
      new YMapDefaultFeaturesLayer()
   ]
   );
   const markerTemplate_r = document.getElementById('marker_r');
   const markerClone_r = markerTemplate_r.content.cloneNode(true);
   const marker_r = new YMapMarker(
      {
         coordinates: data.coordinates.split(','),
      },
      markerClone_r
   );
   map_r.addChild(marker_r);

   const map_m = new YMap(
      mapContainer[0],
      {
         location: {
            center: data.coordinates.split(','),
            zoom: 17,
         }
      }, [
      new YMapDefaultSchemeLayer(),
      new YMapDefaultFeaturesLayer()
   ]
   );
   const markerTemplate_m = document.getElementById('marker_m');
   const markerClone_m = markerTemplate_m.content.cloneNode(true);
   const marker_m = new YMapMarker(
      {
         coordinates: data.coordinates.split(','),
      },
      markerClone_m
   );
   map_m.addChild(marker_m);
}

if (mapContainer.length > 0) initMap();

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

const eventModalOpen = new CustomEvent('modal:open', { bubbles: true });
const eventModalClose = new CustomEvent('modal:close', { bubbles: true });

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
      document.body.classList.add('modal-opened')
      document.dispatchEvent(eventModalOpen);
   }
}
function activeScrollCloseModal() {
   if (!document.querySelector('.js-modal-visible')) {
      document.body.classList.remove('modal-opened');
      document.dispatchEvent(eventModalClose);
   }
}


// swiper
//  ========== features ============
function addFeaturesSwiper(element, id) {
   const SWIPER = element.querySelector('.swiper');
   const LIST_TEXT = element.querySelectorAll('.features--text');
   const TEXT_BUTTON_PREV = element.querySelectorAll('.features__button.prev span');
   const TEXT_BUTTON_NEXT = element.querySelectorAll('.features__button.next span');
   SWIPERS[id].swiper = new Swiper(SWIPER, {
      direction: MIN1024.matches ? "vertical" : "horizontal",
      spaceBetween: 20,
      speed: 700,
      slidesPerView: MIN1024.matches ? 1.1 : 1,
      mousewheel: {
         enabled: true,
         eventsTarget: `#${id}`
      },
      navigation: {
         nextEl: SWIPER.querySelector(".next"),
         prevEl: SWIPER.querySelector(".prev"),
      },
      pagination: {
         el: element.querySelector('.features__pagination'),
         type: 'bullets',
         clickable: true,
      },
      on: {
         progress: function (swiper, progress) {
            SWIPERS[id].progress = progress;
         },
         transitionStart: function (swiper) {
            LIST_TEXT.forEach((e, i) => e.classList.toggle('active', swiper.activeIndex == i));
            TEXT_BUTTON_PREV.forEach((e, i) => e.classList.toggle('active', swiper.activeIndex == i));
            TEXT_BUTTON_NEXT.forEach((e, i) => e.classList.toggle('active', swiper.activeIndex == i));
         },
         transitionEnd: function (swiper) {
            if (SWIPERS[id].progress <= 0) {
               progress[id].start = true;
               return;
            }
            if (SWIPERS[id].progress >= 1) {
               progress[id].end = true;
               return;
            }
            if (SWIPERS[id].progress >= 0 && SWIPERS[id].progress <= 1) {
               progress[id].start = false;
               progress[id].end = false;
            }
         },
      }
   });
}

if (FEATURES_M) addFeaturesSwiper(FEATURES_M, 'features_m');
if (FEATURES_R) addFeaturesSwiper(FEATURES_R, 'features_r');

// ========== projects ==========
function initSwiperProject(element, id) {
   const projectsSwiper = element.querySelector('.swiper');
   SWIPERS[id].swiper = new Swiper(projectsSwiper, {
      spaceBetween: MIN1024.matches ? 50 : 20,
      speed: 400,
      slidesPerView: MIN1024.matches ? 2.5 : 1.1,
      grabCursor: true,

      mousewheel: {
         enabled: true,
         eventsTarget: '#' + id,
      },
      scrollbar: {
         el: element.querySelector(".projects__swiper-pagination-body"),
         draggable: true,
      },
      on: {
         init: function () {
            if (!MIN1024.matches) return;
            if ((this.isBeginning == true && this.isEnd == true) == true) {
               offsetLabel(element, 0.5);
               progress[id].start = true;
               progress[id].end = true;
               return;
            }
            progress[id].start = false;
            progress[id].end = false;
            if (SWIPERS[id].progress == 0) {
               progress[id].start = true;
            }
            if (SWIPERS[id].progress == 1) {
               progress[id].end = true;
            }
         },
         progress: function (swiper, progress) {
            if (!MIN1024.matches) return;
            if ((this.isBeginning == true && this.isEnd == true) == false) offsetLabel(element, progress);
            SWIPERS[id].progress = progress;
         },
         transitionEnd: function (swiper) {
            if (!MIN1024.matches) return;

            if (SWIPERS[id].progress == 0) {
               progress[id].start = true;
            }
            if (SWIPERS[id].progress == 1) {
               progress[id].end = true;
            }
            if (SWIPERS[id].progress > 0 && SWIPERS[id].progress < 1) {
               progress[id].start = false;
               progress[id].end = false;
            }
         },
      }
   });
}
// смещение надписи 
function offsetLabel(element, progress) {
   element.style.setProperty('--label', (progress * -100) + '%')
}
// добавление событий клика на клопки фильтрации слайдов
function addEventsProjects(element, id) {
   const BUTTONS_LIST = element.querySelectorAll('.projects__button');
   const LIST_SLIDES = element.querySelectorAll('.projects__slide');
   BUTTONS_LIST.forEach((e) => {
      e.addEventListener('click', (event) => {
         filterSlides(e, LIST_SLIDES, BUTTONS_LIST, SWIPERS[id].swiper, element, id)
      })
   })
}
// фильтрация слайдеров
function filterSlides(button, listSlides, listButtons, swiper, element, id) {
   const valueFilter = button.dataset.filter;
   if (!valueFilter) return;
   if (valueFilter === 'all' || valueFilter === '') {
      listSlides.forEach(e => { e.classList.remove('hidden') })
      updateProjectSwiper(swiper, element, id);
      changeButtonsActive(listButtons, button);
      return;
   }
   listSlides.forEach(e => {
      const filter = e.dataset.filter;
      e.classList.toggle('hidden', valueFilter !== filter);
   })
   updateProjectSwiper(swiper, element, id);
   changeButtonsActive(listButtons, button);
}
// смена активной кнопки
function changeButtonsActive(list, activeButton) {
   list.forEach(e => { e.classList.toggle('active', e === activeButton) })
}
// обновление слайдера после фильтрации
function updateProjectSwiper(swiper, element, id) {
   swiper.destroy(true, true);
   initSwiperProject(element, id);
}
if (PROJECTS_M) {
   initSwiperProject(PROJECTS_M, 'projects_m');
   addEventsProjects(PROJECTS_M, 'projects_m')
}
if (PROJECTS_R) {
   initSwiperProject(PROJECTS_R, 'projects_r');
   addEventsProjects(PROJECTS_R, 'projects_r')
}

// =========== stages, process ===========
function addSwiperFade(element, id) {
   const title = element.querySelector('.process__title');
   SWIPERS[id].swiper = new Swiper(element.querySelector('.swiper'), {
      spaceBetween: 0,
      slidesPerView: 1,
      speed: 0, // глючит > 0
      grabCursor: true,
      effect: "fade",
      // direction: "vertical", // глючит
      mousewheel: {
         enabled: isPC ? true : false,
         eventsTarget: '#' + id,
      },
      on: {
         init: function () {
            if (!MIN1024.matches) return;
            if (this.isBeginning == this.isEnd) {
               progress[id].start = true;
               progress[id].end = true;
            }
         },
         progress: function (swiper, progress) {
            if (!MIN1024.matches) return;
            SWIPERS[id].progress = progress;
         },
         transitionEnd: function (swiper) {
            if (!MIN1024.matches) return;
            if (title) title.classList.toggle('hide', SWIPERS[id].progress == 1); // прятать title
            if (SWIPERS[id].progress == 0) {
               setTimeout(() => { progress[id].start = true }, TRANSITION_TIME);
               return;
            }
            if (SWIPERS[id].progress == 1) {
               setTimeout(() => { progress[id].end = true }, TRANSITION_TIME);
               return;
            }
            if (SWIPERS[id].progress > 0 && SWIPERS[id].progress < 1) {
               setTimeout(() => {
                  progress[id].start = false;
                  progress[id].end = false;
               }, TRANSITION_TIME)
            }
         },
      }
   });
}
function addEvensProcess(element, swiper) {
   const listButtons = element.querySelectorAll('.process__button button');
   listButtons.forEach((e) => {
      e.addEventListener('click', () => { swiper.slideNext() })
   })

}
if (MIN1024.matches && STAGES_R) addSwiperFade(STAGES_R, 'stages_r');
if (MIN1024.matches && PROCESS_R) addSwiperFade(PROCESS_R, 'process_r');
if (MIN1024.matches && PROCESS_R) addEvensProcess(PROCESS_R, SWIPERS.process_r.swiper)


