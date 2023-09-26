'use strict';

/**
 * banner service
 */


module.exports = {
    extractCreatedByFields: async (items) => {
        try {
            return items.map(item => {
                const createdByFields = item.createdBy
                    ? { id: item.createdBy.id, firstname: item.createdBy.firstname, lastname: item.createdBy.lastname }
                    : null;
        
                return {
                    ...item,
                    createdBy: createdByFields,
                };
            });
        } catch (err) {
            return err;
        }
    },
};