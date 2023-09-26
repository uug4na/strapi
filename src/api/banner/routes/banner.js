module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/banner',
     handler: 'banner.getBanner',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
