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
function extractTags(eventTags) {
    const result = []

    eventTags.forEach(tag => {
        Object.entries(tag).forEach(([key, value]) => {
            if (value !== null && value !== 'tags.tags' && typeof value !== 'number') {
                result.push(value);
            }
        });
    });

    return result;
}
const getTagsFromEvent = async (event) => {
    try {

        const query = strapi.db.query('api::current-event.current-event');

        const eventData = await query.findMany({
            populate: ['tags']
        });
        console.log(`eventData: ${JSON.stringify(eventData)}`)
        return extractTags(eventData[0].tags)
    }
    catch (err) {
        console.log(err)
    }
}

async function fetchDataFromCollections(collections, event, page) {
    try {

        const unifiedResult = [];
        const tag = await getTagsFromEvent(event)
        for (const collection of collections) {
            const query = strapi.db.query(collection);
            try {
                const foundItem = await query.findMany({
                    populate: ['createdBy', 'thumbnail', 'Tags'],
                    where: {
                        Tags: {
                            $or: [
                                { 'companies': { $in: tag } },
                                { 'software': { $in: tag } },
                                { 'hardware': { $in: tag } },
                                { 'innovation': { $in: tag } },
                                { 'car': { $in: tag } },
                                { 'entertainment': { $in: tag } },
                                { 'events': { $in: tag } }
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
        // const data = filteredData.slice(page * 15, page * 15 + 15)
        const hasMore = filteredData.length > page * 15 + 15;
        // const paginatedData = filteredData.slice(0, page*15+15);
        // paginatedData.forEach(item => {
        //   const publishedAt = new Date(item.publishedAt); // Convert 'publishedAt' to a Date object
        //   const dayKey = publishedAt.toDateString(); // Get the day as a string
        
        //   if (!groupedData[dayKey]) { 
        //     groupedData[dayKey] = [];
        //   }
        
        //   groupedData[dayKey].push(item);
        // });
        return {
            success: true,
            data: filteredData.slice(page * 15, page * 15 + 15),
            hasMore
        }
    }
    catch (err) {
        console.log(`err: ${err}`)
        return {
            success: false,
            data: []
        }
    }
}
module.exports = {
    getEventNews: async (event, page) => {
        try {
            const collections = ['api::news.news', 'api::link.link', 'api::unread-news.unread-news', 'api::layout.layout']
            const unifiedData = await fetchDataFromCollections(collections, event, page);
            return unifiedData;

        } catch (err) {
            return err;
        }
    },
};