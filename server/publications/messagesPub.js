Meteor.publish('messages', function () {
  return messages.find(
       {$or: [
               {recipient: this.username},
               {recipient: '(BROADCAST)'},
               {originator: this.username}
      ]}
  );
  
  
 
});
