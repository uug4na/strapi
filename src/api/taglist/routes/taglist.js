module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/taglist',
     handler: 'taglist.getTagList',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
