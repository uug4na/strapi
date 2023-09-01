'use strict';
// controllers/everything.js

module.exports = {
  async fetchAllCollections(ctx) {
    try {
      const data = await strapi.service('everything').fetchAllCollections();
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Fetch all collections error", { moreDetails: err });
    }
  },
};

