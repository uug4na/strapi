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

async function fetchDataFromCollections(collections, page, author) {
    const unifiedResult = [];
    let count = 0
    for (const collection of collections) {
        const query = strapi.db.query(collection);
        const foundItem = await query.findMany({
            populate: ['createdBy', 'thumbnail', 'Tags', 'Hot'],
            where: {
                createdBy: {
                    firstname: author
                }
            }
        });
        count+=foundItem.length
        const createdByFields = extractCreatedByFields(foundItem);
        const collectionName = collection.split('::').pop().split('.').pop();

        createdByFields.forEach(item => {
            item.newsType = collectionName;
        });
        unifiedResult.push(...createdByFields);
    }
    
    const filteredData = unifiedResult.filter(item => item.publishedAt !== null);

    filteredData.forEach(item => {
        item.publishedAt = new Date(item.publishedAt);
    });

    filteredData.sort((a, b) => b.publishedAt - a.publishedAt);
    const paginatedData = filteredData.slice(0, page*15+15)
    const groupedData = {};

    paginatedData.forEach(item => {
      const publishedAt = new Date(item.publishedAt); // Convert 'publishedAt' to a Date object
      const dayKey = publishedAt.toDateString(); // Get the day as a string
    
      if (!groupedData[dayKey]) { 
        groupedData[dayKey] = [];
      }
    
      groupedData[dayKey].push(item);
    });
    
    // return filteredData.slice(page*15, page*15+15 );
    // return groupedData
    return {
        success: true,
        data: groupedData,
        newsCount: count
    }
}
module.exports = {
    authorNews: async (page, author, type) => {
        try {
            const collections = ['api::news.news', 'api::link.link', 'api::unread-news.unread-news']
            const unifiedData = await fetchDataFromCollections(collections, page, author);
            return unifiedData;

        } catch (err) {
            return err;
        }
    },
};