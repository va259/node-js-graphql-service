import 'dotenv/config';
import { ApolloServer } from 'apollo-server';

const PORT = process.env.PORT;
export const server = new ApolloServer({
  typeDefs: [],
  resolvers: [],
  csrfPrevention:true,
  cache: 'bounded',
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return { token };
  },
});

server
  .listen({ port:PORT })
  .then(() => {console.log(`
    Server is running on port ${PORT}
    Query at https://studio.apollographql.com/dev
  `);
  })
