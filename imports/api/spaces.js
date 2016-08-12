import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Spaces = new Mongo.Collection('spaces');


/*
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('spaces', function findAllSpaces() {
        return Spaces.find();
    });
}
*/

//spaces.js helps admin update information and add spaces.
Meteor.methods({
  'spaces.search'(selection, locationLat, locationLng) {
      if (!selection || !locationLat || !locationLng) {
          return [];
      }

      var locations = new Array();
      var maxResults = 5;
      var spaces = Spaces.find({},
          {
              fields: {
                  "createdAt": 0,
                  "owner": 0,
                  "votes": 0,
                  "hits": 0,
                  "username": 0
              }
          });

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

      return locations;
  },

  'spaces.upvote'(_id, pts) {
      Spaces.update(
          { 
              _id: _id 
          },
          {
              $inc: { votes: pts, hits: 1 }
          });
  },

  'spaces.upsert'(entry2Update,spaceCat,text,address,spaceLat,spaceLon,picture,spaceCid,spaceWifi,spacePp,spaceDp,votes,hits) {
 
    // Make sure the user is logged in before inserting a location
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    };

    if(!votes){
      votes=0;
    }

    if(!hits){
      hits=0;
    }

    Spaces.upsert(
      {
        //selector
        _id:entry2Update
      },{
        //modifier
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
        votes,
        hits,
        createdAt: new Date(),
        owner: this.userId,
        username: Meteor.users.findOne(this.userId).username,  
    });
  },

  'spaces.remove'(queryID) {
    check(queryID, String);
 
    Spaces.remove(queryID);
  }

});

function distCalc(locationLat, locationLng, spaceLat, spaceLng) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(locationLat - spaceLat);
    var dLong = rad(locationLng - spaceLng);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(spaceLat)) * Math.cos(rad(locationLat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meters
};

var rad = function (x) {
    return x * Math.PI / 180;
};
