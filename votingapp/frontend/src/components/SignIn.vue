<template>
  <div class="w-100 border rounded mt-4">
    <form class="p-3" @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="userName">User name</label>
        <input 
          name="userName"
          v-validate="'required|min:4'" 
          v-model="userName"
          type="text" 
          class="form-control"
          :class="{error : errors.has('userName')}" 
          id="username" 
          aria-describedby="userName" 
          placeholder="Enter name">
          <span v-if="errors.has('userName')" class="errorText">{{ errors.first('userName') }} </span>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          name="password"
          v-validate="'required|min:6'" 
          v-model="password"
          type="password" 
          class="form-control"
          :class="{error : errors.has('password')}" 
          id="password" 
          aria-describedby="password"           
          placeholder="Password">
          <span v-if="errors.has('password')" class="errorText">{{ errors.first('password') }} </span>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <span v-if="fixForm" class="errorText">Please fix form errors before submission</span>      
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then((valid) => {
        if (valid) {
          this.fixForm = false;
          // call api from store
          return;
        } else {
          this.fixForm = true;
          return;
        }
      });
    }
  }
}
</script>

<style>
.errorText {
  color: firebrick;
}

.error {
  border: 1px solid firebrick;
  box-shadow: 0 0 0 .125em rgba(255,56,96,.25);
}
</style>
