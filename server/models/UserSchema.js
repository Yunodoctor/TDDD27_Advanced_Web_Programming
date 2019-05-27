const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for post
var postSchema = new Schema({
  headText: String,
  text: String,
  createdAt: String,
  date: String
});

var userSchema = new Schema({
  userEmail: String,
  userName: String,
  themeColor: String,
  post: [postSchema],
  archive: [postSchema],
});

module.exports = userSchema = mongoose.model("Users", userSchema);
