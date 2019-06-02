<template>
  <div id="app">
    <NavBar :loggedInAs="loggedInAs"></NavBar>
    <div id="nav" class="py-3 px-2"></div>
    <!-- <p>
      Logged in as <b>{{ loggedInAs }}</b>
    </p> -->
    <router-view class="mx-3" />
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue';
export default {
  computed: {
    loggedInAs() {
      return this.$store.state.currentUser.username;
    }
  },
  components: { NavBar }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
