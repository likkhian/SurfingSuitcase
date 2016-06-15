import { Template } from 'meteor/templating';
import './surf.js'
import './body.html';
import './profile.js';
import './aboutus.js';
import './register.html';
import './signin.js';
import './results.js';
import './manager.js';
import './comingsoon.js';
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
Router.route('/aboutus');
Router.route('/signin');
Router.route('/manager');
Router.route('/comingsoon');
Router.route('/results/:id',{
	template:'results',
	data: function(){
		var params=this.params;
		console.log(params.id);
	}
});
