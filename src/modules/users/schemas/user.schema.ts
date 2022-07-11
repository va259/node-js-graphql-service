import {gql} from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    id: ID!
    firstName: String
    secondName: String
    password: String
    email: String!
  }

  type Query {
    user(id:ID!): User
    jwt(email: String!, password: String!): String
  }

  type Mutation {
    register(input: RegisterUserInput!): RegisterResponse!
  }

  input RegisterUserInput {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
  }

  type RegisterResponse {
    code: Int!
    success: Boolean!
    message: String!
    user: User
  }
`
