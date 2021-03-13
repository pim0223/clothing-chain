# Clothing chain back end
Back end for the clothing chain app, written in Node.js and Firebase.

## Set up
- Make sure you have [npm installed](https://www.npmjs.com/get-npm) so you can install packages
- Install dependencies by running `npm install` in the root of the project.
- Install the [Firebase CLI](https://firebase.google.com/docs/cli)

## Serving locally
For development, it is easiest to host locally. Any code changes will instantly be reflected.
- Navigate to `firebase/functions` and run `firebase serve`
- If all goes well, firebase will give you the API endpoint, something like `http://localhost:5000/firebase-map-304420/europe-west3/api`
- You can use a client (liek your browser or postman) to interact with the API

## Deploying
Deployment is easy!
- Navigate to `firebase/functions` and run `firebase deploy`
- The remote API route is in the firebase web interface under the "functions" tab
