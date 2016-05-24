import { Meteor } from 'meteor/meteor';
import '../imports/api/query.js'
import '../imports/api/search.js'
import '../imports/api/email.js'
// Meteor.startup(() => {
//   // code to run on server at startup
//   
// });
Meteor.startup( function() {
  process.env.MAIL_URL = "smtp://lik%40surfingsuitcase.com:LIK@work123@box1244.bluehost.com:465";
  console.log(Meteor.settings)
});

Email.send({
	to:"likkhian@gmail.com",
	from:"lik@surfingsuitcase.com",
	subject:"Testing email",
	text:"ok lets try this"
});