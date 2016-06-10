import { Template } from 'meteor/templating';
import { Query } from '../api/query.js';
import './results.html';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

ToServe = new Mongo.Collection(null);

Template.results.helpers({
  // SSreturns: [
  //   { Text: 'This is location 1' },
  //   { Text: 'This is location 2' },
  //   { Text: 'params' },
  // ],

  //invite people to sign up if they haven't yet.
  SSreturns(){
    if(!Meteor.userId()){
      $('#callToSignup').modal()
    };
    // var selectedLocation = Session.get('selectedLocation');
    // var desireChoice = Session.get('desireChoice');
    ToServe.remove({});
    var distanceBetweenUs = Session.get('distanceBetweenUs');
    var resultLength = distanceBetweenUs.length;

    for(var i=0;i<resultLength;i++){
      var currentAns = Query.findOne({_id:distanceBetweenUs[i].key});
      var spaceCat=currentAns.spaceCat;
      var text=currentAns.text;
      var address=currentAns.address;
      var spaceLat=currentAns.spaceLat;
      var spaceLon=currentAns.spaceLon;
      var spaceCid=currentAns.spaceCid;
      var picture=currentAns.picture;
      var spaceWifi=currentAns.spaceWifi;
      if(spaceWifi==='0'){
            spaceWifi="None";
      }else if(spaceWifi==='1'){
            spaceWifi="Basic";
      }else if(spaceWifi==='2'){
            spaceWifi="Good";
      }else if(spaceWifi==='3'){
            spaceWifi="Excellent";
      }else{
            spaceWifi="No Info";
      };
      var spacePp=currentAns.spacePp;
      var spaceDp=currentAns.spaceDp;
      theDist=distanceBetweenUs[i].value;
      ToServe.insert({
        theDist,
        spaceCat,
        text,
        address,
        spaceLat,
        spaceLon,
        spaceCid,
        picture,
        spaceWifi,
        spacePp,
        spaceDp,
      });
      
    };
    document.getElementById('resultHeader').innerHTML = "Here are the "+resultLength+" nearest places!";
    return ToServe.find({});
	},



});
