
// var dc = {
//   "type": "Feature",
//   "properties": {},
//   "geometry": {
//     "type": "LineString",
//     "coordinates": [
//       [-77.031669, 38.878605],
//       [-77.029609, 38.881946],
//       [-77.020339, 38.884084],
//       [-77.025661, 38.885821],
//       [-77.021884, 38.889563],
//       [-77.019824, 38.892368]
//     ]
//   }
// };

// var length = turf.lineDistance(dc, 'miles');

// alert(length);



 L.mapbox.accessToken = 'pk.eyJ1IjoiY2FzZXljdXBwIiwiYSI6ImNpZnN3Z3RyaTBiNTF0dG0xbmNvaTJ6YzMifQ.6FbXdEnio8oBeNBh2GcyPQ';
 var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([20, -84.50], 6);

var caCapitalLayerTwo = L.mapbox.featureLayer(capitalCitiesTwo)
    .addTo(map);

     caCapitalLayerTwo.setStyle({color: 'red'});


 var caCapitalLayerOne = L.mapbox.featureLayer(capitalCitiesOne, {                          
                 pointToLayer: function(feature, latlng) {
                     return L.circleMarker(latlng, {
                        radius: 8,
                        fillColor: '#458B00',
                        color: '#000',
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });
                 }
             });

caCapitalLayerOne.addTo(map);




    map.fitBounds(caCapitalLayerTwo.getBounds());

     caCapitalLayerTwo.eachLayer(function (layer) {
    layer.bindPopup(layer.feature.properties.name, { 
      closeButton: false });
  }).addTo(map);

         caCapitalLayerOne.eachLayer(function (layer) {
    layer.bindPopup(layer.feature.properties.name, { closeButton: false });
  }).addTo(map);

 caCapitalLayerTwo.on('mouseover', function (e) {
    e.layer.openPopup();
  });

 caCapitalLayerOne.on('mouseover', function (e) {
    e.layer.openPopup();
  });



 caCapitalLayerOne.on('click', function (e) {
  // Get the GeoJSON from libraryFeatures and hospitalFeatures
  var libraryFeatures = caCapitalLayerOne.getGeoJSON();
  var hospitalFeatures = caCapitalLayerTwo.getGeoJSON();

  // Using Turf, find the nearest hospital to library clicked
  var nearestHospital = turf.nearest(e.layer.feature, hospitalFeatures);

  // Change the nearest hospital to a large marker
  nearestHospital.properties['marker-size'] = 'large';

var myLatLng = [nearestHospital.geometry.coordinates[1],nearestHospital.geometry.coordinates[0]];
  var popup = L.popup()
    .setLatLng(myLatLng)
    .setContent('<p>Hello<br />This is the Closest Two Word Capital to' +  e.layer.feature.properties.name + ' </p>')
    .openOn(map);


  // Add the new GeoJSON to hospitalLayer
 // caCapitalLayerTwo.setGeoJSON(hospitalFeatures);
});