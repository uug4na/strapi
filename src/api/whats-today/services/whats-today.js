'use strict';

/**
 * whats-today service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::whats-today.whats-today');
