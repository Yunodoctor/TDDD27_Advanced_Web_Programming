<template>
  <div class="container">
    <h1>Archive Posts</h1>
    <div class="search-box">
      <input type="searchtext" v-model="search" placeholder="Search posts">
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
        v-on:dblclick="deletePost(post._id)"
      >
        {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
        <p class="headText">{{ post.headText }}</p>
        <p class="text">{{ post.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";

export default {
  name: "ArchivePostComponent",
  data() {
    return {
      posts: [],
      error: "",
      headText: "",
      text: "",
      search: ""
    };
  },
  async created() {
    try {
      this.activeUser = await this.$auth.getUser();
      this.posts = await PostService.getArchive(this.activeUser);
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
      this.posts = await PostService.getArchive();
    },
    async deletePost(id) {
      this.activeUser = await this.$auth.getUser();
      await PostService.deletePost(id, this.activeUser);
      this.posts = await PostService.getArchive();
    },
    async archivePost(values, id) {
      this.activeUser = await this.$auth.getUser();
      await PostService.archivePost(
        values[id].headText,
        values[id].text,
        this.activeUser
      );
      this.posts = await PostService.getArchive();
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
  display: inline-block;
  float: left;
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
input[type="searchtext"] {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 10px 15px 10px 20px;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.2);
  -webkit-transition: width 0.6s ease-in-out;
  transition: width 0.6s ease-in-out;
}
input[type="searchtext"]:focus {
  width: 50%;
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
