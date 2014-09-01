Template.home.helpers({
});


Template.messagessection.helpers({
  messages : function() {
    return messages.find();
  }
});



Template.faqssection.helpers({
  faqs : function() {
    return faqs.find();
  }
});



Template.messagessection.rendered = function () {
  setInterval(function() {
        $("#messagessection .scrolldiv").scrollTop( $("#messagessection .scrolldiv").prop('scrollHeight'));
  }, 1000)
};

Template.salessection.helpers({
  usersales : function() {
    return sales.find({}, {sort: {sales: -1}});
  }
});


Template.salessection.rendered = function(){
  $('button[data-toggle=tooltip]').tooltip();
};



Template.messageform.helpers({
  sendbtntext: function() {
    return !Session.get('sendToUserId') ? 'Broadcast to all' : 'Send directly to ' + Session.get('sendToUserId');
  }
});



Template.messageform.events({
 'click #send': function(e) {
     e.preventDefault();
   
   
     var message = {
       recipient: Session.get('sendToUserId') ? Session.get('sendToUserId') : '(BROADCAST)',
       type: !Session.get('sendToUserId') ? 'BROADCAST' : 'DIRECT',
       message: $('#messagetosend').val()
     }

   
     Meteor.call('send', message, function(error, id) {
      if (error)
        return alert(error.reason);
    });
 }, // click #send
  
 'click #savefaq': function(e) {
     e.preventDefault();
   
   
     var faq = {
       message: $('#messagetosend').val()
     }

   
     Meteor.call('savefaq', faq, function(error, id) {
      if (error)
        return alert(error.reason);
    });
 } // click #savefaq 
});
   



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





Template.message.helpers({
  createAtMoment : function() {
    return moment(this.createdAt).fromNow();
  },
  
  formattedMessage : function() {
    return Autolinker.link( this.message, { className: "boldlink", truncate: 25 } );
  }
  
});



Template.faq.helpers({
  formattedMessage : function() {
    return Autolinker.link( this.message, { className: "boldlink", truncate: 25 } );
  }
  
});


Template.message.events({
 'click .messagerow': function(e) {
   e.preventDefault();
   
   if ($(e.target).hasClass('messagerow'))
     rowClicked = $(e.target);
   else
     rowClicked = $(e.target).parent();
   
   if ($(rowClicked).hasClass('selected')) {
     $(rowClicked).removeClass('selected');
     Session.set('sendToUserId', false);
   } else {
     // mustn't allow sending messages to yourself
     if (this.originator != Meteor.user().username) {
       $('.messagerow.selected').removeClass('selected');
       $(rowClicked).addClass('selected');
       Session.set('sendToUserId', this.originator);
     }
   }
 }
});