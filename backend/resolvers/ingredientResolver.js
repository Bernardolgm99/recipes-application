const db = require('../models/index.js');
const Ingredient = db.ingredient
const { Op, literal } = require("sequelize");

const ingredientResolvers = {
  Query: {
    getIngredient: async (_, { id }) => {
      try {
        return await Ingredient.findByPk(id);
      } catch (err) {
        console.error(err);
      }
    },
    getIngredients: async (_, { page, pageSize }) => {
      try {
        return await Ingredient.findAll({ offset: page, limit: pageSize });
      } catch (err) {
        console.error(err);
      }
    },
  },
  Mutation: {
    createIngredient: async (_, { input }) => {
      try {
        if (input) {
          await Ingredient.create(input).catch(err => { throw new Error(err) });
          return "Ingredient Created"
        } else {
          return "Empty input"
        }
      } catch (err) {
        console.error(err);
        return err.message.split(': ').pop();
      }
    },
    editIngredient: async (_, { id, input }) => {
      try {
        const ingredient = await Ingredient.findByPk(id)
          .catch(err => { throw new Error(err) });
        if (input.name) ingredient.name = input.name;
        if (input.calories) ingredient.calories = input.calories;
        if (input.proteins) ingredient.proteins = input.proteins;
        if (input.total_fat) ingredient.total_fat = input.total_fat;
        if (input.saturated_fat) ingredient.saturated_fat = input.saturated_fat;
        if (input.trans_fat) ingredient.trans_fat = input.trans_fat;
        if (input.total_carbohydrates) ingredient.total_carbohydrates = input.total_carbohydrates;
        if (input.sugars) ingredient.sugars = input.sugars;
        if (input.dietary_fiber) ingredient.dietary_fiber = input.dietary_fiber;
        await ingredient.save()
        return "Ingredient updated"
      } catch (err) {
        console.error(err);
        return err.message.split(': ').pop();
      }
    },
    deleteIngredient: async (_, { id }) => {
      try {
        await Ingredient.destroy({ where: { id: id } })
          .catch(err => { throw new Error(err) });
        return "Indredient deleted"
      } catch (err) {
        console.error(err);
        return err.message.split(': ').pop();
      }
    },
  },
};

module.exports = ingredientResolvers;

