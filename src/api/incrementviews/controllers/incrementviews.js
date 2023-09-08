'use strict';

/**
 * A set of functions called "actions" for `incrementviews`
 */

module.exports = {
  incrementViews: async (ctx, next) => {
    try {
      const { id, type } = ctx.request.query;
      let collection = ''
      if (type == "news") collection = "api::news.news"
      if (type == "layout") collection = "api::layout.layout"
      if (type == "special") collection = "api::special.special"

      let post = await strapi.query(collection).findOne({ id });

      if (!post) {
        return ctx.notFound('Post not found');
      }
      if (post.views == null) {
        post.views = 1;
      }
      else
        post.views += 1;
      const query = strapi.db.query(collection);

      const _result = await query.update({
        where: {
          id
        },
        data: {
          views: post.views
        }
      });
      ctx.body = _result;
    } catch (err) {
      ctx.body = err;
    }
  }
};
