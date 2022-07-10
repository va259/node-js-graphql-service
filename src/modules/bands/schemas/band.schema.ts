import {gql} from 'apollo-server';

export const bandTypeDefs = gql`
type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Member {
    artistId: ID!
    firstName: String
    secondName: String
    middleName: String
    instrument: String
    years: [String]
  }

  type Query {
    bands(offset: Int, limit: Int): [Band]!
    band(id: ID!): Band
  }

  type Mutation {
    createBand(input: CreateBandInput!): BandResponse!
    updateBand(id: ID!, input: UpdateBandInput!): BandResponse!
    deleteBand(id: ID!): BandResponse!
  }
  
  input CreateBandInput {
    name: String!
    origin: String
    members: [MemberInput]
    website: String
    genresIds: [ID]
  }

  input UpdateBandInput {
    name: String
    origin: String
    members: [MemberInput]
    website: String
    genresIds: [ID]
  }

  input MemberInput {
    artistId: ID!
    instrument: String
    years: [String]
  }

  type BandResponse {
    code: Int!
    success: Boolean!
    message: String!
    band: Band
  }
`
