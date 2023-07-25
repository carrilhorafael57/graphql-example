const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');

const typesArray = loadFilesSync('**/*', {
  extensions: ['graphql'],
});

const resolversArray = loadFilesSync('**/*', {
  extensions: ['resolvers.js'],
});

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resolversArray,
});

const port = 3000;
const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () =>
  console.log(`Running GraphQL server on port ${port}...`)
);
