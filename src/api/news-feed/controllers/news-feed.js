'use strict';

/**
 * A set of functions called "actions" for `news-feed`
 */

module.exports = {
  NewsFeed: async (ctx, next) => {
    try {
      // ctx.body = 'ok';
      let { page, tag } = ctx.request.query;
      if (page == undefined) page = 0
      let data;
      if (tag == undefined) {
        data = await strapi
          .service("api::news-feed.news-feed")
          .NewsFeedService(page);
      }
      else {
        data = await strapi
          .service("api::news-feed.news-feed")
          .NewsFeedTagService(page, tag);
      }
      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  }
};
