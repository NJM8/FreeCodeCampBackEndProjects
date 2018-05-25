import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null, 
    userId: null,
    userName: null
  },
  mutations: {
    authUser(state, userData){
      state.idToken = userData.idToken;
      state.userId = userData.userId;
      state.userName = userData.userName;
    },
    storeUser(state, userData){
      state.userName = userData.userName;
      state.userId = userData.userId;
    },
    clearAuthData(state){
      state.idToken = null;
      state.userId = null;
      state.userName = null;
    }
  },
  actions: {
    signUp({commit}, authData){
      console.log(authData);
      axios.post('/signup', {
        email: authData.email, 
        password: authData.password, 
        userName: authData.userName, 
      })
        .then(res => {
          console.log(res);
          commit('authUser', {
            idToken: res.data.idToken,
            userId: res.data.userId,
            userName: res.data.userName
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem('votingAppUserData', JSON.stringify({
            'idToken': res.data.idToken, 
            'expirationDate': expirationDate
          }));
          router.push('/userPage');
        })
        .catch(error => console.log(error))
    }, 
    signin({commit, dispatch}, authData){
      axios.post('/signin', {
        email: authData.email, 
        username: authData.userName, 
      })
        .then(res => {
          console.log(res);
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.userId,
            userName: authData.userName             
          });
          const now = new Date();
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000);
          localStorage.setItem('votingAppUserData', JSON.stringify({
            'idToken': res.data.idToken, 
            'expirationDate': expirationDate
          }));
          router.push('/userPage');          
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin({commit, dispatch}){
      const savedData = localStorage.getItem('votingAppUserData');
      if (!savedData) {
        return;
      }
      const expirationDate = savedData.expirationDate;
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      dispatch('fetchUser');
    },
    logout({commit}){
      commit('clearAuthData');
      localStorage.removeItem('votingAppUserData');
      router.replace('/home');
    },
    fetchUser({commit, state}){
      if (!state.idToken) {
        return;
      }
      globalAxios.get('/verifyUser', { idToken: state.idToken })
      .then(res => {
        console.log(res);
        commit('storeUser', res.data)
      })
      .catch(error => console.log(error))
    }
  },
  getters: {
    userId(state){
      return state.userId;
    },
    userName(state){
      return state.userName;
    },
    isAuth(state){
      return state.idToken !== null;
    }
  }
})