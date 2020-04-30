const db = require('../db');

module.exports.Schema = knex => {
  return knex.schema.createTable('categories', table => {
    table.increments('id'); // Primary Key id
    table.string('name').unique();
  })
}

module.exports.DestorySchema = knex => {
  return knex.schema.dropTable('categories')
}


module.exports.CreateCategory = categoryData => {
  return db('categories').insert(categoryData).returning('id');
}

module.exports.GetAllCategories = () => {
  return db('categories').select('*');
}