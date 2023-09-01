module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/sortednews',
     handler: 'sortednews.sortedNews',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
