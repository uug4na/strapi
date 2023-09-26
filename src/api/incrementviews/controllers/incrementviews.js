'use strict';

/**
 * A set of functions called "actions" for `incrementviews`
 */
const extractCreatedByFields = (item) => {
  try {
        const createdByFields = item.createdBy
            ? { id: item.createdBy.id, firstname: item.createdBy.firstname, lastname: item.createdBy.lastname }
            : null;

        return {
            ...item,
            createdBy: createdByFields,
        };
} catch (err) {
    return err;
}
}
module.exports = {
  incrementViews: async (ctx, next) => {
    try {
      const { id, type } = ctx.request.query;
      let collection = ''
      if (type == "news") collection = "api::news.news"
      if (type == "layout") collection = "api::layout.layout"
      if (type == "special") collection = "api::special.special"
      let post = await strapi.query(collection).findOne({ 
        where: {
          id
        },
       });
      let views = 0;
      if (!post) {
        return ctx.notFound('Post not found');
      }
      if (post.views == null) {
        views = 1;
      }
      else
        views += post.views + 1;

      const query = strapi.db.query(collection);

      const _result = await query.update({
        where: {
          id
        },
        data: {
          views
        },
        populate: ['createdBy', 'thumbnail', 'Tags', 'Hot', 'description', 'news', 'contents'],
      });
      ctx.body = extractCreatedByFields(_result);
    } catch (err) {
      ctx.body = err;
    }
  }
};
