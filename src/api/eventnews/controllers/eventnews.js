'use strict';

/**
 * A set of functions called "actions" for `newstag`
 */

module.exports = {
  eventNews: async (ctx, next) => {
    try {
      let { event, page } = ctx.request.query;
      if( page === undefined ) page = 0;
      const data = await strapi
        .service("api::eventnews.eventnews")
        .getEventNews(event, page);
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
