const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { ApolloServer } = require('apollo-server-express');
const { createServer } = require('http');


const { prisma } = require('./generated/prisma-client');

const app = express();

const path = '/graphql';
const PORT = 4000;

const { importSchema } = require('graphql-import');
const typeDefs = importSchema('src/schema.graphql');

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Board = require('./resolvers/Board');
const Vote = require('./resolvers/List');
const Subscription = require('./resolvers/Subscription');
  
const resolvers = {
	Query,
	Mutation,
	Subscription,
	User,
	Link,
	Vote,
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: req => {
		return {
			...req,
			prisma,
		};
	},
});

app.use(cors());
app.use(helmet());

server.applyMiddleware({ 
	app,
	path 
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);


httpServer.listen({ port: PORT }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);