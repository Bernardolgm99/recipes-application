const db = require('../models/index.js');
const Recipe = db.recipe
const Indredient = db.ingredient
const { Op, literal } = require("sequelize");

const recipeResolvers = {
  Query: {
    getRecipe: async (_, { id }) => {
      try {
        return await Recipe.findByPk(id);
      } catch (err) {
        console.error(err);
      }
    },
    getRecipes: async (_, { page, pageSize }) => {
      try {
        return await Recipe.findAll({ offset: page, limit: pageSize });
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    createRecipe: async (_, { input }, context) => {
      try {
        if (input) {
          await Recipe.create(input).catch(err => { throw new Error(err) });
          return "Recipe created"
        } else {
          return "Empty input"
        }
      } catch (err) {
        console.error(err);
        return err.message.split(': ').pop();
      }
    },
    editRecipe: async (_, { id, input }) => {
      try {
        const recipe = await Recipe.findByPk(id)
          .catch(err => { throw new Error(err) });
        if (input.name) recipe.name = input.name;
        if (input.image) recipe.image = input.image;
        if (input.observation) recipe.observation = input.observation;
        await recipe.save()
        return "Recipe updated"
      } catch (err) {
        console.error(err);
        return err.message.split(': ').pop();
      }
    },
    deleteRecipe: async (_, { id }) => {
      try {
        await Recipe.destroy({ where: { id: id } })
          .catch(err => { throw new Error(err) });
        return "Indredient deleted"
      } catch (err) {
        console.error(err);
        return err.message.split(': ').pop();
      }
    },
    associateIngredient: async (_, { id_recipe, ids_ingredient }) => {
      try {
        const recipe = await Recipe.findByPk(id_recipe)
        const ingredientsAssociated = [];
        ids_ingredient.forEach(async (id_ingredient) => {
          const ingredient = await Indredient.findByPk(id_ingredient)
            .catch(err => { throw new Error(err) });
          if (ingredient) {
            await recipe.addIngredient(ingredient);
            ingredientsAssociated.push(ingredient.name);
          };
        });
        return ingredientsAssociated;
      } catch (err) {
        console.error(err);
        return err.message.split(': ').pop();
      }
    },
  },
  Recipe: {
    ingredients: async (recipe, { page, pageSize }) => {
      try {
        const new_recipe = await Recipe.findByPk(recipe.id)
          .catch(err => { throw new Error(err) });
        return await new_recipe.getIngredients();
      } catch (err) {
        console.log(err);
        return err.message.split(': ').pop();
      }
    }
  }
};

module.exports = recipeResolvers;

