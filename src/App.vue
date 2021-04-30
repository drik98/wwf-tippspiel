<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="WWF-Logo"
          class="shrink mr-2"
          contain
          src="./assets/wwf_logo.svg"
          transition="scale-transition"
          width="80"
        />
        WWF
      </div>

      <v-spacer></v-spacer>

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
      </div>
    </v-app-bar>

    <v-main>
      <router-view v-if="isUserLoggedIn" />
    </v-main>
  </v-app>
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
