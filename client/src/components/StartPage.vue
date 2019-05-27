<template>

<div class="container-image">
    <div>
      <h1 class="header-text">Lets get started!</h1>
      <button class="login-button" to="/post-manager" @click.prevent="login" v-if="!activeUser">Login</button>
    </div>
    <div class="text-container">
      <p>Do you find it hard to keep track on everything that you have to do? 
          PostKeep is an page that allows you to organise your thoughts 
          by writing them down on posts. Archive your completed post.
          You can always acces your archived posts at the archive tab. 
          If you have many postsm use the search function!
      </p><br>
      <p>
          Not a member? Click the login button and choose register to
          create a new account!
      </p>
    </div>
 </div> 
</template>

<script>
export default {
  name: "StartPage",
  data() {
    return{
      activeUser: null
    }
  },
  async created () {
    await this.refreshActiveUser()
  },
  watch: {
    //Everytime a route is changed refresh the activeUser
    '$route': 'refreshActiveUser'
  },
  methods: {
    login () {
      this.$auth.loginRedirect()
      this.$router.push('/post-manager')
    },
    async refreshActiveUser () {
      this.activeUser = await this.$auth.getUser()
    }
  }
};
</script>

<style>
.container-image{
  background-image: url('../assets/header_tinted.png');
  background-repeat: no-repeat;
  min-width: 100%;
  min-height: 1000px;
  height: auto;
}
.header-text{
  color:white;
  padding-top: 20px;
}
.text-container{
  background: rgba(0, 0, 0, 0.4);
  border: 2px solid white;
  color:white;
  width: 400px;
  margin-top: 100px;
  padding: 5px 5px 5px 5px;
  margin: auto;
}
.login-button{
  font-weight:bold;
  border-radius: 35px;
  border: 0px solid #3399ff;
  background-color: #3399ff;
  width: 150px; 
  height: 50px;
  color: white;
  margin-bottom: 50px;
  margin-top:10px;
}
.login-button:hover{
  background-color:#287ed6;
  color: white;
}
</style>