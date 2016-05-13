import { Template } from 'meteor/templating';
import {Query} from '../api/query.js';
import { Meteor } from 'meteor/meteor';
import './manager.html';

Template.manager.events({
	'submit .new-space'(event){
		event.preventDefault();
		//get value from form element
		const target=event.target;
		const spaceCat=target.category.value;
		console.log(spaceCat);
		const text=target.spaceName.value;
		const address=target.address.value;
		const spaceLat=target.lattitude.value;
		const spaceLon=target.longitude.value;
		const picture=target.link2pic.value;
		const spaceCid=target.cidLink.value;
		const spaceWifi=target.wifi.value;
		const spacePp=target.powerPoint.value;
		const spaceDp=target.drinkPrice.value;

		// Insert a task into the collection
	    // Query.insert({
	    //   spaceCat,
	    //   text,
	    //   address,
	    //   spaceLat,
	    //   spaceLon,
	    //   spaceCid,
	    //   picture,
	    //   spaceWifi,
	    //   spacePp,
	    //   spaceDp,
	    //   createdAt: new Date(), // current time
	    // });
	    //make api call
	    Meteor.call('query.insert',spaceCat,text,address,spaceLat,spaceLon,picture,spaceCid,spaceWifi,spacePp,spaceDp)

	    //clear form
	    target.spaceName.value='';
	    target.address.value='';
	    target.lattitude.value='';
	    target.longitude.value='';
	    target.link2pic.value='';
	    target.cidLink.value='';
	    target.powerPoint.value='';
	    target.drinkPrice.value='';
	},
	'click .delete'(){
		//Query.remove(this._id);
		Meteor.call('query.remove',this._id);
	},
	'click .edit'(){
		//make edit
		const entry2Update=this._id
		const entryCurser = Query.find(this._id)
		const entry = entryCurser.fetch()
		console.log(entry[0].text)
		const trgt=document.getElementsByClassName("new-space")
		console.log(trgt)
		//fill form
	    trgt[0].spaceName.value=entry[0].text;
	    trgt[0].address.value=entry[0].address;
	    trgt[0].lattitude.value=entry[0].spaceLat;
	    trgt[0].longitude.value=entry[0].spaceLon;
	    trgt[0].link2pic.value=entry[0].picture;
	    trgt[0].cidLink.value=entry[0].spaceCid;
	    trgt[0].powerPoint.value=entry[0].spacePp;
	    trgt[0].drinkPrice.value=entry[0].spaceDp;
	    Session.set('entry2Update',entry2Update);
	},
	
})

Template.manager.helpers({
  	spacelists: function() {
  		console.log(Meteor.user().username);
		return Query.find({}); //this is still not using methods.
		//return Meteor.call('query.list')
	},
	//only admin can edit
	admincheck:function(){
		return Meteor.user().username==="SSadmin";
	},
});