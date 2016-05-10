import { Template } from 'meteor/templating';
import {Query} from '../api/query.js';
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
		console.log(target)

		// Insert a task into the collection
	    Query.insert({
	      spaceCat,
	      text,
	      address,
	      spaceLat,
	      spaceLon,
	      spaceCid,
	      picture,
	      createdAt: new Date(), // current time
	    });

	    //clear form
	    target.spaceName.value='';
	    target.address.value='';
	    target.lattitude.value='';
	    target.longitude.value='';
	    target.link2pic.value='';
	    target.cidLink.value='';
	},
	'click .delete'(){
		Query.remove(this._id);
	},
})

Template.manager.helpers({
  	Spacelists(){
  		console.log(Meteor.user().username);
		return Query.find({});
	},
	//only admin can edit
	admincheck:function(){
		return Meteor.user().username==="SSadmin";
	},
});