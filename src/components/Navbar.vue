<template>
  <div>
    <b-navbar type="dark" variant="info" class="bg-primary-dark">
      <b-navbar-brand to="/">Todo App</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item to="/home">Home</b-nav-item>
        <!-- <b-nav-item class="mx-2">Profile</b-nav-item> -->
      </b-navbar-nav>

      <!-- <p class="mb-0" id="logged_in_as">
        <small>Signed in as:&nbsp;</small><b>{{ loggedInAs }}</b>
      </p> -->

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content"
            ><span id="logged_in_as" class="text-right"
              ><small>Signed in as:&nbsp;</small><b>{{ loggedInAs }}</b></span
            ></template
          >
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <!-- <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/home">Home</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <p class="mb-0" id="logged_in_as">
        <small>Signed in as:&nbsp;</small><b>{{ loggedInAs }}</b>
      </p>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: {
    loggedInAs: String
  },
  methods: {
    logout() {}
  }
}
</script>

<style scoped>
#logged_in_as {
  color: #fff !important;
}
#logged_in_as small {
  color: rgb(173, 173, 173) !important;
}
.navbar-nav {
  flex-direction: row;
}
.navbar-nav .dropdown-menu {
  position: absolute;
}
.navbar-expand .navbar-nav .dropdown-menu {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}
nav {
  justify-content: space-between;
}
</style>
