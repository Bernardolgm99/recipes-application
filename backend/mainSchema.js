const { makeExecutableSchema } = require('graphql-tools');

//Schema
const recipeSchema = require('./schemas/recipeSchema.graphql');
const ingredientSchema = require('./schemas/ingredientSchema.graphql');

//Resolvers
const recipeResolver = require('./resolvers/recipeResolver.js');
const ingredientResolver = require('./resolvers/ingredientResolver.js');


const mainSchema = makeExecutableSchema({
    typeDefs: [
        recipeSchema,
        ingredientSchema
    ],
    resolvers: [
        recipeResolver,
        ingredientResolver
    ],
});

module.exports = mainSchema;