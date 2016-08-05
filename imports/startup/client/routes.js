import { Template } from 'meteor/templating';
import '../../ui/surf.js'
import '../../ui/profile.js';
import '../../ui/aboutus.js';
import '../../ui/signin.js';
import '../../ui/results.js';
import '../../ui/manager.js';
import '../../ui/comingsoon.js';


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
		return params;
	}
});