import { Template } from 'meteor/templating';
import {Query} from '../api/query.js';
import './manager.html';

Template.manager.events({
	'submit .new-space'(event){
		event.preventDefault();

		//get value from form element
		const target=event.target;
		const text=target.spaceName.value;
		const spaceLat=target.lattitude.value;
		const spaceLon=target.longitude.value;
		console.log(target)

		// Insert a task into the collection
	    Query.insert({
	      text,
	      spaceLat,
	      spaceLon,
	      createdAt: new Date(), // current time
	    });

	    //clear form
	    target.spaceName.value='';
	    target.lattitude.value='';
	    target.longitude.value='';
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