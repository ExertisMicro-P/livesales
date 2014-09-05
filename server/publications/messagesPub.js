Meteor.publish('messages', function () {
  console.log('publish ');console.log(this.userId);
  
  if (!this.userId) return false;
  
  currentuser = Meteor.users.findOne({_id:this.userId});
  //currentuser = Meteor.users.findOne({_id:userId});
  console.log('cu='+currentuser.username);
  return messages.find(
       {$or: [
               {recipient: currentuser.username},
               {recipient: '(BROADCAST)'},
               {originator: currentuser.username} 
      ]}
  );
  
  
 
});
