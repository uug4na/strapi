module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/news-feed',
     handler: 'news-feed.NewsFeed',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
