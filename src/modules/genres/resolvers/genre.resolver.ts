import { AuthenticationError } from 'apollo-server';

export const genreResolvers = {
  Genre: { id: (parent: any) => parent._id },

  Query: {
    genres: (_: undefined, __: undefined, { dataSources }: { dataSources: any }) => {
      return dataSources.genreAPI.getGenres()
    },

    genre: (_: undefined, { id }: { id: string }, { dataSources }: { dataSources: any }) => {
      return dataSources.genreAPI.getGenreById(id);
    }
  },

  Mutation: {
    createGenre: async (_: undefined, { input }: any, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const genre = await context.dataSources.genreAPI.createGenre(input);
        return {
          code: 200,
          success: true,
          message: `Genre was successfully created`,
          genre
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          genre: null
        }
      }
    },

    updateGenre: async (_: undefined, { id, input }: { id: string, input: any }, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const genre = await context.dataSources.genreAPI.updateGenre(id, input);
        return {
          code: 200,
          success: true,
          message: `Genre was successfully updated`,
          genre
        }
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          genre: null
        }
      }
    },

    deleteGenre: (_: undefined, { id }: { id: string}, context: any) => {
      if (!context.token) throw new AuthenticationError('You must be logged in');

      try {
        const genre = context.dataSources.genreAPI.deleteGenre(id);
          return {
            code: 200,
            success: true,
            message: `Genre was successfully deleted: ${id}`,
            genre: null
          };
      } catch (err: any) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          genre: null
        };
      }
    }
  }
}
