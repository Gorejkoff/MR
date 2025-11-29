

if (FEATURES_M) {

   const FEATURES_M_SWIPER = FEATURES_M.querySelector('.swiper');
   const FEATURES_M_LIST_TEXT = document.querySelectorAll('.features--text');
   const FEATURES_M_TEXT_BUTTON_PREV = document.querySelectorAll('.features__button.prev span');
   const FEATURES_M_TEXT_BUTTON_NEXT = document.querySelectorAll('.features__button.next span');
   //  ========== features_m ============
   let proggressFeaturesM = 0;
   var featuresMSwiper = new Swiper(FEATURES_M_SWIPER, {
      //   allowTouchMove: false,
      direction: MIN1024.matches ? "vertical" : "horizontal",
      spaceBetween: 20,
      speed: 700,
      slidesPerView: MIN1024.matches ? 1.1 : 1,
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
}
// ========== projects_m ==========
const PROJECTS_M_SWIPER = PROJECTS_M.querySelector('.swiper');
let proggressProjectsM = 0;
let projects_m_swiper_item;
function initSwiperProjectM() {
   projects_m_swiper_item = new Swiper(PROJECTS_M_SWIPER, {
      spaceBetween: MIN1024.matches ? 50 : 20,
      speed: 700,
      slidesPerView: MIN1024.matches ? 2.5 : 1.1,
      grabCursor: true,
      mousewheel: {
         enabled: true,
         eventsTarget: '.projects__swiper'
      },
      scrollbar: {
         el: ".projects__swiper-pagination-body",
         draggable: true,
      },
      on: {
         init: function () {
            if (!MIN1024.matches) return;
            if (this.isBeginning == this.isEnd) {
               startProgressProjectM = true;
               endProgressProjectM = true;
            }
         },
         progress: function (swiper, progress) {
            if (!MIN1024.matches) return;
            proggressProjectsM = progress;
         },
         transitionEnd: function (swiper) {
            if (!MIN1024.matches) return;
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
   projects_m_swiper_item.destroy(true, true);
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
