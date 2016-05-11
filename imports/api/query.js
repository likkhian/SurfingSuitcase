import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Query = new Mongo.Collection('query');

Meteor.methods({
  'query.insert'(spaceCat,text,address,spaceLat,spaceLon,picture,spaceCid,spaceWifi,spacePp,spaceDp) {
    //check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Query.insert({
      spaceCat,
      text,
      address,
      spaceLat,
      spaceLon,
      spaceCid,
      picture,
      spaceWifi,
      spacePp,
      spaceDp,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'query.remove'(queryID) {
    check(queryID, String);
 
    Query.remove(queryID);
  },
  // 'query.list'(){
  // 	Query.find({});
  // },
});