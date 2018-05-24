import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'

import axios from 'axios'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);

axios.defaults.baseURL = 'https://natethedev-votingappbackend.herokuapp.com/';

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
