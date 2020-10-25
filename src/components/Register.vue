<template>
    <div>
 <b-button v-b-modal.modal-prevent-closing>Register</b-button>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Register"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleSubmitRegister"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name"
          invalid-feedback="Name is required"
        >
          <b-form-input
          id="name"
          type="text"
          v-model="registerForm.name"
          required autofocus>
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="Email"
          label-for="Email-input"
          invalid-feedback="email is required"
        >
          <b-form-input
          id="email"
          type="email"
          v-model="registerForm.email"
          required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="Password"
          label-for="password"
          invalid-feedback="password is required"
        >
          <b-form-input
          id="password"
          type="password"
          v-model="registerForm.password" required>
          </b-form-input>
        </b-form-group>

        <b-form-group
          label="confirm password"
          label-for="password-confirm"
          invalid-feedback="password-confirm is required"
        >
          <b-form-input
          id="password-confirm"
          type="password"
          v-model="registerForm.password_confirmation" required>
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    </div>
</template>
<script>
export default {
  data () {
    return {
      registerForm: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },
  methods: {
    resetModal () {
      this.registerForm.name = ''
      this.registerForm.email = ''
      this.registerForm.password = ''
      this.registerForm.password_confirmation = ''
    },
    handleSubmitRegister (e) {
      e.preventDefault()

      if (this.registerForm.password === this.registerForm.password_confirmation && this.registerForm.password.length > 0) {
        let url = 'http://localhost:3000/register'
        this.$http.post(url, {
          name: this.registerForm.name,
          email: this.registerForm.email,
          password: this.registerForm.password
        })
          .then(response => {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            localStorage.setItem('jwt', response.data.token)

            if (localStorage.getItem('jwt') != null) {
              this.$emit('loggedIn')
              this.$router.push('/profile')
            }
          })
          .catch(error => {
            console.error(error)
          })
      } else {
        this.registerForm.password = ''
        this.registerForm.passwordConfirm = ''

        return alert('Passwords do not match')
      }
    }
  }
}
</script>
