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
async function fetchDataFromCollections(collections, tag, page) {
    try {

        const unifiedResult = [];
        for (const collection of collections) {
            const query = strapi.db.query(collection);
            try {

                const foundItem = await query.findMany({
                    populate: ['createdBy', 'thumbnail', 'Tags'],
                    where: {
                        Tags: {
                            $or: [
                                { 'companies': { $eqi: tag } },
                                { 'software': { $eqi: tag } },
                                { 'hardware': { $eqi: tag } },
                                { 'innovation': { $eqi: tag } },
                                { 'car': { $eqi: tag } },
                                { 'entertainment': { $eqi: tag } },
                            ]
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
            catch (err) {
                console.log(err)
            }
        }
        const filteredData = unifiedResult.filter(item => item.publishedAt !== null);

        filteredData.forEach(item => {
            item.publishedAt = new Date(item.publishedAt);
        });

        filteredData.sort((a, b) => b.publishedAt - a.publishedAt);
        const hasMore = filteredData.length > page * 15 + 15;

        return {
            success: true,
            data: filteredData.slice(page * 15, page * 15 + 15),
            hasMore
        };
    }
    catch (err) {
        return {
            succes: false,
            data: [],
        }
    }
}
module.exports = {
    sortedNews: async (tag, page) => {
        try {
            const collections = ['api::news.news', 'api::link.link', 'api::unread-news.unread-news', 'api::layout.layout']
            const unifiedData = await fetchDataFromCollections(collections, tag, page);
            return unifiedData;

        } catch (err) {
            return err;
        }
    },
};