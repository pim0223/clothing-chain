const { db } = require("../util/admin");

exports.getAllChains = (req, res) => {
  db.collection("chains")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let chains = [];
      data.forEach((doc) => {
        chains.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      return res.json(chains);
    })
    .catch((err) => console.error(err));
}

exports.postOneChain = (req, res) => {
  if (req.body.name.trim() === "") {
    return res.status(400).json({ name: "Name must not be empty" });
  }

  const newChain = {
    name: req.body.name,
    latLon: req.body.latLon,
    createdAt: new Date().toISOString(),
    userId: req.user.id,
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
}