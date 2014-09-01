Meteor.publish('sales', function () {
  return sales.find();
});
