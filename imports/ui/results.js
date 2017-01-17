import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Spaces } from '../api/spaces.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './results.html';

Template.results.onCreated(function () {
    var params = this.data;
    var selection = params.selection;
    var lat = params.query.lat;
    var lng = params.query.lng;

    this.spaces = new ReactiveVar([]);
    this.numSpaces = new ReactiveVar(0);

    Meteor.call('spaces.search', selection, lat, lng, (err, data) => {
        if (!err) {
            this.spaces.set(data);
            this.numSpaces.set(data.length);
        }
    });
});

// Template.results.onRendered(function () {
//     if (!Meteor.userId()) {
//         //invite people to sign up if they have not
//         $('#callToSignup').modal()
//     };
// });

Template.results.helpers({
    SSreturns() {
        return Template.instance().spaces.get();
    },

    numSpaces() {
        return Template.instance().numSpaces.get();
    }
});

Template.SSreturn.onCreated(function () {
    var space = this.data;
    Meteor.call('spaces.upvote', space._id, space.pts);
});


Template.SSreturn.events({
  'click .redeem': function(){
    if(!Meteor.userId()){
        console.log("dingding")
        $('#callToSignup').modal()
    } else {
        $('.placeInfo').modal('hide')
        //hide triggers hidden.bs.modal event which triggers the router.
        .on('hidden.bs.modal', function (e) {Router.go('/comingsoon')})
    }
  },
});