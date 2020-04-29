const knex = require('knex');

const instance = knex(require('./knexfile')['development']);

module.exports = instance;