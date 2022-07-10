import {gql} from 'apollo-server';

export const trackTypeDefs = gql`
  type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  type Query {
    tracks(offset: Int!, limit: Int!): [Track]!
    track(id: ID!): Track
  }

  type Mutation {
    createTrack(input: CreateTrackInput!): TrackResponse!
    updateTrack(id: ID!, input: UpdateTrackInput!): TrackResponse!
    deleteTrack(id: ID!): TrackResponse!
  }

  input CreateTrackInput {
    title: String!
    albumId: ID
    bandsIds: [ID]
    artistsIds: [ID]
    duration: Int
    released: Int
    genresIds: [ID]
  }

  input UpdateTrackInput {
    title: String
    albumId: ID
    bandsIds: [ID]
    artistsIds: [ID]
    duration: Int
    released: Int
    genresIds: [ID]
  }

  type TrackResponse {
    code: Int!
    success: Boolean!
    message: String!
    track: Track
  }

  # interface Track {

  # }
`
