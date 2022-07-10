import {gql} from 'apollo-server';

export const albumTypeDefs = gql`
  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  type Query {
    albums: [Album]!
    album(id: ID!): Album
  }

  type Mutation {
    createAlbum(input: CreateAlbumInput!): AlbumResponse!
    updateAlbum(id: ID!, input: UpdateAlbumInput!): AlbumResponse!
    deleteAlbum(id: ID!): AlbumResponse!
  }

  input CreateAlbumInput {
    name: String!
    released: Int
    artistsIds: [ID]
    bandsIds: [ID]
    trackIds: [ID]
    genresIds: [ID]
  }

  input UpdateAlbumInput {
    name: String
    released: Int
    artistsIds: [ID]
    bandsIds: [ID]
    trackIds: [ID]
    genresIds: [ID]
  }

  type AlbumResponse {
    code: Int!
    success: Boolean!
    message: String!
    album: Album
  }
`
