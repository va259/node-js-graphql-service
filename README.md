# Graphql Service

A service written used [Apollo Server](https://www.apollographql.com/ "Apollo Server") to manage and retrieve data from different sources/microservices

You'll need to clone and install [Musicify microservices repo](https://github.com/rolling-scopes-school/node-graphql-service) in order to test and use this GraphQL app.

Server starts on `port 4000` by default, the port can be set in .env file (rename .env.example to .env).

To start the app in production mode run:
```
npm start
```

To start the app in dev mode run:
```
npm run start:dev
```

Go to http://localhost:4000/ and click on 'Query your server' button to launch Apollo Studio environment.

<details>
  <summary>Implemented queries:</summary>
  ```
  - artist
  - artists
  - genre
  - genres
  - track
  - tracks
  - band
  - bands
  - album
  - albums
  - jwt
  - user
  - favourites (available only for logged in user)
  ```
</details>

<details>
  <summary>Implemented mutations:</summary>
  ```
  - Artists
    - createArtist
    - deleteArtist
    - updateArtist
  - Genres
    - createGenre
    - deleteGenre
    - updateGenre
  - Bands
    - createBand
    - deleteBand
    - updateBand
  - Tracks
    - createTrack
    - deleteTrack
    - updateTrack
  - Albums
    - createAlbum
    - deleteAlbum
    - updateAlbum
  - Users
    - register
  - Favourites
    - addTrackToFavourites
    - addBandToFavourites
    - addArtistToFavourites
    - addGenreToFavourites
  ```
</details>

You'll need to have your user logged in to test all available queries and mutations.

Login Query (get jwt token) (GrapQL format):
```graphql
query($email: String!, $password: String!){
  jwt(email: $email, password: $password)
}
```

Variables (JSON format):
```JSON
{
  "email": "example@email.com",
  "password": "pass12345678"
}
```

Response:
```JSON
{
  "data": {
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM3ZWRmMWY4Y2M5Nzc2YWJjNjZmYzUiLCJmaXJzdE5hbWUiOiJmbmFtZTMiLCJsYXN0TmFtZSI6ImxuYW1lMyIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImlhdCI6MTY1NzU0NjA5NX0.4oZ9CNkOSqEYe-357oCpa-hYxWWfki2rzTKiF2cWbEk"
  }
}
```

All iterable queries have pagination and you need to specify offset and limit parameters:

Query:
```graphql
query($offset: Int!, $limit: Int!){
  bands(offset: $offset, limit: $limit) {
    id
    name
    members {
      firstName
      secondName
      instrument
      years
    }
  }
}
```

Variables
```JSON
{
  "offset": 0,
  "limit": 3
}
```

Response:
```JSON
{
  "data": {
    "bands": [
      {
        "id": "62c87b1315c9befc57215a3d",
        "name": "Drexciya",
        "members": [
          {
            "firstName": "Gerald",
            "secondName": "Donald",
            "instrument": "synths",
            "years": [
              "1992–2002"
            ]
          },
          {
            "firstName": "James",
            "secondName": "Stinson",
            "instrument": "synths",
            "years": [
              "1992–2002"
            ]
          }
        ]
      }
    ]
  }
}
```

All mutations in the app have similar structure with:
```graphql
mutation($input: ActionInput!){
  action(input: $input) {
    code
    success
    message
    returned entity{
      item
      item
      item
    }
  }
}
```

##Examples

For example to register a new user use mutation:
```graphql
mutation($input: RegisterUserInput!){
  register(input: $input) {
    code
    success
    message
    user {
      email
      password
      firstName
      secondName
    }
  }
}
```

Variables for such mutation have structure:
```JSON
{
  "input": {
    "email": "example@email.com",
    "password": "123qwerty",
    "firstName": "fname",
    "lastName": "lname"
  }
}
```

Mutations related to Favourites entity have following structure:

Mutation:
```graphql
mutation($addTrackToFavouritesId: ID!){
  addTrackToFavourites(id: $addTrackToFavouritesId) {
    success
    code
    message
    id
  }
}
```

Variables:
```JSON
{
  "addTrackToFavouritesId": "62c875b615c9befc57215a37"
}
```

Response:
```JSON
{
  "data": {
    "addTrackToFavourites": {
      "success": true,
      "code": 200,
      "message": "Track was successfully added to your favourites",
      "id": "62cae033f01fe49d520d240a"
    }
  }
}
```
