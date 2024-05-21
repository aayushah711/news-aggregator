# News Aggregator API

## Overview

The News Aggregator API fetches news based on user preferences including categories like general, business, entertainment, health, science, sports, and technology. It includes user registration and login using bcrypt for password hashing and JWT for token-based authentication, and uses the mediastack API for retrieving news.

## Features

- User registration and login
- Fetch news by user preferences
- Token-based authentication

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/aayushah711/news-aggregator.git
   cd news-aggregator
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a .env file in the root directory and add the following:

   ```env
   JWT_SECRET=<your_jwt_secret>
   MEDIASTACK_API_KEY=<your_mediastack_api_key>
   ```

4. **Start the server**

   ```bash
   npm start
   ```

## API Contracts

1. User Registration

- Endpoint: `POST /register`
- Description: Register a new user
- Request Body:

  ```
  {
    "email": "string",
    "password": "string",
    "preferences": ["sports"]
  }
  ```

* Response:

  ```
  {
      "message": "User registered successfully!",
      "data": {
          "email": "string",
          "password": "string",
          "preferences": [
              "sports"
          ],
      }
  }
  ```

2. User Login

- Endpoint: `POST /login`
- Description: Login an existing user
- Request Body:

  ```
  {
    "email": "string",
    "password": "string"
  }
  ```

- Response:

  ```
  {
      "user": {
          "id": "string"
      },
      "message": "Login successful",
      "accessToken": "string"
  }
  ```

3. Fetch News

- Endpoint: `GET /news`
- Description: Fetch news based on category
- Query Parameters:

  - `category` (optional): `general`, `business`, `entertainment`, `health`, `science`, `sports`, `technology`

- Headers:

  - `Authorization: <jwt_token>`

- Response:
  ```
  {
    "data": [
        {
            "author": null,
            "title": "Rick Engelkes na 7 jaar weer terug in het theater",
            "description": "Rick Engelkes keert in oktober na zeven jaar afwezigheid terug in het theater. De acteur produceert de voorstelling Murder on the nile en speelt een van de rollen, maakt zijn bedrijf REP Entertainment dinsdag bekend.",
            "url": "https://www.telegraaf.nl/entertainment/425435963/rick-engelkes-na-7-jaar-weer-terug-in-het-theater?utm_source=RSS&utm_medium=RSS",
            "source": "De Telegraaf - Entertainment Overzicht",
            "image": "https://www.telegraaf.nl/images/1200x630/filters:format(jpeg):quality(80)/cdn-kiosk-api.telegraaf.nl/c4ea34ac-174e-11ef-8f77-0218eaf05005.jpg",
            "category": "entertainment",
            "language": "nl",
            "country": "nl",
            "published_at": "2024-05-21T08:47:34+00:00"
        },
        ...
    ]
  }
  ```

4. Get Preferences

- Endpoint: `GET /preferences`
- Description: Get user preferences
- Headers:
  - `Authorization: <jwt_token>`
- Response:
  ```
  {
    "data": [
        "sports"
    ]
  }
  ```

5. Update Preferences

- Endpoint: `PUT /preferences`
- Description: Update user preferences
- Headers:

  - `Authorization: <jwt_token>`

- Request Body:

  ```
  {
      "preferences": ["entertainment", "science"]
  }
  ```

- Response:
  ```
    {
        "data": {
            "_id": "string",
            "email": "string",
            "password": "string",
            "preferences": [
                "entertainment",
                "science"
            ],
        },
        "message": "Preferences updated successfully"
    }
  ```
