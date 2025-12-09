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
      console.log('projects swiper off');
      SWIPERS.projects_m.swiper.mousewheel.disable();
      SWIPERS.projects_r.swiper.mousewheel.disable();
      return;
   }
   touchMoveDisabled = true;
})
document.addEventListener('modal:close', () => {
   // включить скролл слайдера
   if (isPC) {
      console.log('projects swiper on');
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
   console.log('wheel active');
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
   console.log('touchMove active');

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
   if (SWIPERS[id]) SWIPERS[id].swiper.slideTo(0, 0);
   if (progress[id]) {
      progress[id].start = true;
      progress[id].end = false;
   }
}
function swiperToEnd(id) {
   if (SWIPERS[id]) SWIPERS[id].swiper.slideTo(SWIPERS[id].swiper.slides.length - 1, 0);
   if (progress[id]) {
      progress[id].start = false;
      progress[id].end = true;
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
      console.log(active_section);
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
      console.log(active_section);
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

checkingFormFilling(FORM_M)
checkingFormFilling(FORM_R)

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

