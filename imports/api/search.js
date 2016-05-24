import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Query } from './query.js';

export const SearchResults = new Mongo.Collection('searchResults');
//export const ToServe = new Mongo.Collection('toServe');

Meteor.methods({

	search: function(locationChoice,desireChoice) {
   	//implement lat long calculations
	   	dbCurser=Query.find()

	   	//implement option switches

	   	switch(desireChoice){
	   		case '1':
			   	//key value pair of loc id and distances
			   	var distanceBetweenUs= new Array();
			   	dbCurser.forEach(function(entry){
			   		console.log(parseInt(entry.spaceWifi));
			   		//console.log(entry._id);
			   		var idVal=entry._id;
			   		var thisDist=distCalc(locationChoice,entry.spaceLat,entry.spaceLon)
			   		distanceBetweenUs.push({
			   			key: idVal,
			   			value: Math.round(thisDist)
			   		});
			   	});
			   	//console.log(distanceBetweenUs);

	   		break;
	   		case '2':
	   			//wifi good and above only
	   			//key value pair of loc id and distances
			   	var distanceBetweenUs= new Array();
			   	dbCurser.forEach(function(entry){
			   		//console.log(entry._id);
			   		if(parseInt(entry.spaceWifi)>1){
				   		var idVal=entry._id;
				   		var thisDist=distCalc(locationChoice,entry.spaceLat,entry.spaceLon)
				   		distanceBetweenUs.push({
				   			key: idVal,
				   			value: Math.round(thisDist)
				   		});
				   	};
			   	});
			   	//console.log(distanceBetweenUs);
	   		break;
	   		case '3':
	   			//wifi and power
	   			//key value pair of loc id and distances
			   	var distanceBetweenUs= new Array();
			   	dbCurser.forEach(function(entry){
			   		console.log(entry.spacePp);
			   		if(parseInt(entry.spaceWifi)>1 && parseInt(entry.spacePp)>1){
				   		var idVal=entry._id;
				   		var thisDist=distCalc(locationChoice,entry.spaceLat,entry.spaceLon)
				   		distanceBetweenUs.push({
				   			key: idVal,
				   			value: Math.round(thisDist)
				   		});
				   	};
			   	});
			   	console.log(distanceBetweenUs);
	   		break;
	   	}
	   	
	   	//sort the array
	   	distanceBetweenUs.sort(function(a,b){
	   		return a.value - b.value;
	   	});
	   	//console.log(distanceBetweenUs[0].key)
	   	//console.log(distanceBetweenUs[0].value)
	   	console.log(distanceBetweenUs.length);
	   	var sliceTo = distanceBetweenUs.length;
	   	if (sliceTo > 5){
	   		sliceTo = 5;
	   	};
	   	distanceBetweenUs = distanceBetweenUs.slice(0,sliceTo);
	   	console.log(distanceBetweenUs);

	   	//add points to the search results
	   	var pts=sliceTo;//so that if only 3 locs show up, top gets 3 pts
	   	for (i=0; i<sliceTo; i++){
	   		var placeId=distanceBetweenUs[i].key;
	   		var placeDist=distanceBetweenUs[i].value;
	   		SearchResults.insert({
	   			placeId,
	   			placeDist,
	   			createdAt: new Date(),
	   		});
	   		Query.update({_id:placeId},{$inc: {votes: pts, hits: 1}});
	   		pts--;
	   	};
	   	//console.log(distanceBetweenUs);
	    return distanceBetweenUs;
	}, 

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

