Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    console.log(post);

    Meteor.call('postInsert', post, function (error, result) {
      if (error)
        return alert(error.reason);

      if (result.postExist)
        alert('This link has already been posted');
      Router.go('postPage', {_id : result._id});
    });
  }
});