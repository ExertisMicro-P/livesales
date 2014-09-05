Template.messagessection.helpers({
  messages : function() {
    console.log('here');
      return messages.find({});
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
  }, 3000);
    $('#tips').collapse('hide');
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
       message: $('#wmd-input').val()
     }

   
     Meteor.call('send', message, function(error, id) {
      if (error)
        return alert(error.reason);
    });
 }, // click #send
  
 'click #savefaq': function(e) {
     e.preventDefault();
   
   
     var faq = {
       message: $('#wmd-input').val()
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
    //return Autolinker.link( this.message, { className: "boldlink", truncate: 25 } );
   console.log(this.message);
      return marked(this.message);
    
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




/**
 * Markdown Editor dupport for Job Descriptions
 */
if (typeof Template.editor.created == 'undefined') {
  Template.editor.created = function() {
      this.editor = false;
  };
  
  Template.editor.rendered = function() {
      if (!this.editor) {
          var converter = {
              makeHtml: function(text) { return marked(text); }
          };
  
          var editor = new Markdown.Editor(converter);
          editor.run();
          this.editor = true;
      }
     
      $('#edit-btn').tooltip({placement: 'bottom'})
      $('#preview-btn').tooltip({placement: 'bottom'})
      $('table').addClass('table table-striped table-bordered table-hover');
  }
  
  
  
  Template.editor.events({
      'click a': function(e) {
          // always follow links
          e.stopPropagation();
      },
      'click #preview-btn': function(e, t) {
          e.preventDefault();
          var description = $('#innerEditor').text();
          $('#wmd-input').hide();
          $('#preview-btn').hide();
          $('#wmd-preview').show();
          $('#edit-btn').show();
          $('table').addClass('table table-striped table-bordered table-hover');
      },
      'click #edit-btn': function(e) {
          e.preventDefault();
          $('#wmd-preview').hide();
          $('#edit-btn').hide();
          $('#wmd-input').show();
          $('#preview-btn').show();
      },
  });
} else {
  console.log('create_job: not rendering Markdown Editor!');
}