import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Emails = new Mongo.Collection('emails');

Meteor.methods({
	'emails.insert'(emailAdd){
		Emails.insert({
			emailAdd,
			createdAt: new Date(),
		});
	},
});