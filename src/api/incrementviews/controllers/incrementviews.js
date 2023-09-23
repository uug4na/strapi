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
      let views = 0;
      if (!post) {
        return ctx.notFound('Post not found');
      }
      console.log(post)
      if (post.views == null) {
        views = 1;
      }
      else
        views += post.views + 1;
      console.log(`views now: ${views}`)

      const query = strapi.db.query(collection);

      const _result = await query.update({
        where: {
          id
        },
        data: {
          views
        }
      });
      ctx.body = _result;
    } catch (err) {
      ctx.body = err;
    }
  }
};
