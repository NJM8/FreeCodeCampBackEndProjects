import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

import Home from './components/Home.vue'
import SignIn from './components/SignUp.vue'
import SignUp from './components/SignIn.vue'
import Polls from './components/Polls.vue'
import UserPage from './components/userPage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home, name: 'home' },
  { path: '/signup', component: SignIn },
  { path: '/signin', component: SignUp },
  { path: '/polls', component: Polls },
  { path: '/userPage', component: UserPage },
  { path: '/*', redirect: { name: 'home' } },
]

export default new VueRouter({mode: 'history', routes})
