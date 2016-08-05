import { Template } from 'meteor/templating';
import { Spaces } from '../api/spaces.js';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import './results.html';

// ToServe = new Mongo.Collection(null);

Template.results.helpers({
  // SSreturns: [
  //   { Text: 'This is location 1' },
  //   { Text: 'This is location 2' },
  //   { Text: 'params' },
  // ],

  //invite people to sign up if they haven't yet.
  SSreturns(){
    console.log(this.id);
    
    if(!Meteor.userId()){
      $('#callToSignup').modal()
    };
    // var selectedLocation = Session.get('selectedLocation');
    // var desireChoice = Session.get('desireChoice');
    var locations = Session.get('distanceBetweenUs');
    document.getElementById('resultHeader').innerHTML = "Here are the " + locations.length + " nearest places!";

    return locations;
  }
});

Template.SSreturn.events({
  'click .redeem': function(){
    $('.placeInfo').modal('hide')
    //hide triggers hidden.bs.modal event which triggers the router.
    .on('hidden.bs.modal', function (e) {Router.go('/comingsoon')})
  },
});