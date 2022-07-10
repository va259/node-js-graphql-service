import {gql} from 'apollo-server';

export const favouriteTypeDefs = gql`
  type Favourite {
    id: ID!
    userId: ID
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  type Query {
    favourites: Favourite
  }

  type Mutation {
    addTrackToFavourites(id: ID!): FavouritesResponse!
    addBandToFavourites(id: ID!): FavouritesResponse!
    addArtistToFavourites(id: ID!): FavouritesResponse!
    addGenreToFavourites(id: ID!): FavouritesResponse!
    removeFromFavourites(id: ID! type: FavouriteType!): FavouritesResponse
  }

  type FavouritesResponse {
    code: Int!
    success: Boolean!
    message: String!
    id: ID
  }

  enum FavouriteType {
    tracks
    bands
    artists
    genres
  }
`
