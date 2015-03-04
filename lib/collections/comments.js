Comments = new Mongo.Collection('comments');

Meteor.methods({
  'commentInsert': function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

  var currentUser = Meteor.user();
  var post = Posts.findOne(commentAttributes.postId);
  if (! post)
    throw new Meteor.Error('invalid-comment', 'You must comment on a valid post');
  comment = _.extend(commentAttributes, {
    user: currentUser._id,
    author: currentUser.username,
    submitted: new Date()
  });
  return Comments.insert(comment);
  }
});
