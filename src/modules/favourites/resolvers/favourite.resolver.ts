import { AuthenticationError } from 'apollo-server';

export const favouriteResolvers = {
  Favourite: {
    id: (parent: any) => parent._id,

    async bands({ bandsIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(bandsIds.map(async (bandId: string) => {
        return dataSources.bandAPI.getBandById(bandId)
      }))).map((band: any) => ({...band}))
    },

    async genres({ genresIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(genresIds.map(async (genreId: string) => {
        return dataSources.genreAPI.getGenreById(genreId)
      }))).map((genre: any) => ({...genre}))
    },

    async artists({ artistsIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(artistsIds.map(async (artistId: string) => {
        return dataSources.artistAPI.getArtistById(artistId)
      }))).map((artist: any) => ({...artist}))
    },

    async tracks({ tracksIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(tracksIds.map(async (trackId: string) => {
        return dataSources.trackAPI.getTrackById(trackId)
      }))).map((track: any) => ({...track}))
    }
  },

  Query: {
    favourites: (_: undefined, __: undefined, context: any ) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');
      return context.dataSources.favouriteAPI.getFavourites();
    }
  },

  Mutation: {
    addTrackToFavourites: async (_: undefined, { id }: any, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        await context.dataSources.favouriteAPI.addToFavourites('tracks', id);

        return {
          code: 200,
          success: true,
          message: `Track was successfully added to your favourites`,
          id
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          id: null
        }
      }
    },

    addBandToFavourites: async (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        await context.dataSources.favouriteAPI.addToFavourites('bands', id);

        return {
          code: 200,
          success: true,
          message: `Band was successfully added to your favourites`,
          id
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          id: null
        }
      }
    },

    addArtistToFavourites: async (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        await context.dataSources.favouriteAPI.addToFavourites('artists', id);

        return {
          code: 200,
          success: true,
          message: `Artist was successfully added to your favourites`,
          id
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          id: null
        }
      }
    },

    addGenreToFavourites: async (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        await context.dataSources.favouriteAPI.addToFavourites('genres', id);

        return {
          code: 200,
          success: true,
          message: `Genre was successfully added to your favourites`,
          id
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          id: null
        }
      }
    }
  }
}
