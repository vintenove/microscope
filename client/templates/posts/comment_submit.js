Template.commentSubmit.created = function () {
  Session.set('commentSubmitErrors');
};

Template.commentSubmit.helpers({
  'errorClass': function(field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  },
  'errorMessage': function (field) {
    return Session.get('commentSubmitErrors')[field];
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    var errors = {};
    if (!comment.body) {
      errors.body = "Please write something to post a comment";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error) {
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
