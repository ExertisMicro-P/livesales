Meteor.publish('messages', function () {
  currentuser = Meteor.users.findOne({_id:this.userId});
  console.log(currentuser.username);
  return messages.find(
       {$or: [
               {recipient: currentuser.username},
               {recipient: '(BROADCAST)'},
               {originator: currentuser.username} 
      ]}
  );
  
  
 
});
