import { AuthenticationError } from 'apollo-server';

export const artistResolvers = {
  Artist: { id: (parent: any) => parent._id },

  Query: {
    artists: (_: undefined, { offset, limit }: { offset: number, limit: number },
      { dataSources }: { dataSources: any }) => {
      return dataSources.artistAPI.getArtists(offset, limit)
    },

    artist: (_: undefined, { id }: { id: string }, { dataSources }: { dataSources: any }) => {
      return dataSources.artistAPI.getArtistById(id);
    }
  },

  Mutation: {
    createArtist: async (_: undefined, { input }: any, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const artist = await context.dataSources.artistAPI.createArtist(input);

        return {
          code: 200,
          success: true,
          message: `Artist was successfully created`,
          artist
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          artist: null
        }
      }
    },

    updateArtist: async (_: undefined, { id, input }: { id: string, input: any }, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const artist = await context.dataSources.artistAPI.updateArtist(id, input);

        return {
          code: 200,
          success: true,
          message: `Artist was successfully updated`,
          artist
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          artist: null
        }
      }
    },

    deleteArtist: (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const artist = context.dataSources.artistAPI.deleteArtist(id);

        return {
          code: 200,
          success: true,
          message: `Artist was successfully deleted: ${id}`,
          artist: null
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          artist: null
        };
      }
    }
  }
}
