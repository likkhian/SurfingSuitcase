import { Template } from 'meteor/templating';
import {Query} from '../api/query.js';
import './results.html';

Template.results.helpers({
  // SSreturns: [
  //   { Text: 'This is location 1' },
  //   { Text: 'This is location 2' },
  //   { Text: 'params' },
  // ],
  SSreturns(){
		return Query.find({});
	},
	what:function(){
		console.log(this)
	}//can delete later, no result.
});
