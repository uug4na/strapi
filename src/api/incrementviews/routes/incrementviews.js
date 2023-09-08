module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/incrementviews',
     handler: 'incrementviews.incrementViews',
     config: {
       policies: [],
       middlewares: ['plugin::users-permissions.rateLimit'],
     },
    },
  ],
};
