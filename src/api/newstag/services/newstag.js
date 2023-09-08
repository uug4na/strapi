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
async function fetchDataFromCollections(collections, tag) {
    const unifiedResult = [];
    for (const collection of collections) {
        // console.log(`searchingf for ${tag}`)
        const query = strapi.db.query(collection);
        try {

            const foundItem = await query.findMany({
                populate: ['createdBy', 'thumbnail', 'Tags'],
                where: {
                    Tags: {
                        Tags: {
                            $eqi: tag
                        }
                    }
                }
            });

            const createdByFields = extractCreatedByFields(foundItem);
            const collectionName = collection.split('::').pop().split('.').pop();

            createdByFields.forEach(item => {
                item.newsType = collectionName;
            });
            unifiedResult.push(...createdByFields);
        }
        catch(err) {
            console.log(err)
        }
    }

    unifiedResult.forEach(item => {
        item.publishedAt = new Date(item.publishedAt);
    });

    unifiedResult.sort((a, b) => b.publishedAt - a.publishedAt);

    return unifiedResult;
}
module.exports = {
    sortedNews: async (tag) => {
        try {
            const collections = ['api::news.news', 'api::link.link']
            const unifiedData = await fetchDataFromCollections(collections, tag);
            return unifiedData;

        } catch (err) {
            return err;
        }
    },
};