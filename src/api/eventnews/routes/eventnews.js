module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/eventnews',
     handler: 'eventnews.eventNews',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
