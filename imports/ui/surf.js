import { Template } from 'meteor/templating';
import './surf.html';
//import {Search} from '../api/search.js';


Meteor.startup(function() {  
  GoogleMaps.load({
    key:'AIzaSyCB9qUBo50rpFgUHxxbX-ASY951y8mRJOg',
    libraries: 'places, geometry'  // also accepts an array if you need more than one
  });
});


Template.findplaces.onRendered(function() {
  this.autorun(function () {
    var latLng = Geolocation.latLng();
    console.log(latLng);
    if (GoogleMaps.loaded() && latLng) {
      
      Session.set('selectedLocation',latLng);
      
      var input = document.getElementById('locationpick');
      var searchBox = new google.maps.places.Autocomplete(input);
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('place_changed', function() {
        var places = searchBox.getPlace();
        var setLatLng = new Object();
        setLatLng.lat = places.geometry.location.lat();
        setLatLng.lng = places.geometry.location.lng();
        //Session.set('selectedLocation',setLatLng);
        console.log(setLatLng);

        var desireChoice = document.getElementById('desire').value;
        Session.set('desireChoice',desireChoice);
        Meteor.call('search', setLatLng, desireChoice,function(error,result){
          if(error){
            console.log(error.reason);
            return;
          }
          var distanceBetweenUs = new Array();
          distanceBetweenUs = result;
          Session.set('distanceBetweenUs',distanceBetweenUs);
          return distanceBetweenUs;
        });
        Router.go('/results/'+ desireChoice+ "&lat="+setLatLng.lat + "&lng"+setLatLng.lng,
          {data:function(){
            return setLatLng;
          }
        });

        if (places.length == 0) {
          return;
        };
      });

    };
  });
});

Template.surf.events({
  'submit .new-search'(event){
    event.preventDefault();
    //console.log(event);
    var desireChoice=event.target.desire.value;
    Session.set('desireChoice',desireChoice);
    var locationChoice=Session.get('selectedLocation');
    //console.log(desireChoice);
    console.log(locationChoice);  
    
    Meteor.call('search', locationChoice, desireChoice,function(error,result){
      if(error){
        console.log(error.reason);
        return;
      }
      var distanceBetweenUs = new Array();
      distanceBetweenUs = result;
      Session.set('distanceBetweenUs',distanceBetweenUs);
      return distanceBetweenUs;
    });

    Router.go('/results/'+ desireChoice+ "&lat="+locationChoice.lat + "&lng"+locationChoice.lng,
      {data:function(){
        return locationChoice;
      }
    });
  }
});
