// map
const mapContainer = document.querySelectorAll('.contacts__map');
const data = {
   coordinates: '37.541027, 55.807390 ',
}

function loadYMapsAPI() {
   return new Promise((resolve, reject) => {
      if (window.ymaps3) {
         resolve();
         console.log(" API Яндекс Карт загружен");
         return;
      }
   });
}

async function initMap() {
   await loadYMapsAPI();
   await ymaps3.ready;
   const { YMap, YMapMarker, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } = ymaps3;

   mapContainer.forEach(e => {
      try {
         const markerName = e.closest('#remont') ? 'marker_r' : e.closest('#mebel') ? 'marker_m' : undefined;
         if (!markerName) {
            throw new Error('Ошибка карты');
         }
         const map = new YMap(
            e,
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
         const markerTemplate_r = document.getElementById(markerName);
         const markerClone_r = markerTemplate_r.content.cloneNode(true);
         const marker = new YMapMarker(
            {
               coordinates: data.coordinates.split(','),
            },
            markerClone_r
         );
         map.addChild(marker);
      } catch (error) {
         console.error(error)
         console.error('Ошибка карты')
      }
   })


   // if (mapContainer[0]) {
   //    const map_m = new YMap(
   //       mapContainer[0],
   //       {
   //          location: {
   //             center: data.coordinates.split(','),
   //             zoom: 17,
   //          }
   //       }, [
   //       new YMapDefaultSchemeLayer(),
   //       new YMapDefaultFeaturesLayer()
   //    ]
   //    );
   //    try {
   //       const markerTemplate_m = document.getElementById('marker_m');
   //       const markerClone_m = markerTemplate_m.content.cloneNode(true);
   //       const marker_m = new YMapMarker(
   //          {
   //             coordinates: data.coordinates.split(','),
   //          },
   //          markerClone_m
   //       );
   //       map_m.addChild(marker_m);
   //    } catch (error) {
   //       console.error(error)
   //       console.error('Ошибка загрузки маркера на карте')
   //    }

   // }
}

if (mapContainer.length > 0) initMap();
