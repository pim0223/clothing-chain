const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require('express');
const app = express();

app.get("/chains", (req, res)=> {
  admin
  .firestore()
  .collection("chains")
  .orderBy("created_at", "desc")
  .get()
  .then((data) => {
    let chains = [];
    data.forEach((doc) => {
      chains.push({
        chain_id: doc.id,
        ...doc.data()
      });
    });
    return res.json(chains);
  })
  .catch((err) => console.error(err));

})

app.post("/chain", (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }

  const newChain = {
    name: req.body.name,
    latlon: req.body.latlon,
    created_at: new Date().toISOString(),
  };

  admin
    .firestore()
    .collection("chains")
    .add(newChain)
    .then((doc) => {
      res.json({ message: `Document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
});

exports.api = functions.region("europe-west3").https.onRequest(app);