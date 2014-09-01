Meteor.publish('faqs', function () {
  return faqs.find();
});
