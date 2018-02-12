
var map, infoWindow, n;

// Create a new blank array for all the listing markers.
var markers = [];

//users Current location
var userPosition = [];

//All markers from the list only cordinates lat lng
var allMarkers = [];
//Correct answers
var correctAnswer = [];

var newArray2 = [];
var spliced = [];

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
    styles:  [
{
"elementType": "geometry",
"stylers": [
  {
    "color": "#ebe3cd"
  }
]
},
{
"elementType": "labels.text.fill",
"stylers": [
  {
    "color": "#523735"
  }
]
},
{
"elementType": "labels.text.stroke",
"stylers": [
  {
    "color": "#f5f1e6"
  }
]
},
{
"featureType": "administrative",
"elementType": "geometry.stroke",
"stylers": [
  {
    "color": "#c9b2a6"
  }
]
},
{
"featureType": "administrative.land_parcel",
"elementType": "geometry.stroke",
"stylers": [
  {
    "color": "#dcd2be"
  }
]
},
{
"featureType": "administrative.land_parcel",
"elementType": "labels.text.fill",
"stylers": [
  {
    "color": "#ae9e90"
  }
]
},
{
"featureType": "landscape.natural",
"elementType": "geometry",
"stylers": [
  {
    "color": "#dfd2ae"
  }
]
},
{
"featureType": "poi",
"elementType": "geometry",
"stylers": [
  {
    "color": "#dfd2ae"
  }
]
},
{
"featureType": "poi",
"elementType": "labels.icon",
"stylers": [
  {
    "visibility": "off"
  }
]
},
{
"featureType": "poi",
"elementType": "labels.text.fill",
"stylers": [
  {
    "color": "#93817c"
  }
]
},
{
"featureType": "poi.business",
"elementType": "labels.icon",
"stylers": [
  {
    "visibility": "off"
  }
]
},
{
"featureType": "poi.park",
"elementType": "geometry.fill",
"stylers": [
  {
    "color": "#a5b076"
  }
]
},
{
"featureType": "poi.park",
"elementType": "labels.text.fill",
"stylers": [
  {
    "color": "#447530"
  }
]
},
{
"featureType": "road",
"elementType": "geometry",
"stylers": [
  {
    "color": "#f5f1e6"
  }
]
},
{
"featureType": "road",
"elementType": "labels.icon",
"stylers": [
  {
    "visibility": "off"
  }
]
},
{
"featureType": "road.arterial",
"elementType": "geometry",
"stylers": [
  {
    "color": "#fdfcf8"
  }
]
},
{
"featureType": "road.highway",
"elementType": "geometry",
"stylers": [
  {
    "color": "#f8c967"
  }
]
},
{
"featureType": "road.highway",
"elementType": "geometry.stroke",
"stylers": [
  {
    "color": "#e9bc62"
  }
]
},
{
"featureType": "road.highway.controlled_access",
"elementType": "geometry",
"stylers": [
  {
    "color": "#e98d58"
  }
]
},
{
"featureType": "road.highway.controlled_access",
"elementType": "geometry.stroke",
"stylers": [
  {
    "color": "#db8555"
  }
]
},
{
"featureType": "road.local",
"elementType": "labels.text.fill",
"stylers": [
  {
    "color": "#806b63"
  }
]
},
{
"featureType": "transit",
"elementType": "labels.icon",
"stylers": [
  {
    "visibility": "off"
  }
]
},
{
"featureType": "transit.line",
"elementType": "geometry",
"stylers": [
  {
    "color": "#dfd2ae"
  }
]
},
{
"featureType": "transit.line",
"elementType": "labels.text.fill",
"stylers": [
  {
    "color": "#8f7d77"
  }
]
},
{
"featureType": "transit.line",
"elementType": "labels.text.stroke",
"stylers": [
  {
    "color": "#ebe3cd"
  }
]
},
{
"featureType": "transit.station",
"elementType": "geometry",
"stylers": [
  {
    "color": "#dfd2ae"
  }
]
},
{
"featureType": "water",
"elementType": "geometry.fill",
"stylers": [
  {
    "color": "#b9d3c2"
  }
]
},
{
"featureType": "water",
"elementType": "labels.text.fill",
"stylers": [
  {
    "color": "#92998d"
  }
]
}
]
  });

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = [
    // {
    //   title: 'Skolan 607', location: { lat: 59.3134, lng: 18.1108 }
    // },
    { title: 'Skolan', location: { lat: 59.313303, lng: 18.110104 }
    },
    { title: 'Boule & Berså', location: { lat: 59.3139, lng: 18.1061 }
    },
    { title: 'Pizzerian på andra sidan bron', location: { lat: 59.3124, lng: 18.1065 }
    },
    { title: 'Gula huset, Manngrynskvarnen', location: { lat: 59.3142, lng: 18.1106 }
    },
    { title: 'Henriksdals Station, mot Slussen', location: { lat: 59.3123, lng: 18.1079 }
    }
  ];


  infoWindow = new google.maps.InfoWindow;
  
 var userlocation = null;

  var id;
  if (navigator.geolocation) {
    id = navigator.geolocation.watchPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        nableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 0,
        distanceFilter: 1
      };
      if (userlocation != null) {
          userlocation.setPosition(pos); 
        } else {
          userlocation = new google.maps.Marker({
          position: pos,
          map: map,
          icon: 'icon1.png',
          animation: google.maps.Animation.DROP
          });
          userlocation.setPosition(pos);
        }
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);

      
      map.setCenter(pos);
       navigator.geolocation.clearWatch(id);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });


  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
  

      // fetch('http://localhost:3000/getposts')
      // Access-Control-Allow-Origin *
      // then((res) => res.json())
      // .then(data => obj = data)
      // .then(console.log)
      // .then(() => console.log(obj));
      
    



    newArray2.push(position);


//check usersposition

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
 
    //Loops through allMarkers and alerts if userposition is <= 20m of any marker in allMarkers array
    for (var i = 0; i < newArray2.length; i++) {
      n = arePointsNear(pos, newArray2[i], 0.02);
      
      if (n) {          
        $('#\\#myModal').modal('show');
        //console.log(locations[i].location);
        newArray2.splice(newArray2[i], 1);
        //var answers = [];

        // if(correctAnswer) {
        //   answers += 1; 
        //   if(answers >= 5){
        //      console.log()
        //   }
        // }

        break;
        //console.log(n);
      } else {
        alert('Your position doesnt match');
        break;
      }
    }


   for (var i = 0; i < newArray2.length; i++) {
     //lat and lng can we get from api
    var latlng = {lat: newArray2[i].lat,   lng: newArray2[i].lng};
    var questionMarker = './img/checkpoint.png';
    var marker = new google.maps.Marker({
      position: latlng,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i,
      map: map,
      icon: questionMarker
    });
  }
    // Push the marker to our array of markers.
    markers.push(marker);
    console.log(markers.location);
    
    

    });
    document.getElementById('show-listings').addEventListener('click', showListings);
    document.getElementById('hide-listings').addEventListener('click', hideListings);
  }
 }
}

// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < newArray2.length; i++) {
    newArray2[i].setMap(map);
    bounds.extend(newArray2[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
};