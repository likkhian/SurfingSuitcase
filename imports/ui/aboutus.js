import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Template } from 'meteor/templating';
import { Emails } from '../api/email.js';
import './aboutus.html';

Template.emailCapture.events({
	'submit .emailEntry'(event){
		event.preventDefault();
		const emailAdd=event.target.inputEmail.value;
		Meteor.call('emails.insert',emailAdd);
		event.target.inputEmail.value=''; //clear form
		document.getElementById("thankYouMsg").innerHTML = 'Thank you for your interest!'; //acknowledge receipt
		Meteor.call('sendEmail',
            'hello@surfingsuitcase.com',
            'lik@surfingsuitcase.com',
            'New Email Lead',
            emailAdd
        );
	},
})