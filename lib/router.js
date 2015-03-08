Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('posts'), Meteor.subscribe('notifications', Meteor.user())];
  }
});

Router.route('/', {name: 'postsList'});
Router.route('/posts/:_id', {
  name: 'postPage',
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});
Router.route('/posts/:_id/edit', {
  name: 'editPage',
  data: function() { return Posts.findOne(this.params._id);}
});
Router.route('/submit', {name: 'postSubmit'});

var requiredLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) { // TODO: Check this
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requiredLogin, {only: 'postSubmit'});
