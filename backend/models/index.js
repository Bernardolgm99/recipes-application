console.clear(); // Clear the console before running

const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/db.config.js')
const db = {}
const sequelize = new Sequelize(config['development'])

//DROP ALL TABLES
//sequelize.drop()

db.sequelize = sequelize
db.ingredient = require('./ingredient.model.js')(sequelize, DataTypes)
db.recipe = require('./recipe.model.js')(sequelize, DataTypes)

// Connections

// M:N
db.ingredient.belongsToMany(db.recipe, { through: 'recipeIngredient', as: 'Recipes' })
db.recipe.belongsToMany(db.ingredient, { through: 'recipeIngredient', as: 'Ingredients' });

//SYNC DATABASE
//IF YOU WANT TO DELETE OR FORCE SOMETHING INTO THE DB, CHANGE ALTER: FALSE TO TRUE

// sequelize.sync({ alter: true })
//   .then(() => {
//     console.log("DB is successfully synchronized");
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = db;
