import { Template } from 'meteor/templating';
import { Query } from '../api/query.js';
import './results.html';
import { extract } from '../api/search.js';
import { ToServe } from '../api/search.js';

Template.results.helpers({
  // SSreturns: [
  //   { Text: 'This is location 1' },
  //   { Text: 'This is location 2' },
  //   { Text: 'params' },
  // ],
  SSreturns(){
    Meteor.call('extract');
    return ToServe.find({});
		//return Query.find({});
	},

});