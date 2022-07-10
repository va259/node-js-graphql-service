import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import {
  genreTypeDefs, genreResolvers, GenreAPI,
  artistTypeDefs, artistResolvers, ArtistAPI,
  bandTypeDefs, bandResolvers, BandAPI,
  userTypeDefs, userResolvers, UserAPI,
  trackTypeDefs, trackResolvers, TrackAPI,
  albumTypeDefs, albumResolvers, AlbumAPI,
  favouriteTypeDefs, favouriteResolvers, FavouriteAPI
} from '.';

const PORT = process.env.PORT;
export const server = new ApolloServer({
  typeDefs: [
    genreTypeDefs,
    artistTypeDefs,
    bandTypeDefs,
    userTypeDefs,
    trackTypeDefs,
    albumTypeDefs,
    favouriteTypeDefs
  ],
  resolvers: [
    genreResolvers,
    artistResolvers,
    bandResolvers,
    userResolvers,
    trackResolvers,
    albumResolvers,
    favouriteResolvers
  ],
  csrfPrevention:true,
  cache: 'bounded',
  dataSources: () => {
    return {
      genreAPI: new GenreAPI(),
      artistAPI: new ArtistAPI(),
      bandAPI: new BandAPI(),
      userAPI: new UserAPI(),
      trackAPI: new TrackAPI(),
      albumAPI: new AlbumAPI(),
      favouriteAPI: new FavouriteAPI()
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
