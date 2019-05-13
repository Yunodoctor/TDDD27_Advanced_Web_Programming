const express = require("express");
const mongodb = require("mongodb");
var ObjectId = require("mongodb").ObjectID;

const router = express.Router();

//Get Posts
router.get("/", async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
}); //Reference to route

//Get Posts to Archive Post
router.get("/archive", async (req, res) => {
  const archive = await ArchivePostsCollection();
  res.send(await archive.find({}).toArray());
}); //Reference to route

//Add Post
router.post("/", async (req, res) => {
  console.log("här läggs det till", req.body);
  const posts = await loadPostsCollection();
  await posts.insertOne({
    headText: req.body.headText,
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Archive Post
router.post("/archive", async (req, res) => {
  const archive = await ArchivePostsCollection();
  await archive.insertOne({
    headText: req.body.headText,
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

//Update Post
router.post("/editPost", async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.findOneAndReplace(
    { _id: { $eq: ObjectId(req.body.id) } },
    {
      $set: {
        headText: req.body.headText,
        text: req.body.text,
        createdAt: new Date()
      }
    }
  );
  /*
  await posts.findOneAndUpdate(
    { _id: req.body.id },
    { $set: { text: req.body.text, headText: req.body.headText } }
  );
    */
  //console.log(posts);

  // await posts.findOneAndUpdate({
  //   headText: req.body.headText,
  //   text: req.body.text,
  //   createdAt: new Date()
  //const testPost = await posts.find(req.body.id);
  //console.log(testPost);
  /*
  await posts
    .updateOne(
      { _id: ObjectId`(${req.body.id})` },
      { $rename: { text: req.body.text, headText: req.body.headText } }
    )
    .then(res => {
      console.log(res);
    });
    */
  // });
  res.status(201).send();
});

//Delete Post
router.delete("/:id", async (req, res) => {
  console.log("Delete post händer här");
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

async function ArchivePostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://abc123:abc123%21@cluster0-afmwr.mongodb.net/test?retryWrites=true"',
    { useNewUrlParser: true }
  );
  return client.db("Cluster0").collection("archive");
}
module.exports = router;
