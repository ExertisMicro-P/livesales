messages = new Meteor.Collection('messages', {
  schema: new SimpleSchema({
    message: {
      type: String
    },
    type: { // DIRECT or BROADCAST
      type: String
    },
    originator: { 
      type: String  // a username
                },
    recipient: {
      type: String,  // an username
      optional: true
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
  })
});

// Collection2 already does schema checking
// Add custom permission rules if needed
messages.allow({
  insert : function () {
    return true;
  },
  update : function () {
    return true;
  },
  remove : function () {
    return true;
  }
});



