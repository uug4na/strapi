'use strict';

module.exports = {
  async authorNews(ctx, next) {
    try {
      let { page, author, type } = ctx.request.query;
      if( page == undefined ) page = 0
      const data = await strapi
        .service("api::authornews.authornews")
        .authorNews(page, author, type);
      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};