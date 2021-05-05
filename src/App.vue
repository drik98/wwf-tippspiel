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
        <h2>Hallo {{ userName }}</h2>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isUserLoggedIn", "userName"]),
  },
  methods: {
    ...mapActions(["initialize"]),
  },
  mounted() {
    this.initialize();
  },
};
</script>
