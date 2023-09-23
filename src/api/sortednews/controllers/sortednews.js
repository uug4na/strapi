'use strict';

module.exports = {
  async sortedNews(ctx, next) {
    try {
      let { page } = ctx.request.query;
      if( page == undefined ) page = 0
      const data = await strapi
        .service("api::sortednews.sortednews")
        .sortedNews(page);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};