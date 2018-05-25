<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mt-2 border rounded">
    <h2 class="navbar-brand">Voting App</h2>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav w-100 d-flex">
        <router-link to="/home" tag="li" active-class="active" exact class="nav-item">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link to="/signup" tag="li" active-class="active" class="nav-item">
          <a class="nav-link">Sign Up</a>
        </router-link>
        <router-link to="/signin" tag="li" active-class="active" class="nav-item">
          <a class="nav-link">Sign In</a>
        </router-link>
        <router-link to="/polls" tag="li" active-class="active" class="nav-item">
          <a class="nav-link">See Polls</a>
        </router-link>
        <router-link v-if="isAuth" to="/userPage" tag="li" active-class="active" class="nav-item">
          <a class="nav-link">{{ userName }}'s Page</a>
        </router-link>
        <li v-if="isAuth">
          <button class="logout" @click="onLogout">Log Out</button>
        </li>
        <a class="nav-link ml-auto" href="https://www.natethedev.com/" target="_blank" rel="noopener">Created by Nate Mallison</a>
      </ul>
    </div>
  </nav> 
</template>

<script>

export default {
  computed: {
    isAuth(){
      return this.$store.getters.isAuth;
    },
    userName(){
      return this.$store.getters.userName;
    }
  },
  methods: {
    onLogout(){
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style scoped>
.nav-link {
  cursor: pointer;
}

.active {
  font-weight: bold;
}
</style>
