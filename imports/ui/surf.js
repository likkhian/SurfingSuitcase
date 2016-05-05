import { Template } from 'meteor/templating';
import './surf.html';

Template.datepick.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	defaultDate:moment(),
    	format:'L'
    });
});

Template.timepick.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
    	defaultDate:moment().add(1,'hour').startOf('hour'),
    	format: 'LT'
    });
});

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
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: MAP_ZOOM
      };
    }
    document.getElementById("location").innerHTML = [String(Geolocation.latLng(latLng.lat))]; 
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
    console.log(latLng)
    return lagLng
    // var a = {
    //   "lat": 123,
    //   "lng": 312
    // }
    }
		
});
