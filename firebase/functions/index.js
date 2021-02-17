const app = require("express")();

const functions = require("firebase-functions");

// Firebase admin
const admin = require("firebase-admin");
admin.initializeApp();

// Firebase
const firebase = require("firebase");

// Initialize Firebase
const config = require("../../config")
firebase.initializeApp(config.firebaseConfig);


const db = admin.firestore();

app.get("/chains", (req, res) => {
  db.collection("chains")
    .orderBy("created_at", "desc")
    .get()
    .then((data) => {
      let chains = [];
      data.forEach((doc) => {
        chains.push({
          chain_id: doc.id,
          ...doc.data(),
        });
      });
      return res.json(chains);
    })
    .catch((err) => console.error(err));
});

app.post("/chain", (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const newChain = {
    name: req.body.name,
    latlon: req.body.latlon,
    created_at: new Date().toISOString(),
  };

  db.collection("chains")
    .add(newChain)
    .then((doc) => {
      res.json({ message: `Document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
});

// Sign up route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
  };

  let token, user_id;

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      user_id = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        email: newUser.email,
        created_at: new Date().toISOString(),
        user_id,
      };

      return db.doc(`/users/${newUser.user_id}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

exports.api = functions.region("europe-west3").https.onRequest(app);
