'use strict';

/**
 * current-event service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::current-event.current-event');
