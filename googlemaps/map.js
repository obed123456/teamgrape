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
    styles:[{"featureType":"all","elementType":"all","stylers":[{"saturation":"32"},{"lightness":"-3"},{"visibility":"on"},{"weight":"1.18"}]},{"featureType":"administrative","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"saturation":"-70"},{"lightness":"14"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"saturation":"100"},{"lightness":"-14"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"off"},{"lightness":"12"}]}]
  });
//Get all markers from db 
const getAllMarkers = 'http://localhost:3000/api/getmarkers/';
fetch(getAllMarkers)
.then(function(response) {
  if(response.ok) {
    response.json()
  .then(function(json) {
      var markers = json.Users;
  
// Add google stuff here
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
      markers.forEach( (element) => {
        var title = "" + element.id;
        var latlng = {lat: Number(element.marker_lat), lng: Number(element.marker_lng)};       
        markerobjects.push(latlng);        
        n = arePointsNear(pos, latlng, 0.02);      

          //This will check how many markers are there in location array

         var questionMarker = './img/checkpoint.png';
         var marker = new google.maps.Marker({
           position: latlng,
           title: title,
           animation: google.maps.Animation.DROP,
           map: map,
           icon: questionMarker
         });

  

        if (n) { 
          //Because markerobjects and locations are the same we will remove marker then from location array. 
          var currentMarker = latlng;
          //Here we get position of the closed marker
          var match = markerobjects.indexOf(currentMarker);
          //takenMarkers.push(markerobjects[match]);
          //var match = locations.indexOf(currentMarker);   
          $(document).ready(function(){  
            document.getElementById("myButton").style.background='#22db22';
              $('button.btn-primary.knapp').text('Answer Question');
            
          
          document.getElementById('myButton').onclick = function(){
             $('#\\#myModal').modal('show');
              setTimeout(function(){
              $('#\\#myModal').modal('hide'); 
              }, 99000);}	
          });   
          
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