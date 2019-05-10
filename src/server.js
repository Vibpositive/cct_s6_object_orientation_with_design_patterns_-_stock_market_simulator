import express from 'express';
import { apolloServer } from 'graphql-tools';
import Schema from './data/schema';
// import Mocks from './data/mocks';
import Resolvers from './data/resolvers';

console.log(process.env.CLEARDB_DATABASE_URL);

var graphQLServer = express();
graphQLServer.use('/', apolloServer({
  graphiql: true,
  pretty: true,
  schema: Schema,
  resolvers: Resolvers,
}));
graphQLServer.listen(process.env.PORT || 4000, () => console.log(
  `GraphQL Server is now running on http://localhost:${process.env.PORT || 4000}/`
));
