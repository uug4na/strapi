'use strict';

/**
 * unread-news service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::unread-news.unread-news');
