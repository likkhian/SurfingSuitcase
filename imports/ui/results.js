import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Spaces } from '../api/spaces.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './results.html';

Template.results.onCreated(function () {
    this.numSpaces = new ReactiveVar(0);
});

Template.results.onRendered(function () {
    if (!Meteor.userId()) {
        //invite people to sign up if they have not
        $('#callToSignup').modal()
    };
});

Template.results.helpers({
    SSreturns() {
        var locationLat = this.query.lat;
        var locationLng = this.query.lng;
        var selection = this.selection;

        var locations = new Array();
        var maxResults = 5;
        var spaces = Spaces.find({}, { reactivity: false });

        spaces.forEach(function (space) {
            var spaceWifi = parseInt(space.spaceWifi);
            if (spaceWifi === 0) {
                space.spaceWifi = "None";
            } else if (spaceWifi === 1) {
                space.spaceWifi = "Basic";
            } else if (spaceWifi === 2) {
                space.spaceWifi = "Good";
            } else if (spaceWifi === 3) {
                space.spaceWifi = "Excellent";
            } else {
                space.spaceWifi = "No Info";
            }

            switch (selection) {
                case '3':
                    if (spaceWifi <= 1 || parseInt(space.spacePp) <= 1) {
                        break;
                    }
                case '2':
                    if (spaceWifi <= 1) {
                        break;
                    }
                case '1':
                    space.theDist = Math.round(distCalc(locationLat, locationLng, space.spaceLat, space.spaceLon));
                    locations.push(space);
            }
        });

        locations.sort(function (x, y) {
            return x.theDist - y.theDist;
        });
        locations = locations.slice(0, maxResults);

        var pts = locations.length;
        locations = locations.map(function (location, index) {
            location.pts = pts - index;
            return location;
        });
        Template.instance().numSpaces.set(pts);

        return locations;
    },

    numSpaces() {
        return Template.instance().numSpaces.get();
    }
});

Template.SSreturn.onCreated(function () {
    var space = this.data;
    Meteor.call('spaces.upvote', space._id, space.pts);
});

function distCalc(locationLat, locationLng, spaceLat, spaceLng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(locationLat - spaceLat);
    var dLong = rad(locationLng - spaceLng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(spaceLat)) * Math.cos(rad(locationLat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meters
}

var rad = function (x) {
    return x * Math.PI / 180;
};

Template.SSreturn.events({
  'click .redeem': function(){
    $('.placeInfo').modal('hide')
    //hide triggers hidden.bs.modal event which triggers the router.
    .on('hidden.bs.modal', function (e) {Router.go('/comingsoon')})
  },
});