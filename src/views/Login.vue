<template>
  <div class="login" @submit="login">
    <b-form class="p-4 mx-auto">
      <!-- Email -->
      <b-form-group
        id="login_email_group"
        label="Username/Email address:"
        label-for="login_email"
      >
        <b-form-input
          id="login_email"
          v-model="form.username"
          type="text"
          required
          placeholder="Enter email"
          :disabled="submitting ? true : false"
        />
      </b-form-group>

      <!-- Password -->
      <b-form-group
        id="login_password_group"
        label="Password:"
        label-for="login_password"
      >
        <b-form-input
          id="login_password"
          v-model="form.password"
          type="password"
          required
          placeholder="Your password"
          :disabled="submitting ? true : false"
        />
      </b-form-group>

      <!-- Remember Me -->
      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.rememberMe" id="check_remember_me">
          <b-form-checkbox
            value="remember"
            :disabled="submitting ? true : false"
            >Remember Me</b-form-checkbox
          >
        </b-form-checkbox-group>
      </b-form-group>

      <b-button
        type="submit"
        class="mb-3 px-5 py-2 btn light"
        :disabled="submitting"
        ><font-awesome-icon
          icon="spinner"
          class="mr-2"
          :spin="true"
          v-if="submitting"
        />Login</b-button
      >

      <b-alert variant="danger" :fade="true" show dismissible v-if="errMsg"
        ><font-awesome-icon icon="exclamation-circle" class="mr-3" />{{
          errMsg
        }}</b-alert
      >
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
export default {
  name: 'login',
  data() {
    return {
      form: {},
      submitting: false,
      errMsg: ''
    };
  },
  methods: {
    login(event) {
      let comp = this;
      //   console.log(comp.$store)
      event.preventDefault();

      console.log('Logging in', this.form);
      comp.submitting = true;
      comp.errMsg = '';

      //Send server the credentials
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:1234/user/login',
        data: {
          username: comp.form.username,
          password: comp.form.password
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
        .then(
          result => {
            comp.submitting = false;
            console.log(result.data);
            console.log(result.data.data);

            if (result.data.resultcode != 1) {
              comp.errMsg = result.data.msg;
            } else {
              //Can log in
              console.log('Successfully logged in!');
              comp.$store.commit('login', {
                username: result.data.data[0].username
              });
              comp.$router.replace({ name: 'home' });
            }
          },
          error => {
            comp.submitting = false;
            console.error('Request error:', error);
          }
        )
        .catch(reason => {
          comp.submitting = false;
          console.error('Error caught:', reason);
        });
    }
  }
};
</script>

<style scoped>
.login form {
  width: 95%;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  max-width: 750px;
}
</style>
