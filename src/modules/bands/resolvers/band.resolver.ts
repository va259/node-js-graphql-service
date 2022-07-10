import { AuthenticationError } from 'apollo-server';

export const bandResolvers = {
  Member: {
    artistId: (parent: any) => parent._id,
  },
  
  Band: {
    id: (parent: any) => parent._id,
    
    async members(band: any, _: undefined, { dataSources }: { dataSources: any }) {
      const { members } = band;

      return (await Promise.all(members.map(async (member: any) => {
        return dataSources.artistAPI.getArtistById(member.artistId)
      }))).map((artist: any, index: number) => ({
        ...artist,
        instrument: members[index].instrument,
        years: members[index].years
      }))
    },

    async genres({ genresIds }: any, _: undefined, { dataSources }: { dataSources: any }) {
      return (await Promise.all(genresIds.map(async (genreId: string) => {
        return dataSources.genreAPI.getGenreById(genreId)
      }))).map((genre: any) => ({...genre}))
    }
  },

  Query: {
    bands: (_: undefined, __: undefined, { dataSources }: { dataSources: any }) => {
      return dataSources.bandAPI.getBands()
    },

    band: (_: undefined, { id }: { id: string }, { dataSources }: { dataSources: any }) => {
      return dataSources.bandAPI.getBandById(id);
    }
  },

  Mutation: {
    createBand: async (_: undefined, { input }: any, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const band = await context.dataSources.bandAPI.createBand(input);

        return {
          code: 200,
          success: true,
          message: `Band was successfully created`,
          band
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          band: null
        }
      }
    },

    updateBand: async (_: undefined, { id, input }: { id: string, input: any }, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const band = await context.dataSources.bandAPI.updateBand(id, input);

        return {
          code: 200,
          success: true,
          message: `Band was successfully updated`,
          band
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          band: null
        }
      }
    },

    deleteBand: (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const band = context.dataSources.bandAPI.deleteBand(id);

        return {
          code: 200,
          success: true,
          message: `Band was successfully deleted: ${id}`,
          band: null
        };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          band: null
        };
      }
    }
  }
}
