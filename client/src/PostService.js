import axios from "axios";

const url = "api/posts/";

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
        const postData = data.post.map(post => ({
          ...post,
          createdAt: new Date(post.createdAt)
        }));
        data.themeColor;
        resolve([postData, data.themeColor]);
      } catch (err) {
        reject(err);
      }
    });
  }
  // Archive Posts
  static getArchive(user) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get("api/posts/archive", {
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
    return axios.post("api/posts/archive", {
      headText,
      text,
      user
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

  // UpdateColor Post
  static updateTheme(user, colorPost) {
    return axios.post(url + "theme", {
      user,
      colorPost
    });
  }
}

export default PostService;
