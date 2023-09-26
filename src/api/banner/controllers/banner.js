'use strict';

/**
 * A set of functions called "actions" for `banner`
 */

module.exports = {
  getBanner: async (ctx, next) => {
    try {
      const unifiedResult = []
      const collections = ['api::news.news', 'api::unread-news.unread-news', 'api::layout.layout']
      for (const collection of collections) {
        const query = strapi.db.query(collection);
        const foundItem = await query.findMany({
          populate: ['createdBy', 'thumbnail', 'Tags', 'Hot', 'news', 'banner'],
          where: {
            isCarousel: true
          }
        });
        const createdByFields = await strapi.service("api::banner.banner").extractCreatedByFields(foundItem);
        const collectionName = collection.split('::').pop().split('.').pop();
        createdByFields.forEach(item => {
          item.newsType = collectionName;
        });
        unifiedResult.push(...createdByFields);

      }
      ctx.body = unifiedResult;

    } catch (err) {
      ctx.body = err;
    }
  }
};
