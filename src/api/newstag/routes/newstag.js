module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/newstag',
     handler: 'newstag.newsTagFilter',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
