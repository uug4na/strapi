'use strict';

/**
 * A set of functions called "actions" for `newstag`
 */

module.exports = {
  eventNews: async (ctx, next) => {
    try {
      const {event, page} = ctx.request.query;
       const data = await strapi
        .service("api::eventnews.eventnews")
        .sortedNews(event, page);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
