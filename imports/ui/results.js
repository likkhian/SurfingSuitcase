import { Template } from 'meteor/templating';
import './results.html';

Template.results.helpers({
  SSreturns: [
    { Text: 'This is location 1' },
    { Text: 'This is location 2' },
    { Text: 'This is location 3' },
  ],
});

if(Meteor.isClient) {
	console.log("testing")
}
