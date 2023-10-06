'use strict';

/**
 * A set of functions called "actions" for `suggestion`
 */
//suggestion
function extractCreatedByFields(items) {
  return items.map(item => {
    const createdByFields = item.createdBy
      ? { id: item.createdBy.id, firstname: item.createdBy.firstname, lastname: item.createdBy.lastname }
      : null;

    return {
      ...item,
      createdBy: createdByFields,
    };
  });
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


module.exports = {
  getSuggestion: async (ctx, next) => {
    try {
      const unifiedResult = []
      const collections = ['api::news.news', 'api::layout.layout']
      for (const collection of collections) {
        const query = strapi.db.query(collection);
        const foundItem = await query.findMany({
          populate: ['createdBy', 'thumbnail', 'Tags', 'Hot', 'description'],
          limit: 10,
          orderBy: {publishedAt: 'desc'},
        });
        const createdByFields = extractCreatedByFields(foundItem);
        const collectionName = collection.split('::').pop().split('.').pop();

        createdByFields.forEach(item => {
          item.newsType = collectionName;
        });
        unifiedResult.push(...createdByFields);
      }
      shuffleArray(unifiedResult);
      ctx.body = unifiedResult.slice(0, 5);
    } catch (err) {
      ctx.body = err;
    }
  }
};
