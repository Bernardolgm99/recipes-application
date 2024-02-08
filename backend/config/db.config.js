module.exports = {
    development: {
      dialect: 'sqlite',
      storage: './database.sqlite', // Specify the path for the SQLite database file
    },
    test: {
      dialect: 'sqlite',
      storage: ':memory:', // Use in-memory storage for testing
    },
    production: {
      dialect: 'sqlite',
      storage: './database.sqlite',
    },
  };