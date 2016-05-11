import { Template } from 'meteor/templating';
import './surf.html';
import {Search} from '../api/search.js';

var MAP_ZOOM = 20;

Meteor.startup(function() {  
  GoogleMaps.load({
    key:'AIzaSyCB9qUBo50rpFgUHxxbX-ASY951y8mRJOg',
    libraries: 'places, geometry'  // also accepts an array if you need more than one
  });
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
    }
  }
		
});

// Template.findplaces.helpers({
//   mapOptions: function() {
//     var latLng = Geolocation.latLng();
//     // Initialize the map once we have the latLng.
//     if (GoogleMaps.loaded() && latLng) {
//       return {
//         center: new google.maps.LatLng(latLng.lat, latLng.lng),
//         zoom: MAP_ZOOM
//       };
//     }   
//   }
// })
// Template.findplaces.onCreated(function() {  
//   GoogleMaps.ready('findplaces', function(map) {
//     var latLng = Geolocation.latLng();

//     var marker = new google.maps.Marker({
//       position: new google.maps.LatLng(latLng.lat, latLng.lng),
//       map: map.instance,
//       draggable: true
//     });
//   });
// });

Template.findplaces.onCreated(function() {
  this.autorun(function () {
    var latLng = Geolocation.latLng();
    if (GoogleMaps.loaded() && latLng) {
      
      Session.set('selectedLocation',latLng);
      var mappy = $("input").geocomplete({
        //map: ".location-container",
        markerOptions: {  
          draggable: false
        },
        mapOptions:{
          zoom:15,
          center: latLng,
          scrollwheel: true
        },
        // details: "#my_form"

      })
      .bind("geocode:result",function(event,result){
        console.log(result.geometry.location.lat());
        console.log(result.geometry.location.lng());
        var setLatLng = new Object();
        setLatLng.lat=result.geometry.location.lat();
        setLatLng.lng=result.geometry.location.lng();
        Session.set('selectedLocation',setLatLng);
      });
      console.log(mappy);
    }
  });
});

Template.surf.events({
  'submit .new-search'(event){
    event.preventDefault();
    console.log(event);
    var desireChoice=event.target.desire.value;
    var locationChoice=Session.get('selectedLocation');
    console.log(desireChoice);
    console.log(locationChoice);  
    
    Meteor.call('search', locationChoice, desireChoice)

    Router.go('/results/'+ desireChoice+ "&lat="+locationChoice.lat + "&lng"+locationChoice.lng,
      {data:function(){
        return locationChoice;
      }
    });
  }
});