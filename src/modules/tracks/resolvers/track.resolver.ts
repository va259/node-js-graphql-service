import { AuthenticationError } from 'apollo-server';

export const trackResolvers = {
  Track: {
    id: (parent: any) => parent._id,

    album({ albumId }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return dataSources.albumAPI.getAlbumById(albumId);
    },

    async bands({ bandsIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(bandsIds.map(async (bandsId: string) => {
        return dataSources.bandAPI.getBandById(bandsId)
      }))).map((band: any) => ({...band}))
    },

    async artists({ artistsIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(artistsIds.map(async (artistId: string) => {
        return dataSources.artistAPI.getArtistById(artistId)
      }))).map((artist: any) => ({...artist}))
    },

    async genres({ genresIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(genresIds.map(async (genresId: string) => {
        return dataSources.genreAPI.getGenreById(genresId)
      }))).map((genre: any) => ({...genre}))
    }
  },

  Query: {
    tracks: (_: undefined, { offset, limit }: { offset: number, limit: number },
      { dataSources }: { dataSources: any }) => {
      return dataSources.trackAPI.getTracks(offset, limit);
    },

    track: (_: undefined, { id }: { id: string }, { dataSources }: { dataSources: any }) => {
      return dataSources.trackAPI.getTrackById(id);
    }
  },

  Mutation: {
    createTrack: async (_: undefined, { input }: any, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const track = await context.dataSources.trackAPI.createTrack(input);
        return {
          code: 200,
          success: true,
          message: `Successfully created track`,
          track
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        }
      }
    },

    updateTrack: async (_: undefined, { id, input }: { id: string, input: any }, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const track = await context.dataSources.trackAPI.updateTrack(id, input);
        return {
          code: 200,
          success: true,
          message: `Successfully updated track`,
          track
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        }
      }
    },

    deleteTrack: (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const track = context.dataSources.trackAPI.deleteTrack(id);
          return {
            code: 200,
            success: true,
            message: `Successfully deleted track ${id}`,
            track: null
          };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null
        };
      }
    }
  }
}
