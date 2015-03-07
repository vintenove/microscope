Template.editPage.created = function() {
  Session.set('postSubmitErrors', {});
};

Template.editPage.helpers({
  errorClass: function(field) {
    return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
  },
  errorMessage: function (field) {
    return Session.get('postSubmitErrors')[field];
  }
})

Template.editPage.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    var errors = validatePost(postProperties);
    if (errors.title || errors.url)
      return Session.set('postSubmitErrors', errors);

    Meteor.call('postEdit', postProperties, function (error, result) {
      if (error)
        return throwError(error.reason);

      if (result.postExist) {
        throwError("Post exists already");
        Router.go('postPage', {_id : result._id});
      } else {
        Posts.update(currentPostId, {$set: postProperties}, function (error, result) {
          if (error)
            return throwError(error.reason);
          else {
            Router.go('postPage', {_id : currentPostId});
          }
        });
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      Posts.remove(this._id);
      Router.go('postsList');
    }
  }
});
