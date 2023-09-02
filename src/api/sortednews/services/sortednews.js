function extractCreatedByFields(items) {
    return items.map(item => {
        const createdByFields = item.createdBy
            ? { id: item.createdBy.id, firstname: item.createdBy.firstname, lastname: item.createdBy.lastname }
            : null;

        return {
            ...item, // Keep all existing fields in the item
            createdBy: createdByFields,
        };
    });
}
async function fetchDataFromCollections(collections) {
    const unifiedResult = [];

    for (const collection of collections) {
        const query = strapi.db.query(collection);
        const foundItem = await query.findMany({
            populate: ['createdBy', 'thumbnail'],

        });
        console.log(`query: ${JSON.stringify(foundItem)}`)

        const createdByFields = extractCreatedByFields(foundItem);
        const collectionName = collection.split('::').pop().split('.').pop();

        createdByFields.forEach(item => {
            item.newsType = collectionName;
        });
        unifiedResult.push(...createdByFields);
    }

    unifiedResult.forEach(item => {
        item.publishedAt = new Date(item.publishedAt);
    });

    unifiedResult.sort((a, b) => b.publishedAt - a.publishedAt);

    return unifiedResult;
}
module.exports = {
    sortedNews: async () => {
        try {
            const collections = ['api::news.news', 'api::link.link']
            const unifiedData = await fetchDataFromCollections(collections);

            return unifiedData;

        } catch (err) {
            return err;
        }
    },
};