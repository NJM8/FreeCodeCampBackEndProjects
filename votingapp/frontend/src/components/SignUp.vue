<template>
  <div class="w-100 border rounded mt-4">
    <form class="p-3">
      <div class="form-group">
        <label for="username">User name</label>
        <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Enter name">
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
