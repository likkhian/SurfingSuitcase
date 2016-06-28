import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Spaces = new Mongo.Collection('spaces');

//query.js contains methods for administrators to upload space information

Meteor.methods({
  'spaces.upsert'(entry2Update,spaceCat,text,address,spaceLat,spaceLon,picture,spaceCid,spaceWifi,spacePp,spaceDp,votes,hits) {
 
    // Make sure the user is logged in before inserting a location
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    };

    if(!votes){
      votes=0;
    }

    if(!hits){
      hits=0;
    }

    Spaces.upsert(
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
  'spaces.remove'(queryID) {
    check(queryID, String);
 
    Spaces.remove(queryID);
  },
 
});