
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
            console.log('transitionEnd');
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
      speed: 700,
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
         // touchMove: function (swiper, event) {
         //    // console.log(event);
         // }
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
