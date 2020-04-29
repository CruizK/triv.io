module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'password',
      database: 'trivia-db'
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/dev/seeds'
    },
    useNullAsDefault: true
  },
};