import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import { genreTypeDefs, genreResolvers, GenreAPI } from '.';

const PORT = process.env.PORT;
export const server = new ApolloServer({
  typeDefs: [
    genreTypeDefs,
  ],
  resolvers: [
    genreResolvers,
  ],
  csrfPrevention:true,
  cache: 'bounded',
  dataSources: () => {
    return {
      genreAPI: new GenreAPI(),
    }
  },
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
