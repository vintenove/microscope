Template.editPage.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    Meteor.call('postEdit', postProperties, function (error, result) {
      if (error)
        return alert(error.reason);

      if (result.postExist) {
        alert("Post exists already");
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
