import axios from "axios";

const url = "api/posts/";

class PostService {
  // Get Posts
  static getPosts() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
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
  static insertPost(headText, text) {
    return axios.post(url, {
      headText,
      text
    });
  }

  // Archive Post
  static archivePost(headText, text) {
    return axios.post("api/posts/archive", {
      headText,
      text
    });
  }

  // Update Post
  static updatePost(id, post) {
    const { headText, text } = post; //Destructuring
    return axios.post("api/posts/editPost", {
      headText,
      text,
      id
    });
  }

  //Delete Post
  static deletePost(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default PostService;
