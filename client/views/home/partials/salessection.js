Template.salessection.helpers({
  users : function() {
    return Meteor.users.find({});
    //return sales.find({}, {sort: {sales: -1}});
  },
  salescount: function() {
    users = Meteor.users.find({});
    totalsales = 0;
    users.forEach(function(user) {
      console.log(user);
      salestally = sales.findOne({userId: user._id});
      totalsales += salestally.sales
    });
    
    return totalsales;
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
    if (Presences.findOne({userId: this._id})) 
      return 'glyphicon glyphicon-user';
    else
      return 'glyphicon glyphicon-remove-circle';
  },
  
  userPresenceText : function() {
    if (Presences.findOne({userId: this._id})) 
      return 'online';
    else
      return 'offline';
  },
  
  username : function() {
    user = Meteor.users.findOne({_id: this._id});
    if (user)
      return user.username;
    else
      return false
    /*
    
      */
  },
  
  sales : function() {
    salestally = sales.findOne({userId: this._id});
    if (salestally) 
      return salestally.sales;
    else
      return 0;
  },
  
  isMe : function() {
    return (this._id == Meteor.user()._id);
  }

});


/* Select user to chat to from the Sales sectio */
Template.tally.events({
 'click .salesrow, tap .salesrow': function(e) {
   e.preventDefault();
   
   if ($(e.target).hasClass('salesrow'))
     rowClicked = $(e.target);
   else
     rowClicked = $(e.target).parents('.salesrow');
   
   if ($(rowClicked).hasClass('selected')) {
     $(rowClicked).removeClass('selected');
     Session.set('sendToUserId', false);
   } else {
     // mustn't allow sending messages to yourself
     if (this._id != Meteor.user()._id) {
       $('.salesrow.selected').removeClass('selected');
       $(rowClicked).addClass('selected');
       selecteduser = Meteor.users.findOne({_id: this._id});
       Session.set('sendToUserId', selecteduser.username);
     }
   }
 }
});

