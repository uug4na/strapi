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
            updatedBy: null
        };
} catch (err) {
    return err;
}
}
module.exports = {
  incrementViews: async (ctx, next) => {
    try {
      console.log(`req arr`)
      const { id, type } = ctx.request.query;
      let collection = ''
      if (type == "news") collection = "api::news.news"
      if (type == "layout") collection = "api::layout.layout"
      if (type == "special") collection = "api::special.special"
      let post = await strapi.query(collection).findOne({ 
        where: {
          id
        },
        populate: ['createdBy']
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

      // const query = strapi.entityService.query(collection);

      const _result = await strapi.entityService.update(collection,id,{
        data: {
          views
        },
        populate: 'deep'
      });
      _result.createdBy = post.createdBy
      const response = {
        success: true,
        data: extractCreatedByFields(_result)
      }
      ctx.body = response;
    } catch (err) {
      console.log(`error ${err}`)
      ctx.body = {
        success: false,
        data: {}
      };
    }
  }
};
