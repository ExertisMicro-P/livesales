Template.salessection.helpers({
  usersales : function() {
    return Presences.find({});
    //return sales.find({}, {sort: {sales: -1}});
  }
});


Template.salessection.rendered = function(){
  $('button[data-toggle=tooltip]').tooltip();
};


Template.salessection.events({
 'click #sell': function(e) {
   e.preventDefault();
    Meteor.call('incsales', Meteor.user(), function(error, id) {
      if (error)
        return alert(error.reason);
    });
 }, // click #sell
  
 'click #undosell': function(e) {
   username = Meteor.user().username;
   console.log('Decrementing '+ username);
   usertodecrement = sales.findOne({userId: Meteor.user()._id});
   if (usertodecrement.sales > 0) {
       e.preventDefault();
      Meteor.call('decsales', Meteor.user(), function(error, id) {
        if (error)
          return alert(error.reason);
      });
   }
 } // click #undosell 
}); // Template.salessection.events



Template.tally.helpers({
  userPresenceIcon : function() {
    if (Presences.findOne({userId: this.userId})) 
      return 'glyphicon glyphicon-user';
    else
      return 'glyphicon glyphicon-remove-circle';
  },
  
  userPresenceText : function() {
    if (Presences.findOne({userId: this.userId})) 
      return 'online';
    else
      return 'offline';
  },
  
  username : function() {
    user = Meteor.users.findOne({_id: this.userId});
    return user.username;
    /*
    
      */
  },
  
  sales : function() {
    salestally = sales.findOne({userId: this.userId});
    if (salestally) 
      return salestally.sales;
    else
      return 0;
  },
  
  isMe : function() {
    if (this.userId == Meteor.user()._id) 
      return true;
    else
      return false;
  }

});

