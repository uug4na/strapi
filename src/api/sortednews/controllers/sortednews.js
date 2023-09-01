'use strict';

/**
 * A set of functions called "actions" for `sortednews`
 */

module.exports = {
  // exampleAction: async (ctx, next) => {
  //   try {
  //     ctx.body = 'ok';
  //   } catch (err) {
  //     ctx.body = err;
  //   }
  // }
};

module.exports = {
  async sortedNews(ctx, next) {
    try {
      const data = await strapi
        .service("api::sortednews.sortednews")
        .sortedNews();
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};