<template>
  <div id="app">
    <div
      v-if="!isUserLoggedIn"
      class="fb-login-button"
      data-width=""
      data-size="large"
      data-button-type="login_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="true"
    ></div>
    <div v-else>
      <h2>Hallo {{ user.name }}</h2>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    user: {
      status: "unknown",
      name: null,
    },
  }),
  computed: {
    isUserLoggedIn() {
      return this.user.status === "connected";
    },
  },
  methods: {
    checkLoginStatus() {
      window.FB.getLoginStatus(({ status }) => {
        this.user.status = status;
        this.loadUserInfo();
      });
    },
    loadUserInfo() {
      window.FB.api("/me", ({ name }) => (this.user.name = name));
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
