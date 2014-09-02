if (Meteor.user())
  Meteor.subscribe('messages', Meteor.user()._id);