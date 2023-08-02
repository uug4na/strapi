'use strict';

/**
 * long-news service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::long-news.long-news');
