<template>
    <div class="homepage">
        <h1>This is home page</h1>
        <h2>{{msg}}</h2>
        <router-link to="/login" v-if="!is_logged">Go to login/register</router-link>
        <router-link to="/profile" v-else>Go to Profile</router-link>
    </div>
</template>

<script>
export default {
  data () {
    return {
      is_logged: false,
      msg: 'Home page!'
    }
  },
  beforeMount: function () {
    this.user = JSON.parse(localStorage.getItem('user'))
    if (localStorage.getItem('jwt') != null) {
      this.is_logged = true
    }
  }

}
</script>
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
