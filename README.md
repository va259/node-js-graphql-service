# node-js-graphql-service

To start the app in production mode run:
```
npm start
```

To start the app in dev mode run:
```
npm run start:dev
```

Create Artist input:
```
"firstName":"Laura",
"secondName":"Lee",
"instruments":["Bass"],
"country":"USA",
"birthDate":"14/10/1986",
"birthPlace":"Houston, Texas, USA"
```

Create Band input:

```
"input": {
      "name":"Drexciya",
      "members":[
        {
          "artistId": "62c879471fffbc5935a5b7e3",
          "instrument": "synths",
          "years": "1992–2002"
        },
        {
          "artistId": "62c879a31fffbc5935a5b7e5",
          "instrument": "synths",
          "years": "1992–2002"
        }
      ],
      "genresIds":["62c87a6f54cdbcb485e98c85", "62c87ab154cdbcb485e98c87", "62c87af754cdbcb485e98c8b"]
    }
```
Create Band Response:

```
{
  "data": {
    "createBand": {
      "success": true,
      "code": 200,
      "message": "Band was successfully created",
      "band": {
        "id": "62c87b1315c9befc57215a3d",
        "name": "Drexciya",
        "website": null,
        "members": [
          {
            "artistId": "62c879471fffbc5935a5b7e3",
            "instrument": "synths",
            "years": [
              "1992–2002"
            ]
          },
          {
            "artistId": "62c879a31fffbc5935a5b7e5",
            "instrument": "synths",
            "years": [
              "1992–2002"
            ]
          }
        ],
        "genres": null
      }
    }
  }
}
```


Favourites:

Mutation:
```
mutation($addTrackToFavouritesId: ID!){
  addTrackToFavourites(id: $addTrackToFavouritesId) {
    success
    code
    message
    id
  }
}
```


Response:
```
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
