# Jokebook API Documentation

## Endpoint 1 - Jokebook Categories

**Request Format:** `/jokebook/categories`
**Request Type:** `GET`
**Returned Data Format**: JSON
**Description:** Returns a list of all categories available in the jokebook.
**Example Request:** `GET http://localhost:3000/jokebook/categories`
**Example Response:**

```json
["funnyJoke", "lameJoke"]
```

## Endpoint 2 - Jokes in a category

**Request Format:** `/jokebook/joke/:category?limit=number`
**Request Type:** `GET`
**Returned Data Format**: JSON
**Description:** Returns a list of jokes from the specific category. An optional limit query parameter can limit the number of jokes returned
**Example Request:** `GET http://localhost:3000/jokebook/joke/funnyJoke?limit=2`

**Example Response:**

[
{
"joke": "Why did the student eat his homework?",
"response": "Because the teacher told him it was a piece of cake!"
},
{
"joke": "What kind of tree fits in your hand?",
"response": "A palm tree"
}
]

## Endpoint 3 - Add a new Joke

**Request Format:** `/jokebook/joke/new`
**Request Type:** `POST`
**Returned Data Format**: JSON
**Description:** Adds a new joke to the specific category in the jokebook.
**Example Request:** `POST http://localhost:3000/jokebook/joke/new`
**Example Response:**
{
"category": "funnyJoke",
"joke": "Why don't some couples go to the gym?",
"response": "Because some relationships don't work out!"
}
