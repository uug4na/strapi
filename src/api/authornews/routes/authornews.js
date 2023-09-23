module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/authornews',
     handler: 'authornews.authorNews',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
