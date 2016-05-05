import { Template } from 'meteor/templating';
import './surf.html';

var MAP_ZOOM = 20;

Meteor.startup(function() {  
  GoogleMaps.load();
});

Template.map.helpers({  
  geolocationError: function() {
    var error = Geolocation.error();
    return error && error.message;
  },
  mapOptions: function() {
    var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      document.getElementById("location").innerHTML = [latLng.lat]; 
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
    
  }
});

Template.map.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: map.instance
    });
  });
});

Template.placesa.helpers({
	jimm: function(){
    var latLng = Geolocation.latLng();
    if (GoogleMaps.loaded() && latLng) {
      console.log(latLng);
    return latLng
    // var a = {
    //   "lat": 123,
    //   "lng": 312
    // }
    }
  }
		
});
