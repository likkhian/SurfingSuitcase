import { Meteor } from 'meteor/meteor';
import '../imports/api/query.js'
import '../imports/api/search.js'
import '../imports/api/email.js'
import { Email } from 'meteor/email'
// Meteor.startup(() => {
//   // code to run on server at startup
//   
// });
// Meteor.startup( function() {
//   process.env.MAIL_URL = "smtp://hello%40surfingsuitcase.com:DXL@work123@box1244.bluehost.com:465";
//   console.log(Meteor.settings)
// });
Meteor.methods({
  sendEmail: function (to, from, subject, text) {
    check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  }
});
