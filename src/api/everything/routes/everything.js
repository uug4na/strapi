'use strict';
// routes/everything.js
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/fetch-all-collections",
      handler: "everything.fetchAllCollections",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
