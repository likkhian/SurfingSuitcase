import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Emails } from '../api/email.js';
import './aboutus.html';

Template.emailCapture.events({
	'submit .emailEntry'(event){
		event.preventDefault();
		const emailAdd=event.target.inputEmail.value;
		Meteor.call('emails.insert',emailAdd);
		event.target.inputEmail.value=''; //clear form
		document.getElementById("thankYouMsg").innerHTML = 'Thank you for your interest!'; //acknowledge receipt
	},
})