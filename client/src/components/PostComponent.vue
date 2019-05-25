<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <div class="search-box">
      
      <input type="searchtext" v-model="search" placeholder="Search posts">
    </div>
    <div class="create-post">
      <!-- <label for="create-post">Title</label> -->
      <div class="post-box">
        <input type="headText" id="create-post" v-model="headText" placeholder="Title"><br>
        <input type="text" id="create-post" v-model="text" placeholder="Make a note">
      </div>
      <button class="post-button" v-on:click="createPost">Post!</button>
    </div>
    <hr>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in filteredPosts"
        v-bind:item="posts"
        v-bind:index="index"
        v-bind:key="post._id" 
        >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        <p class="headText">{{ post.headText }}</p>
        <p class="text">{{ post.text }}</p>

        <md-button class="edit-button" v-on:click="updatePost(post, post._id)">
          <edit-icon>Edit</edit-icon>
        </md-button>


        <div v-if="post == editedPost">
          <form action @submit.prevent="savePost(post)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4 bg-black">
              <div class="mb-6">
                <input class="input" v-model="post.text">
              </div>
              <input type="submit" value="Update Post">
            </div>
          </form>
        </div>
              <md-button class="delete-button" v-on:click="deletePost(post._id)">
          <delete-icon>Delete</delete-icon>
        </md-button>
        <md-button class="archive-button" v-on:click="archivePost(posts, index), deletePost(post._id)">
          <archive-icon>Archive</archive-icon>
        </md-button>
      </div>
    </div>
  </div>
  
</template>
<script>
import PostService from "../PostService";

export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      headText: "",
      text: "",
      search: "",
      editedPost: "",
      id: ""
    };
  },
  async created() {
    try {
      this.activeUser = await this.$auth.getUser();
      this.posts = await PostService.getPosts(this.activeUser);
    } catch (err) {
      this.error = err.message;
    }
  },
  computed: {
    filteredPosts: function() {
      return this.posts.filter(post => {
        return (
          post.text.toLowerCase().includes(this.search.toLowerCase()) ||
          post.headText.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    }
  },
  methods: {
    async createPost() {
      this.activeUser = await this.$auth.getUser();
      await PostService.insertPost(this.headText, this.text, this.activeUser);
      this.posts = await PostService.getPosts(this.activeUser);
    },
    async deletePost(id) {
      this.activeUser = await this.$auth.getUser();
      await PostService.deletePost(id, this.activeUser), this.activeUser;
      this.posts = await PostService.getPosts(this.activeUser);
    },
    async archivePost(values, id) {
      this.activeUser = await this.$auth.getUser();
      await PostService.archivePost(
        values[id].headText,
        values[id].text,
        this.activeUser
      );
    },
    async updatePost(post, id) {
      this.editedPost = post;
      this.id = id;
    },
    async savePost() {
      this.activeUser = await this.$auth.getUser();
      await PostService.updatePost(this.id, this.editedPost, this.activeUser);
      this.posts = await PostService.getPosts(this.activeUser);
      this.editedPost = "";
      this.id = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 900px;

}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border-radius: 10px;
  background-color: #ff8c1a;
  padding: 10px 10px 30px 10px;
  margin: 5px 5px 5px 5px;
  width: 280px;
  display:inline-block;
  float:left;
}

div.created-at {
  position: absolut;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
div.search-box {
  position: relative;
  padding-bottom: 20px;
}

div.create-post{
  position: relative;
  border-radius: 15px; 
}

div.post-box{
  margin: auto;
  text-align: left;
  width: 400px;
  border-radius: 4px;
  border: 2px solid #ccc;
  margin: 5px 4px 4px 5px;
}

input[type=text]{
  width: 200px;
  border: 1px solid white;
  font-weight: normal;
  margin: 5px 4px 4px 5px;
  -webkit-transition: width 0.4s ease-in-out;
  transition: width 0.4s ease-in-out;
}
input[type=text]:focus {
  width: 98%;
}
input[type=headText]{
  width: 200px;
  border: 1px solid white;
  font-weight: bold;
  margin: 5px 4px 4px 5px;
}
input[type=searchtext]{
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 10px 15px 10px 20px;
  box-shadow:  0px 0px 6px 2px rgba(0,0,0,0.2);
  -webkit-transition: width 0.6s ease-in-out;
  transition: width 0.6s ease-in-out;
}
input[type=searchtext]:focus {
  width: 50%;
}
.post-button{
  border-radius: 4px;
  background-color: white; 
  color: black; 
  border: 2px solid #4CAF50;
}
.post-button:hover{
  background-color: #4CAF50;
  color: white;
}
.delete-button{
  position: absolute;
  margin: 1px 1px 1px 1px;
  top: 0;
  right: 0;
}
.archive-button{
  position: absolute;
  margin: 1px 1px 1px 1px;
  top: 0%;
  right: 5%;
}
.edit-button{
  margin: 1px 1px 1px 1px;
}
p.text {
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 0;
}

p.headText {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
