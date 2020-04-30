const Question = require('../../models/Question');
const Category = require('../../models/Category')


exports.up = function(knex) {
  return Promise.all([
    Question.Schema(knex),
    Category.Schema(knex),
  ])
};

exports.down = function(knex) {
  return Promise.all([
    Question.DestorySchema(knex),
    Category.DestorySchema(knex),
  ])
};
