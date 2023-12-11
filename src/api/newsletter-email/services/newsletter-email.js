'use strict';

/**
 * newsletter-email service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::newsletter-email.newsletter-email');
