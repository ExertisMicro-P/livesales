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
  
  
  
  deletemessage: function(id) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete messages");
        
    return messages.remove(id);

  }, // deletemessage
  
  
  
  
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
  
  deletefaq: function(id) {
    var user = Meteor.user();

    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to delete faqs");
        
    return faqs.remove(id);

  }, // deletemessage
  
  incsales: function(user) {
    sales.upsert({username: user.username, userId: user._id}, {$inc: {sales: 1}})
  }, // incsales

  decsales: function(user) {
    sales.upsert({username: user.username, userId: user._id}, {$inc: {sales: -1}})
  } // decsales

  
});