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

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = [
[59.3134, 18.1108], 
[59.313303, 18.110104], 
[59.3139, 18.1061],
[59.3124, 18.1065],
[59.3142, 18.1106] ,
[59.3123, 18.1079]   
];
locations.forEach( (element) =>{
  //console.log({lat: element[0], lng: element[1]});
});

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
        //infoWindow.setContent('<img src="' + 'img/icon1.png' +  '"/>');
        //infoWindow.open(map);
        map.setCenter(pos);

        var markerobjects = [];
      //foreach loop will check in which marker and convert into object. 
      //its the same array as location but with objects in it. 
      //console.log(locations);
      locations.forEach( (element) =>{
        var latlng = {lat: element[0], lng: element[1]};        
        markerobjects.push(latlng);        
        n = arePointsNear(pos, latlng, 0.02); 
        

        //for (var i = 0; i < locations.length; i++) {
          //This will check how many markers are there in location array
          //latlng = {lat: locations[i][0],  lng: locations[i][1]};

         var questionMarker = './img/checkpoint.png';
         var marker = new google.maps.Marker({
           position: latlng,
           title: title,
           animation: google.maps.Animation.DROP,
           id: i,
           map: map,
           icon: questionMarker
         });

         var userIcon = 'img/icon1.png';
         var marker = new google.maps.Marker({
           position: pos,
           title: title,
           animation: google.maps.Animation.DROP,
           id: i,
           map: map,
           icon: userIcon
         });

       //}

        if (n === true) { 
          //Because markerobjects and locations are the same we will remove marker then from location array. 
          var currentMarker = latlng;
          var match = markerobjects.indexOf(currentMarker);
          console.log(match);


          //var match = locations.indexOf(currentMarker);   
          console.log(match);
          $('#\\#myModal').modal('show');
          //locations.splice(match, 1);     
          console.log(locations); 
          
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

  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    console.log(position);
    var title = locations[i].title;

 }
}







      // for (var i = 0; i < locations.length; i++) {
      //   //lat and lng can we get from api
      //  var latlng = {lat: locations[i][0],  lng: locations[i][1]};
      //  console.log(latlng);

      //   n = arePointsNear(pos, latlng, 0.02);
      //   console.log(n);

      //   if (n) {          
      //     $('#\\#myModal').modal('show');
      //     //console.log(locations[i].location);
      //     // newArray2.splice(newArray2[i], 1);
      //     break;    
      //     //console.log(n);
      //   } else {
      //     alert('Your position doesnt match');
      //     break;
      //   }
      // }
//check usersposition

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     var pos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     };
 

//   //  for (var i = 0; i < locations.length; i++) {
//   //    //lat and lng can we get from api
//   //   var latlng = {lat: locations[i][0],  lng: locations[i][1]};
//   //   //console.log(latlng);
//   //   var questionMarker = './img/checkpoint.png';
//   //   var marker = new google.maps.Marker({
//   //     position: latlng,
//   //     title: title,
//   //     animation: google.maps.Animation.DROP,
//   //     id: i,
//   //     map: map,
//   //     icon: questionMarker
//   //   });
//   // }
//     // Push the marker to our array of markers.
//     markers.push(marker);
//     console.log(markers.location);
    
    

//     });
//     // document.getElementById('show-listings').addEventListener('click', showListings);
//     // document.getElementById('hide-listings').addEventListener('click', hideListings);
//   }

// This function will loop through the markers array and display them all.
// function showListings() {
//   var bounds = new google.maps.LatLngBounds();
//   // Extend the boundaries of the map for each marker and display the marker
//   for (var i = 0; i < newArray2.length; i++) {
//     newArray2[i].setMap(map);
//     bounds.extend(newArray2[i].position);
//   }
//   map.fitBounds(bounds);
// }

// // This function will loop through the listings and hide them all.
// function hideListings() {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
// };