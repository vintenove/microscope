var postsData = [
  {
    title: 'Meteor',
    url: 'http://meteor.com'
  },
  {
    title: 'Menéame',
    url: 'https://meneame.net'
  }
];
Template.postsList.helpers({
  posts: postsData
});
