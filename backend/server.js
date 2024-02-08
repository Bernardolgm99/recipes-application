const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const Apollo = require('apollo-server-express');
const mainSchema = require('./mainSchema.js');

app.use(express.json());
app.use(cors({ origin: '*' }))

const server = new Apollo.ApolloServer({
    schema: mainSchema,
    // context: async ({ req }) => {

    //     let token = req.headers.authorization || '';
    //     if (token) {
    //         token = auth.decode(token)
    //     };
    //     const user = token;
    //     return { req, user };
    // },
    formatError: (err) => {
        return ({ message: err })
    }
})

server.start().then(() => {
    server.applyMiddleware({ app, path: '/graphql' });
    app.use(cors);
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}/graphql`);
    })
})