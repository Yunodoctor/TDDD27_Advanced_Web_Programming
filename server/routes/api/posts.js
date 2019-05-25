const express = require("express");
var ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
const userSchema = require("../../models/UserSchema");
const postSchema = require("../../models/PostSchema");
const router = express.Router();

//Get Posts
router.get("/", async (req, res) => {
  //const posts = await loadPostsCollection();

  const dbData = await userSchema.findOne({ userEmail: req.query.email });

  const { email, user } = req.query;

  if (dbData) {
    //if there is a user, return the posts
    console.log("user was found...");
    //console.log(dbData.post.find());
    res.json(dbData);
  } else {
    console.log("there was no user?");
    //If there is no user, create a new one
    const newUser = new userSchema({
      userEmail: email,
      userName: user,
      themeColor: "",
      post: [],
      archive: []
    });

    //save the new user to the databse, then send back the posts to the client
    await newUser.save().then(newUser => res.json(newUser.post));
  }
}); //Reference to route

//Get Archive Post
router.get("/archive", async (req, res) => {
  const { email, user } = req.query;
  const dbData = await userSchema.findOne({ userEmail: req.query.email });

  if (dbData) {
    //if there is a user, return the posts
    console.log("user was found...");
    res.json(dbData.archive);
  } else {
    console.log("there was no user?");
    //If there is no user, create a new one
    const newUser = new userSchema({
      userEmail: email,
      userName: user,
      themeColor: "",
      post: [],
      archive: []
    });

    //save the new user to the databse, then send back the posts to the client
    await newUser.save().then(newUser => res.json(newUser.archive));
  }
}); //Reference to route

//Add Post
router.post("/", async (req, res) => {
  const dbData = await userSchema.findOne({ userEmail: req.body.user.email });

  if (dbData) {
    const newPost = new postSchema({
      headText: req.body.headText,
      text: req.body.text,
      createdAt: new Date()
    });

    dbData.post.push(newPost);
    await dbData.save();
  }
  res.status(201).send();

  //await post.insertOne(newUser);
  /*
  await posts.insertOne({
    
  });
  */
  /*
  if (newUser) {
    console.log("user does exist");
  } else {
    console.log("user does not exist");
  }

  res.status(201).send();
  */
});
//Archive Post
router.post("/archive", async (req, res) => {
  const dbData = await userSchema.findOne({ userEmail: req.body.user.email });

  if (dbData) {
    const newPost = new postSchema({
      headText: req.body.headText,
      text: req.body.text,
      createdAt: new Date()
    });
    if (dbData.archive) {
      console.log("Archiving post to Archive!!");
      dbData.archive.push(newPost);
    }

    await dbData.save();
  }
  res.status(201).send();
});

//Update Post
router.post("/editPost", async (req, res) => {
  const dbData = await userSchema.findOne({ userEmail: req.body.user.email });

  const id = mongoose.Types.ObjectId(req.body.id);

  dbData.post.map(post => {
    if (post._id.equals(id)) {
      post.headText = req.body.headText;
      post.text = req.body.text;
      post.createdAt = new Date();
    }
  });

  await dbData.save();
  /*
    { _id: ObjectId(req.body.id) },
    {
      headText: req.body.headText,
      text: req.body.text,
      createdAt: new Date()
    },
    { runValidators: true }
  );
  */

  //console.log(dbData.post);
  //dbData.save();
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
  const id = req.params.id;
  const dbData = await userSchema.findOne({ userEmail: req.query.email });

  console.log("Removed");

  if (dbData) {
    dbData.post.pull({ _id: id });
    await dbData.save().then(dbData => res.json(dbData.post));
  }
  res.status(200).send();
});

//Update color
router.post("/theme", async (req, res) => {
  const dbData = await userSchema.findOne({ userEmail: req.body.user.email });

  if (dbData) {
    dbData.themeColor = req.body.colorPost;
    console.log("updated color");
  }

  await dbData.save();
});

/*
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

*/
module.exports = router;
