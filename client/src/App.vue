<template>
  <div id="app">
    <button @click="current= 'PostComponent'">Home</button>
    <button @click="current= 'ArchivePostComponent'">Archive</button>
    <component :is="current"></component>
    <!-- <PostComponent/>
    <ArchivePostComponent/>-->
  </div>
</template>

<script>
import PostComponent from "./components/PostComponent.vue";
import ArchivePostComponent from "./components/ArchivePostComponent.vue";

export default {
  name: "app",
  data() {
    return { current: "PostComponent" };
  },
  components: {
    PostComponent,
    ArchivePostComponent
  }
};
</script>

<style>
#app {
  font-family: "Century Gothic", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
