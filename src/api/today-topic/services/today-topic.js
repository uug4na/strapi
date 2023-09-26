'use strict';

/**
 * today-topic service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::today-topic.today-topic');
