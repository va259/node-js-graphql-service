import { AuthenticationError } from 'apollo-server';

export const albumResolvers = {
  Album: {
    id: (parent: any) => parent._id,

    async artists(parent: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(parent.artistsIds.map(async (artistId: string) => {
        return dataSources.artistAPI.getArtistById(artistId)
      }))).map((artist: any) => ({...artist}))
    },

    async bands({ bandsIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(bandsIds.map(async (bandsId: string) => {
        return dataSources.bandAPI.getBandById(bandsId)
      }))).map((band: any) => ({...band}))
    },

    async tracks({ trackIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(trackIds.map(async (trackId: string) => {
        return dataSources.trackAPI.getTrackById(trackId)
      }))).map((track: any) => ({...track}))
    },

    async genres({ genresIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(genresIds.map(async (genresId: string) => {
        return dataSources.genreAPI.getGenreById(genresId)
      }))).map((genre: any) => ({...genre}))
    }
  },

  Query: {
    albums: (_: undefined, { offset, limit }: { offset: number, limit: number },
      { dataSources }: { dataSources: any }) => {
      return dataSources.albumAPI.getAlbums(offset, limit)
    },

    album: (_: undefined, { id }: { id: string }, { dataSources }: { dataSources: any }) => {
      return dataSources.albumAPI.getAlbumById(id);
    }
  },

  Mutation: {
    createAlbum: async (_: undefined, { input }: any, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const album = await context.dataSources.albumAPI.createAlbum(input);

        return {
          code: 200,
          success: true,
          message: `Album was successfully created`,
          album
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          album: null
        }
      }
    },

    updateAlbum: async (_: undefined, { id, input }: { id: string, input: any }, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const album = await context.dataSources.albumAPI.updateAlbum(id, input);

        return {
          code: 200,
          success: true,
          message: `Album was successfully updated`,
          album
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          album: null
        }
      }
    },

    deleteAlbum: (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const album = context.dataSources.albumAPI.deleteAlbum(id);

        return {
          code: 200,
          success: true,
          message: `Album was successfully deleted: ${id}`,
          album: null
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          album: null
        };
      }
    }
  }
}
