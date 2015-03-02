Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    var errors = validatePost(postAttributes);
    if (errors.url || errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    var postWithSameLink = Posts.findOne({url : postAttributes.url});
    if (postWithSameLink) {
      return {
        postExist: true,
        _id : postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },
  postEdit: function(newPostAttributes) {
    check(newPostAttributes, {
      title: String,
      url: String
    });

    var errors = validatePost(postAttributes);
    if (errors.url || errors.title)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

    var postWithSameLink = Posts.findOne({url : newPostAttributes.url});

    if (postWithSameLink) return {
      postExist : true,
      _id : postWithSameLink._id
    }
    return false;
  }
});

validatePost = function (post) {
  var errors = {};
  if (!post.title || post.title.lenght === 0)
    errors.title = "Please fill in the Title";
  if (!post.url || post.url.lenght === 0)
    errors.url = "Please fill in the URL";
  return errors;
}
