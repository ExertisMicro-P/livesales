Meteor.publish('userssales', function () {
  return  Meteor.users.find();
});
