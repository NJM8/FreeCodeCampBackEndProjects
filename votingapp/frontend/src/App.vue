<template>
  <div class="container">
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/Header'

export default {
  components: {
    'app-header': Header,
  }
}
</script>

<style>
.slide-enter {
  transform: translateX(400px);
  opacity: 0;
}
.slide-enter-active {
  transition: all 300ms ease;
}
.slide-leave-active {
  transition: all 300ms ease;
  transform: translateX(-400px);
  opacity: 0;
}
</style>
