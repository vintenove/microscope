Router.configure({
  layoutTemplate: 'layout'
  waitOn: function() { return Meteor.subscribe('posts'); },
  loadingTemplate: 'loading'
});

Router.route('/', {name: 'postsList'});
