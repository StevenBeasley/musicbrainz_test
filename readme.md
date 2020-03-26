# Stevens Coles test API

This will return an artist from musicbrainz.org if your query only returns one artist, otherwise it will return a list of all available artists.

# Prerequisites

Docker

NodeJS > 12 (if testing)

# Running the application

First build the image

`docker build -t steven/coles_test .`

Then run the image

`docker run -p 3000:3000 -d steven/coles_test`

The server will now be available on port 3000

Note that if you do not want to use docker, please set the env variables below:

`NODE_ENV production`

`PORT 3000`

Then run the following command:

`npm start`

# Using the application

You can query the server with a POST:

`curl --location --request POST 'http://localhost:3000/artist' --header 'Content-Type: application/x-www-form-urlencoded' --data-urlencode 'artist=queen'`

or a GET:

`curl --location --request GET 'http://localhost:3000/artist/Queen'`

# Testing the application

Assuming you already have NodeJS > 12 installed, trom the application directory first install the packages:

`npm install`

Now run the tests

`npm unit-test`
