<template>
  <div class="w-100 border rounded mt-4">
    <h1>Welcome to your page {{ userName }}</h1>
    <h4>Here you can edit your polls or make some new ones.</h4>
    <p>isAuth: {{ isAuth }}</p>
  </div>
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
  }
}
</script>

<style>

</style>
