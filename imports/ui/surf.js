import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { Geolocation } from 'meteor/mdg:geolocation';
import { GoogleMaps } from 'meteor/dburles:google-maps';
import { ReactiveVar } from 'meteor/reactive-var';

import './surf.html';

Meteor.startup(function () {
    GoogleMaps.load({
        key: 'AIzaSyCB9qUBo50rpFgUHxxbX-ASY951y8mRJOg',
        libraries: 'places, geometry'  // also accepts an array if you need more than one
    });

//meteor force https
  // if (location.protocol.toLowerCase() === 'http:') {
  //       window.location.href = 'https://www.surfingsuitcase.com';
  //       console.log(location.protocol);
  // };
});

Template.surf.onRendered(function () {
    
    if (!Meteor.userId()) {
      $('#firstCallToSignup').modal('show');
    }
    
    this.searchLocation = new ReactiveVar(false);
    
    this.autorun(() => {
        //Geolocation is reactive
        this.searchLocation.set(Geolocation.latLng());
    });

    this.autorun(() => {
        //GoogleMaps is reactive
        if (GoogleMaps.loaded()) {
            var input = document.getElementById('locationpick');
            var searchBox = new google.maps.places.Autocomplete(input);

            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('place_changed', function () {
                var place = searchBox.getPlace();
                if (place.length === 0) {
                    return;
                }
                
                var location = place.geometry.location;
                performSearch(location.lat(), location.lng());
            });
        }
    });
});

//when default location is used and the user just presses the 'surf' button
Template.surf.events({
    'submit #new-search'(event, instance) {
        event.preventDefault();
        var input = document.getElementById('locationpick').value.trim();
        var location = instance.searchLocation.get();

        if (input === '' && !location) {
            $('#modal-enable-location').modal();
            return;
        } else {
            performSearch(location.lat, location.lng);
        }
    }
});

function performSearch(lat, lng) {
    var desireValue = document.getElementById('desire').value;
    var query = 'lat=' + lat + '&lng=' + lng;
    Router.go('search.results', { selection: desireValue }, { query: query });
}