import { Template } from 'meteor/templating';
import './surf.html';
//import {Search} from '../api/search.js';


Meteor.startup(function() {  
  GoogleMaps.load({
    key:'AIzaSyCB9qUBo50rpFgUHxxbX-ASY951y8mRJOg',
    libraries: 'places, geometry'  // also accepts an array if you need more than one
  });

//meteor force https
  if (location.protocol.toLowerCase() === 'http:') {
        window.location.href = 'https://www.surfingsuitcase.com';
        console.log(location.protocol);
  };
});

Template.surf.helpers({
  loginPrompt(){
    // console.log(Accounts.userId());
    // console.log(Meteor.userId());
    // if(Accounts.userId()){
    //   document.getElementById('signinPrompt').innerHTML = "Welcome!";
    // };
  },
});

Template.findplaces.onRendered(function() {
  if(!Meteor.userId()){
      $('#firstCallToSignup').modal('show')
    };
  //load google geolocation
  this.autorun(function () {
    var latLng = Geolocation.latLng();
    console.log(latLng);
    if (GoogleMaps.loaded() && latLng) {
      //set current location as default selectedLocation
      Session.set('selectedLocation',latLng);
      //implement google places autocomplete
      var input = document.getElementById('locationpick');
      var searchBox = new google.maps.places.Autocomplete(input);
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('place_changed', function() {
        var places = searchBox.getPlace();
        var setLatLng = new Object();
        setLatLng.lat = places.geometry.location.lat();
        setLatLng.lng = places.geometry.location.lng();
        
        if (places.length == 0) {
          return;
        };

        //once location is selected, grab desire value, call search method
        //and save results in a session variable, then go to result page.
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
      });
    };
  });
});

//when default location is used and the user just presses the 'surf' button
Template.surf.events({
  'submit .new-search'(event){
    event.preventDefault();
    //console.log(event);
    var desireChoice=event.target.desire.value;
    Session.set('desireChoice',desireChoice);
    var locationChoice=Session.get('selectedLocation');
    //console.log(desireChoice);
    
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

