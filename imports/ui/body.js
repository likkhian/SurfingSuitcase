import { Template } from 'meteor/templating';
import './surf.js'
import './body.html';
import './profile.js';
import './itinerary.html';
import './register.html';
import './signin.js'
import './results.js'
import './manager.js'
/*Template.body.helpers({
  tasks: [
    { text: 'This is task 1' },
    { text: 'This is task 2' },
    { text: 'This is task 3' },
  ],
});*/



Router.route('/',{
	template:'surf'
});
Router.route('/register');
Router.route('/profile');
Router.route('/itinerary');
Router.route('/signin');
Router.route('/manager')
Router.route('/results/:id',{
	template:'results',
	data: function(){
		var params=this.params;
		console.log(params.id);
	}
});
