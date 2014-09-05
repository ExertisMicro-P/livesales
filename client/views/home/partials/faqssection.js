Template.faqssection.helpers({
  faqs : function() {
    return faqs.find();
  },
  
  faqcount: function() {
    return faqs.find().count();
  }
});


Template.faq.helpers({
  formattedMessage : function() {
    //return Autolinker.link( this.message, { className: "boldlink", truncate: 25 } );
    return marked(this.message);
  },
  
  isMine: function() {
    return (this.originator == Meteor.user().username);
  }
  
  
});


Template.faq.events({
 'click .delete': function(e) {
    e.preventDefault();
   
     Meteor.call('deletefaq', this._id, function(error, id) {
      if (error)
        return alert(error.reason);
    });
 } // click delete
}); // message.events
