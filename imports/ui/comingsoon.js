import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Emails } from '../api/email.js';
import './comingsoon.html';

Template.comingsoon.events({
	'submit .emailEntryComing'(event){
		event.preventDefault();
		const emailAdd=event.target.inputEmailComing.value;
		const name=event.target.inputNameComing.value;
		Meteor.call('emails.insert',emailAdd);
		event.target.inputEmailComing.value=''; //clear form
		event.target.inputNameComing.value='';
		document.getElementById("thankYouMsg").innerHTML = 'Thank you for your interest! visit our <a href="http://www.facebook.com/surfingsuitcase/">Facebook</a> page.'; //acknowledge receipt
		Meteor.call('sendEmail',
            'hello@surfingsuitcase.com',
            'lik@surfingsuitcase.com',
            'New Email Lead Promo',
            emailAdd + name
        );
	},
});