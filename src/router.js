import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      //empty path should take you to the login page
      path: '/',
      name: 'login',
      // component: Home
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    {
      path: '/home',
      name: 'home',
      // component: Home
      component: () =>
        import(/* webpackChunkName: "about" */ './views/Home.vue')
    },
    {
      path: '/home/note/new',
      name: 'new_note',
      props: {
        newOrEdit: 'new'
      },
      component: () =>
        import(/* webpackChunkName: "about" */ './views/NoteDetails.vue')
    },
    {
      path: '/home/note/edit/:id',
      name: 'edit_note',
      props: {
        newOrEdit: 'edit'
      },
      component: () =>
        import(/* webpackChunkName: "about" */ './views/NoteDetails.vue')
    }
  ]
});
