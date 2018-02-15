var map, infoWindow, n;

// circle around marker
function arePointsNear(checkPoint, centerPoint, km) {
  var ky = 40000 / 360;
  var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
  var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 59.313335,
      lng: 18.107858
    },
    zoom: 18,
    mapTypeControl: false,
    styles:[{"elementType":"geometry","stylers":[{"color":"#ebe3cd"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#523735"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f1e6"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#c9b2a6"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.stroke","stylers":[{"color":"#dcd2be"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#ae9e90"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#93817c"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#a5b076"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#447530"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#f5f1e6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#fdfcf8"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#f8c967"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#e9bc62"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry","stylers":[{"color":"#e98d58"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.stroke","stylers":[{"color":"#db8555"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#806b63"}]},{"featureType":"transit","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"transit.line","elementType":"labels.text.fill","stylers":[{"color":"#8f7d77"}]},{"featureType":"transit.line","elementType":"labels.text.stroke","stylers":[{"color":"#ebe3cd"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#dfd2ae"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#b9d3c2"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#92998d"}]
    }
    ]
  });


const getAllMarkers = 'http://localhost:3000/api/getmarkers/';
fetch(getAllMarkers)
.then(function(response) {
  if(response.ok) {
    response.json()
  .then(function(json) {
      var markers = json.Users;
  
// TODO: Add google stuff here
infoWindow = new google.maps.InfoWindow;
  
 var userlocation = null;

  var id;
  if (navigator.geolocation) {
    id = navigator.geolocation.watchPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        EnableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0,
        distanceFilter: 1,
      };

        infoWindow.setPosition(pos);
        infoWindow.setContent('<img src="' + 'img/icon1.png' +  '"/>');
        infoWindow.open(map);
        map.setCenter(pos);

        var markerobjects = [];
      //foreach loop will check in which marker and convert into object. 
      //its the same array as location but with objects in it. 
      //console.log(locations);
      markers.forEach( (element) =>{
        var title = ""+ element.id;
        var latlng = {lat: Number(element.marker_lat), lng: Number(element.marker_lng)};        
        markerobjects.push(latlng);        
        n = arePointsNear(pos, latlng, 0.02); 
        console.log(latlng);
        

          //This will check how many markers are there in location array

         var questionMarker = './img/checkpoint.png';
         var marker = new google.maps.Marker({
           position: latlng,
           title: title,
           animation: google.maps.Animation.DROP,
           id: i,
           map: map,
           icon: questionMarker
         });


        if (n === true) { 
          //Because markerobjects and locations are the same we will remove marker then from location array. 
          var currentMarker = latlng;
          var match = markerobjects.indexOf(currentMarker);
          console.log(match);


          //var match = locations.indexOf(currentMarker);   
          console.log(match);
          $('#\\#myModal').modal('show');
          //locations.splice(match, 1);     
          //console.log(locations); 
          
       } else {
          //console.log('Your position doesnt match');
          // break;
        }
      });

    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });

  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
     
    });
  } else {
    console.log('Network request for products.json failed with response ');
  }
});

}