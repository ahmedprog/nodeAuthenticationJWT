<template>
    <div class="profile">
        <h1>Welcome {{user.name}}</h1>
        <b-button  @click="handleLogOut">logout</b-button>

    </div>
</template>

<script>
export default {
  data () {
    return {
      user: {}
    }
  },
  beforeMount: function () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    handleLogOut () {
      localStorage.clear()
      this.$router.push('/login')
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
