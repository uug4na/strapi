'use strict';

// api/combined-data/controllers/combined-data.js
const { createCoreController } = require('@strapi/strapi').factories;
module.exports = {
  async find(ctx) {
    // Fetch data from each mode using Strapi's built-in find function
    const data1 = await strapi.query('News').find();
    const data2 = await strapi.query('banner').find();
    const data3 = await strapi.query('Link').find();

    // Combine data from all three models into a single array
    const combinedData = [...data1, ...data2, ...data3];

    // Sort the combined data based on the time property (assuming time is a field in your data)
    combinedData.sort((a, b) => {
      const timeA = new Date(a.time).getTime();
      const timeB = new Date(b.time).getTime();
      return timeA - timeB;
    });

    // Return the sorted data
    return combinedData;
  },
};

