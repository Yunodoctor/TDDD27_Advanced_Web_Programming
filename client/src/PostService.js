import axios from "axios";
import Vue from "vue";

const url = "api/posts/";

const client = axios.create({
  baseURL: "http://localhost:5000/api/posts",
  json: true
});

class PostService {
  // Get Posts
  static getPosts(user) {
    return new Promise(async (resolve, reject) => {
      try {
        //send user to the backend
        console.log(user);
        const res = await axios.get(url, {
          params: { user: user.name, email: user.email }
        });
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  static getArchive() {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("getarchive: " + user);
        const res = await axios.get("api/posts/archive");
        const data = res.data;
        resolve(
          data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  }

  // Create Post
  static insertPost(headText, text, user) {
    //console.log("USER: ", user);
    return axios.post(url, {
      headText,
      text,
      user
    });
  }

  // Archive Post
  static archivePost(headText, text, user) {
    console.log("ArchivePost: " + user);
    return axios.post("api/posts/archive", {
      headText,
      text
    });
  }

  // Update Post
  static updatePost(id, post, user) {
    const { headText, text } = post; //Destructuring
    console.log("ArchivePost: " + user);
    return axios.post("api/posts/editPost", {
      headText,
      text,
      id,
      user
    });
  }

  //Delete Post
  static deletePost(id, user) {
    return axios.delete(`${url}${id}`, {
      params: { user: user.name, email: user.email }
    });
  }
}

export default PostService;
