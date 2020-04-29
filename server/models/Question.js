const db = require('../db');

module.exports.Schema = knex => {
  return knex.schema.createTable('questions', table => {
    table.increments('id'); // Primary Key id
    table.string('text', 255);
    
  })
}

module.exports.DestorySchema = knex => {
  return knex.schema.dropTable('questions')
}