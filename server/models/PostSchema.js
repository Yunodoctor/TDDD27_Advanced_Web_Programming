const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for post
var postSchema = new Schema({
  headText: String,
  text: String,
  createdAt: String,
  date: String,
});

module.exports = postSchema = mongoose.model("Posts", postSchema);
