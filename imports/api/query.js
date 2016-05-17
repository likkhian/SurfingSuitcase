import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Query = new Mongo.Collection('query');

Meteor.methods({
  'query.upsert'(entry2Update,spaceCat,text,address,spaceLat,spaceLon,picture,spaceCid,spaceWifi,spacePp,spaceDp,votes,hits) {
    //check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    };
    if(!votes){
      votes=0;
    }
    if(!hits){
      hits=0;
    }

    Query.upsert(
      {
        //selector
        _id:entry2Update
      },{
        //modifier
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
        votes,
        hits,
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