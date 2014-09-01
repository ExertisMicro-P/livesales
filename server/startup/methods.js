Meteor.methods({
  send: function(messageAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to post new messages");
    
    var message = _.extend(_.pick(messageAttributes, 'type', 'recipient', 'message'), {
      originator: user.username, 
      createdAt: new Date()
    });
    
    var messageId = messages.insert(message);

    return messageId;
  }, // send
  
  
  savefaq: function(faqAttributes) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to create new stFAQ entries");
    
    var faq = _.extend(_.pick(faqAttributes, 'message'), {
      originator: user.username, 
      createdAt: new Date()
    });
    
    var faqId = faqs.insert(faq);

    return faqId;
  }, // savefaq
  
  
  
  incsales: function(username) {
       sales.upsert({username: username}, {$inc: {sales: 1}})
  }, // incsales

  decsales: function(username) {
       sales.upsert({username: username}, {$inc: {sales: -1}})
  } // decsales

  
});