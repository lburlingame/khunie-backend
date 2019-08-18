require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');

const app = express();

const path = '/graphql';
const PORT = 4000;

const { importSchema } = require('graphql-import');
const { prisma } = require('./generated/prisma-client');

const typeDefs = importSchema('src/schema.graphql');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Subscription = require('./resolvers/Subscription');
const User = require('./resolvers/User');
const Board = require('./resolvers/Board');
const List = require('./resolvers/List');
const Card = require('./resolvers/Card');
const Comment = require('./resolvers/Comment');

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Board,
  List,
  Card,
  Comment,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (req) => ({
    ...req,
    prisma,
  }),
});

app.use(cors());
app.use(helmet());

server.applyMiddleware({
  app,
  path,
});


const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({ port: PORT }, () => console.log('Server is running'));
