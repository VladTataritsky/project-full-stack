const mapFn = (place) => {
  document.getElementById('map').innerHTML = '';
  ymaps.ready(init);

  function init () {
    let myMap = new ymaps.Map('map', {
      center: [55.753994, 37.622093],
      zoom: 9
    });

    ymaps.geocode(place, {
      results:
        1
    }).then(function (res) {
      let firstGeoObject = res.geoObjects.get(0),
        bounds = firstGeoObject.properties.get('boundedBy');

      firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
      firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
      myMap.geoObjects.add(firstGeoObject);
      myMap.setBounds(bounds, {
        checkZoomRange: true
      });
    });
  }
}
