export const userResolvers = {
  Query: {
    jwt: async (_: undefined, { email, password }: { email: string, password: string },
      { dataSources }: { dataSources: any }) => {
        const data = await dataSources.userAPI.getJWT(email, password);
        return data.jwt
    }
  },

  Mutation: {
    register: async (_: undefined, { input }: any,
      { dataSources }: { dataSources: any }) => {
        const user = await dataSources.userAPI.register(input);
        return {
          code: 200,
          success: true,
          message: `Successfully registered`,
          user
        }
      }
  }
}
