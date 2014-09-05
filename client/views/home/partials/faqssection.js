Template.faqssection.helpers({
  faqs : function() {
    return faqs.find();
  }
});


Template.faq.helpers({
  formattedMessage : function() {
    //return Autolinker.link( this.message, { className: "boldlink", truncate: 25 } );
    return marked(this.message);
  }
  
});
