<template>
  <div id="app">
    <PostComponent/>
    <ArchivePostComponent/>
  </div>
</template>

<script>
import PostComponent from "./components/PostComponent.vue";
import ArchivePostComponent from "./components/ArchivePostComponent.vue";
//Vue Material

export default {
  name: "app",
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
