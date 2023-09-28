module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/suggestion',
     handler: 'suggestion.getSuggestion',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
