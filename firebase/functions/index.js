const functions = require("firebase-functions");
const firebase = require("firebase");

const app = require("express")();

const {getAllChains, postOneChain} = require("./handlers/chains")
const {signup, login} = require("./handlers/users")
const FBAuth = require("./util/fbauth")


// Chain routes
app.get("/chains", getAllChains);
app.post("/chain", FBAuth, postOneChain);

// User routes
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.region("europe-west3").https.onRequest(app);
