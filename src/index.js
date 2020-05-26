// create & setup nodeJS graphql server
// this file runs on npm start, as defined in package.json scripts

import '@babel/polyfill'

import { GraphQLServer, PubSub } from 'graphql-yoga';
import { resolvers, fragmentReplacements } from './resolvers/index';
import db from './db';
import prisma from './prisma';

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  // These resolvers will all be given access to the context defined below
  resolvers,
  // request contains request.headers (so request.resquest.headers) which we use to pass the JWT token from the client
  context(request) {
    return {
      db,
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
})

server.start({
  // Let heroku choose port or fallback on our local 4000 if dev 
  port: process.env.PORT || 4000
}, () => {
  console.log('The server is up!')
})
