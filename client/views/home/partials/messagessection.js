Template.messagessection.helpers({
  messages : function() {
    if (!Meteor.user())
      return false;
    else 
      return messages.find();
  }
});


Template.messagessection.rendered = function () {
  setInterval(function() {
        //$("#messagessection .scrolldiv").scrollTop( $("#messagessection .scrolldiv").prop('scrollHeight'));
        $("#messagessection .scrolldiv").animate({ scrollTop: $("#messagessection .scrolldiv").prop('scrollHeight') }, 
                                                 {
                                                   duration: 600,
                                                   easing: 'swing'}
                                                );  
  }, 3000)
};


Template.messageform.helpers({
  sendbtntext: function() {
    return !Session.get('sendToUserId') ? 'Broadcast to all' : 'Send privately to ' + Session.get('sendToUserId');
  },
  sendbtnclass: function() {
    return !Session.get('sendToUserId') ? 'success' : 'primary';
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



Template.message.helpers({
  createAtMoment : function() {
    return moment(this.createdAt).fromNow();
  },
  
  formattedMessage : function() {
    return Autolinker.link( this.message, { className: "boldlink", truncate: 25 } );
  }
  
});



Template.message.events({
 'click .messagerow, tap .messagerow': function(e) {
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