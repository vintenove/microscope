if (Posts.find().count() === 0) {
  Posts.insert({
    title: 'Meteor',
    url: 'http://meteor.com'
  });
  Posts.insert({
    title: 'Menéame',
    url: 'https://meneame.net'
  });
  Posts.insert({
    title: 'As',
    url: 'http://www.as.com'
  });
  Posts.insert({
    title: 'Hacker News',
    url: 'https://news.ycombinator.com'
  });
}
