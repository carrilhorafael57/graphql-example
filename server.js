const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: {
    Query: {
      products: async (parent, args, context, info) => {
        console.log('Getting the products...');
        return await Promise.resolve(parent.products);
      },
      orders: async (parent, args, context, info) => {
        console.log('Getting orders...');
        return await Promise.resolve(parent.orders);
      },
    },
  },
});

const port = 3000;

const root = {
  products: require('./products/products.model'),
  orders: require('./orders/orders.model'),
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () =>
  console.log(`Running GraphQL server on port ${port}...`)
);
