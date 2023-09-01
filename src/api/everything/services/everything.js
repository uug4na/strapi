'use strict';
// services/everything.js

module.exports = {
  Everything: async () => {
    try {
      const collections = ["banner", "datas", "layout", "link", "news", "special"];
      let combinedData = [];
      strapi.log.info('Combined Data'); 
      for (const collection of collections) {
        const entries = await strapi.query(collection).find();
        console.log(`working: ${entries}`)
        combinedData.push(...entries);
      }

      return combinedData;
    } catch (err) {
      throw err;
    }
  },
};
