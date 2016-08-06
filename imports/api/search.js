import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Spaces } from './spaces.js';

//export const SearchResults = new Mongo.Collection('searchResults');
//export const ToServe = new Mongo.Collection('toServe');

//search.js contains methods to match a user with his list of spaces

Meteor.methods({
	search: function (locationChoice, desiredChoice) {
		console.log(locationChoice);
		console.log(desiredChoice);
		//implement lat long calculations
		var nearestLocations = new Array();  //Longest distance is at the end of the array
		var longestDistance = 0;
		var maxResults = 5;
		var dbCurser = Spaces.find();

		//implement option switches. Only spaces that match the requirements will be added into
		//the distanceBetweenUs array.

		//key value pair of loc id and distances
		dbCurser.forEach(function (entry) {
			var spaceWifi = entry.spaceWifi;
            if (spaceWifi === '0') {
                entry.spaceWifi = "None";
            } else if (spaceWifi === '1') {
                entry.spaceWifi = "Basic";
            } else if (spaceWifi === '2') {
                entry.spaceWifi = "Good";
            } else if (spaceWifi === '3') {
                entry.spaceWifi = "Excellent";
            } else {
                entry.spaceWifi = "No Info";
            }

			switch (desiredChoice) {
				case '3':
					if (parseInt(spaceWifi) <= 1 || parseInt(entry.spacePp) <= 1) {
						break;
					}
				case '2':
					if (parseInt(spaceWifi) <= 1) {
						break;
					}
				case '1':
					var thisDist = Math.round(distCalc(locationChoice, entry.spaceLat, entry.spaceLon));
					entry.theDist = thisDist;
					//console.log(thisDist)

					if (nearestLocations.length < maxResults && thisDist >= longestDistance) {
						nearestLocations.push(entry);  //Push to the back
						longestDistance = thisDist;
					} else if (nearestLocations.length < maxResults) {
						//Insert at the front since not the longest distance
						nearestLocations.unshift(entry);
					} else if (thisDist < longestDistance) {
						//sorts the entries in order of distance
						nearestLocations.sort(function (x, y) {
							return x.theDist - y.theDist;
						});
						//remove last entry
						nearestLocations.pop();
						//new longest Distance is the last member of the result
						longestDistance = nearestLocations[nearestLocations.length-1].theDist;
						//adds new entry to the front
						nearestLocations.unshift(entry);
						
					}
			}
		});

		//sorts the entries in order of distance
		nearestLocations.sort(function (x, y) {
			return x.theDist - y.theDist;
		});
						
		//add points to the search results so that if only 3 locs show up, top gets 3 pts
		var pts = nearestLocations.length;
		for (var i = 0; i < pts; i++) {
			Spaces.update({ _id: nearestLocations[i]._id }, { $inc: { votes: pts - i, hits: 1 } });
		}

		return nearestLocations;
	}
});


function distCalc(locationChoice,spaceLat,spaceLon){
	var R = 6378137; // Earth’s mean radius in meter
	var dLat = rad(locationChoice.lat - spaceLat);
	var dLong = rad(locationChoice.lng - spaceLon);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(spaceLat)) * Math.cos(rad(locationChoice.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
};

var rad = function(x) {
  return x * Math.PI / 180;
};

