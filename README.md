# Pokemon WebApi

## Quick start
```
# Clone the webapi repository in your local machine
$ git clone https://github.com/Will-h0219/pokemon-webapi-node

# Change directory to webapi
$ cd pokemon-webapi-node

# Install dependencies
$ npm install

# Create .env file with variables PORT and CONNECTION_STRING

# Start the server
$ npm start:dev
```

## Requirements
- Mongo account for connecting the webapi
- Node > 16.14.x (I use 16.14.2 for this one)

## What is all about?
I've created this small project for fun, I think this can help anyone who wants to develop a web application and maybe the free APIs that are around are not what they are looking for to implement CRUD operations.
Or maybe someone is looking for a specific feature for a simple webapi and this one can be of help, idk.
This allows anyone to start a server locally a use their own data to make CRUD operations using pokemons as the data material... and everyone knows Pokemon 😁.

### Features
**Basic CRUD operations:** The webapi just points to one collection of pokemons in mongo and you just need to use `http://YOUR_HOST/api/v1/pokemon` as the base url for `GET, POST, PUT, DELETE`.

**Pagination** By default the `GET` request will return a paginated response like this:
```
{
  count: 32,
  hasPrevious: false,
  hasNext: true,
  results: [ // 5 pokemons ],
  nextPageUrl: http://YOUR_HOST/api/v1/pokemon?page=2
}
```
So you can use it for pagination in a web app, for now there it not supports a page size parameter, so it always will return 5 pokemon objects in the result property.

**Search by name**: With the previous URL it's also possible to add a `name` queryParam to search by name coincidence, the response will be the same but just with the results that have a coincidence with the `name` provided, something like:
`http://YOUR_HOST/api/v1/pokemon?name=char` will return 2 pokemons (CHARmander and CHARizard) if you have those created in your DB.

**Create new:** With the base URL and a `POST` request you just need to provide the fields in the body of the request like this (yeah those are weird stats for a Pikachu):
```
{
    "name": "Pikachu",
    "attack": 65,
    "defense": 39,
    "hp": 89,
    "type": "Agua"
}
```
All of above are required.

**Update:** You can provide a body like the one used in the create new but in a `PUT` request and providing the pokemon Id in the url as a param like this: `http://YOUR_HOST/api/v1/pokemon/POKEMON_ID`

**Delete:** To delete a pokemon jus make a `DELETE` request with the base URL and the pokemon Id as a param like this: `http://YOUR_HOST/api/v1/pokemon/POKEMON_ID`
