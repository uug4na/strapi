'use strict';

/**
 * A set of functions called "actions" for `newstag`
 */

module.exports = {
  newsTagFilter: async (ctx, next) => {
    try {
      const {tag} = ctx.request.query;
       const data = await strapi
        .service("api::newstag.newstag")
        .sortedNews(tag);
      // console.log(`hi ${tag}`)
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
