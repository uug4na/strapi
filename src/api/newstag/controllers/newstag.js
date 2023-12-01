'use strict';

/**
 * A set of functions called "actions" for `newstag`
 */

module.exports = {
  newsTagFilter: async (ctx, next) => {
    try {
      let { tag, page } = ctx.request.query;
      if (page === undefined) page = 0
      const data = await strapi
        .service("api::newstag.newstag")
        .sortedNews(tag, page);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
