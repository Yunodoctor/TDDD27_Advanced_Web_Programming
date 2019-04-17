const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

//Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
}); //Reference to route

//Add Post
router.post("/", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    headText: req.body.headText,
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Delete Post
router.delete("/:id", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://abc123:abc123%21@cluster0-afmwr.mongodb.net/test?retryWrites=true"',
    { useNewUrlParser: true }
  );
  return client.db("Cluster0").collection("posts");
}
module.exports = router;
