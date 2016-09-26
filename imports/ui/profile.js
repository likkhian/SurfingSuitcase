import { Template } from 'meteor/templating';
import './profile.html';

// Template.profile.helper({
// 	deetholder: [
//     { hours: 5 },
//     { text: 'This is task 2' },
//     { text: 'This is task 3' },
//   ],
// });
Template.profile.events({
	'click .wifiOptions'(event){
		console.log(event.target.control);
	},
	'click .logout': ()=> {
		//Meteor.logout();
		AccountsTemplates.logout();
	}
	
});

Template.profile.onRendered(
	function(){
		console.log(AccountsTemplates)
		console.log(Meteor.user())
		console.log(AccountsTemplates.getState())
	},
	// for (var prop in Meteor.users) {
	//     if (!Meteor.users.hasOwnProperty(prop)) {
	//         //The current property is not a direct property of p
	//         continue;
	//     }
 //    //Do your logic with the property here
 //    console.log(var)
	// }
)