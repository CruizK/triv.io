const db = require('../db');

module.exports.Schema = knex => {
  return knex.schema.createTable('questions', table => {
    table.increments('id'); // Primary Key id
    table.integer('category_id').references('id').inTable('categories').onDelete('CASCADE');
    table.string('text', 255);

    table.string('correct_answer');
    table.string('incorrect_answer_1');
    table.string('incorrect_answer_2');
    table.string('incorrect_answer_3');
  })
}

module.exports.DestorySchema = knex => {
  return knex.schema.dropTable('questions')
}


module.exports.GetRandomQuestion = async () => {
  const count = await db('questions').count('*');
  const offset = Math.floor(Math.random() * count[0].count);
  console.log(offset);

  return db('questions').select('questions.*', 'categories.name as category_name').offset(offset).limit(1).join('categories', 'questions.category_id', 'categories.id');
}

module.exports.CreateQuestion = questionData => {
  return db('questions').insert(questionData).returning('id');
}