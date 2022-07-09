import {gql} from 'apollo-server';

export const artistTypeDefs = gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  type Query {
    artist(id: ID!): Artist
    artists: [Artist]!
}

  type Mutation {
    createArtist(input: CreateArtistInput!): ArtistResponse
    updateArtist(id: ID!, input: UpdateArtistInput!): ArtistResponse
    deleteArtist(id: ID!): ArtistResponse
  }

  input CreateArtistInput {
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [ID]
    instruments: [ID]
  }

  input UpdateArtistInput {
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [ID]
    instruments: [ID]
  }

  type ArtistResponse {
    code: Int!
    success: Boolean!
    message: String!
    artist: Artist
  }
`
