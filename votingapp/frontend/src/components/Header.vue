<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light mt-2 border rounded">
    <h2 class="navbar-brand noPointer">Voting App</h2>
    <ul class="navbar-nav d-flex w-100">
      <router-link to="/" tag="li" active-class="active" exact class="nav-item">
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
      <a class="nav-link ml-auto" href="https://www.natethedev.com/" target="_blank" rel="noopener">Created by Nate Mallison</a>
    </ul>
  </nav> 
</template>

<script>

export default {
}
</script>

<style scoped>
.nav-link {
  cursor: pointer;
}

.noPointer {
  cursor: default !important;
}

.active {
  font-weight: bold;
}
</style>
