import {gql} from 'apollo-server';

export const genreTypeDefs = gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  type Query {
    genre(id: ID!): Genre
    genres: [Genre]!
  }

  type Mutation {
    createGenre(input: CreateGenreInput!): GenreResponse!
    updateGenre(id: ID!, input: UpdateGenreInput!): GenreResponse!
    deleteGenre(id: ID!): GenreResponse!
  }

  input CreateGenreInput {
    name: String!
    description: String
    country: String
    year: Int
  }

  input UpdateGenreInput {
    name: String
    description: String
    country: String
    year: Int
  }

  type GenreResponse {
    code: Int!
    success: Boolean!
    message: String!
    genre: Genre
  }
`
