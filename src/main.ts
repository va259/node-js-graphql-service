import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import {genreTypeDefs, genreResolvers, GenreAPI,
  artistTypeDefs, artistResolvers, ArtistAPI,
  bandTypeDefs, bandResolvers, BandAPI,
  userTypeDefs, userResolvers, UserAPI,
} from '.';

const PORT = process.env.PORT;
export const server = new ApolloServer({
  typeDefs: [
    genreTypeDefs,
    artistTypeDefs,
    bandTypeDefs,
    userTypeDefs,
  ],
  resolvers: [
    genreResolvers,
    artistResolvers,
    bandResolvers,
    userResolvers,
  ],
  csrfPrevention:true,
  cache: 'bounded',
  dataSources: () => {
    return {
      genreAPI: new GenreAPI(),
      artistAPI: new ArtistAPI(),
      bandAPI: new BandAPI(),
      userAPI: new UserAPI(),
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
