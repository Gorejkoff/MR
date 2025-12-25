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
initMap();
