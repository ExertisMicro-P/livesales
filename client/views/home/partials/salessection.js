Template.salessection.helpers({
  usersales : function() {
    return sales.find({}, {sort: {sales: -1}});
  }
});


Template.salessection.rendered = function(){
  $('button[data-toggle=tooltip]').tooltip();
};


Template.salessection.events({
 'click #sell': function(e) {
   e.preventDefault();
    Meteor.call('incsales', Meteor.user().username, function(error, id) {
      if (error)
        return alert(error.reason);
    });
 }, // click #sell
  
 'click #undosell': function(e) {
   username = Meteor.user().username;
   console.log('Decrementing '+ username);
   usertodecrement = sales.find({username: username}).fetch()[0];
   if (usertodecrement.sales > 0) {
       e.preventDefault();
      Meteor.call('decsales', Meteor.user().username, function(error, id) {
        if (error)
          return alert(error.reason);
      });
   }
 } // click #undosell 
}); // Template.salessection.events

