<template>
  <div>
    <h4>Login</h4>
    <form class="col-4 mx-auto">
      <label for="email">E-Mail Address</label>
      <div>
        <b-form-input id="email" type="email" v-model="loginForm.email" required autofocus></b-form-input>
      </div>
      <div>
        <label for="password">Password</label>
        <div>
          <b-form-input id="password" type="password" v-model="loginForm.password" required></b-form-input>
        </div>
      </div>
      <br>
      <div>
        <b-button type="submit" @click="handleSubmitLogin">Login</b-button>
      </div>
    </form>
    <br>
    <Register />
  </div>
</template>

<script>
import Register from './Register'

export default {
  components: {
    Register
  },
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    handleSubmitLogin (e) {
      e.preventDefault()
      if (this.loginForm.password.length > 0) {
        this.$http.post('http://localhost:3000/login', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              this.$router.push('profile')
            }
          })
          .catch(function (error) {
            console.error(error.response)
          })
      }
    }
  }
}
</script>
