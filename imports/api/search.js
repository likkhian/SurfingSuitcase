import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Query } from './query.js';

export const SearchResults = new Mongo.Collection('searchResults');
export const ToServe = new Mongo.Collection('toServe');

Meteor.methods({

	search: function(locationChoice,desireChoice) {
   	// console.log(locationChoice.lat);
   	//implement lat long calculations

	   	//bring in the spaces db
	   	var reslut=Query.findOne({spaceCat:'1'},{fields:{text:1,spaceLat:1,spaceLon:1}});
	   	//console.log(reslut);
	   	dbCurser=Query.find()

	   	//key value pair of loc id and distances
	   	var distanceBetweenUs= new Array();
	   	dbCurser.forEach(function(entry){
	   		//console.log(entry._id);
	   		var idVal=entry._id;
	   		var thisDist=distCalc(locationChoice,entry.spaceLat,entry.spaceLon)
	   		distanceBetweenUs.push({
	   			key: idVal,
	   			value: Math.round(thisDist)
	   		});
	   	});
	   	//console.log(distanceBetweenUs);
	   	
	   	//sort the array
	   	distanceBetweenUs.sort(function(a,b){
	   		return a.value - b.value;
	   	});
	   	//console.log(distanceBetweenUs[0].key)
	   	//console.log(distanceBetweenUs[0].value)

	   	SearchResults.remove({});

	   	for (i=0; i<distanceBetweenUs.length; i++){
	   		var placeId=distanceBetweenUs[i].key;
	   		var placeDist=distanceBetweenUs[i].value;
	   		SearchResults.insert({
	   			placeId,
	   			placeDist,
	   			createdAt: new Date(),
	   		});
	   	};
	}, 

	extract: function(){
		ToServe.remove({}); //remove previous results
		resultCurser=SearchResults.find();
		//console.log(resultCurser.count())
		// resultCurser.forEach(function(entry){
	 //   		console.log(entry._id,entry.placeId,entry.placeDist);
	 //   	});
	 	resultCurser.forEach(function(entry){
	 		//console.log(Query.findOne({_id:entry.placeId}).spaceWifi);
	 		var currentAns = Query.findOne({_id:entry.placeId});
	 		var spaceCat=currentAns.spaceCat;
	 		var text=currentAns.text;
	 		var address=currentAns.address;
	 		var spaceLat=currentAns.spaceLat;
		    var	spaceLon=currentAns.spaceLon;
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
	 		theDist=entry.placeDist;
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
	 	}); 	
	}

});

// //publish results to serve
// Meteor.publish('ToServe',function(limit){
// 	var dl=limit || 10;
// 	return ToServe.find({},{limit:dl});
// });

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

