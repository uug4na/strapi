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
    const paginatedData = filteredData.slice(0, page * 15 + 15)
    const groupedData = {};
    paginatedData.forEach(item => {
        const publishedAt = new Date(item.publishedAt); // Convert 'publishedAt' to a Date object
        const dayKey = publishedAt.toDateString(); // Get the day as a string

        if (!groupedData[dayKey]) {
            groupedData[dayKey] = [];
        }

        groupedData[dayKey].push(item);
    });
    return groupedData;
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